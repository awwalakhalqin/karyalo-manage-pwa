import { NextRequest, NextResponse, after } from "next/server";
import { getShopeeConfig, ShopeePushPayload } from "@/lib/shopee/config";
import {
  verifyShopeeSignature,
  verifyRequestTimestamp,
  getClientIp,
} from "@/lib/shopee/security";
import {
  isDuplicateEvent,
  processShopeeEventAsync,
} from "@/lib/shopee/webhook-handler";

/**
 * Health Check & Probe Endpoint untuk Shopee OpenAPI Console
 * Digunakan untuk memverifikasi kesiapan URL Callback dari dashboard Shopee.
 */
export async function GET(request: NextRequest) {
  const config = getShopeeConfig();
  const clientIp = getClientIp(request.headers);

  return NextResponse.json(
    {
      status: "ready",
      service: "Karyalo Shopee Push Mechanism Receiver",
      version: "2.0",
      environment: config.env,
      shop_id: config.shopId,
      partner_id: config.partnerId,
      client_ip: clientIp,
      timestamp: Math.floor(Date.now() / 1000),
      documentation: "https://open.shopee.com/documents/v2/v2.push.push_mechanism",
    },
    { status: 200 }
  );
}

/**
 * Endpoint Utama Penerima Push Notification (Webhook) Shopee OpenAPI v2
 *
 * Dioptimalkan untuk Vercel Serverless & Edge:
 * 1. Respon 200 OK instan (<50ms).
 * 2. Menggunakan `after()` dari Next.js agar background execution tetap berjalan
 *    di Vercel tanpa memblokir respons HTTP ke Shopee.
 * 3. Signature verification HMAC-SHA256 & Anti-replay protection.
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const clientIp = getClientIp(request.headers);
  const fullUrl = request.url;

  let rawBody = "";
  let payload: ShopeePushPayload;

  try {
    rawBody = await request.text();
    if (!rawBody || rawBody.trim() === "") {
      return NextResponse.json(
        { error: "empty_payload", message: "Request body cannot be empty" },
        { status: 400 }
      );
    }
    payload = JSON.parse(rawBody) as ShopeePushPayload;
  } catch (err) {
    return NextResponse.json(
      {
        error: "invalid_json",
        message: `JSON format invalid: ${err instanceof Error ? err.message : "parse error"}`,
      },
      { status: 400 }
    );
  }

  // 1. Verifikasi Signature HMAC-SHA256
  const providedSign =
    request.headers.get("authorization") ||
    request.headers.get("x-shopee-signature") ||
    request.nextUrl.searchParams.get("sign");

  const signResult = verifyShopeeSignature(fullUrl, rawBody, providedSign);
  if (!signResult.isValid) {
    console.warn(
      `[Shopee Webhook] [UNAUTHORIZED] Signature verification failed from IP ${clientIp}: ${signResult.reason}`
    );
    // Tolak request tidak valid dengan 401 Unauthorized
    return NextResponse.json(
      {
        error: "invalid_signature",
        message: signResult.reason,
      },
      { status: 401 }
    );
  }

  // 2. Verifikasi Replay Attack (Timestamp)
  if (payload.timestamp) {
    const timestampCheck = verifyRequestTimestamp(payload.timestamp, 300);
    if (!timestampCheck.isValid && process.env.NODE_ENV === "production") {
      console.warn(
        `[Shopee Webhook] [REPLAY ATTACK] Request timestamp expired (${timestampCheck.ageSeconds}s old).`
      );
      return NextResponse.json(
        {
          error: "timestamp_expired",
          message: "Request timestamp is beyond acceptable tolerance window",
        },
        { status: 400 }
      );
    }
  }

  // 3. Periksa Deduplikasi (Idempotency)
  const isDuplicate = isDuplicateEvent(payload);

  // 4. Background Execution Aman di Vercel (Next.js `after()`)
  // `after()` memastikan Vercel Serverless Function tidak di-freeze sebelum background task selesai,
  // namun HTTP Response tetap langsung terkirim ke Shopee dalam milidetik.
  after(async () => {
    try {
      await processShopeeEventAsync(payload, clientIp, isDuplicate);
    } catch (err) {
      console.error("[Shopee Webhook] Background execution error:", err);
    }
  });

  const requestId = payload.msg_id || `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const elapsedMs = Date.now() - startTime;

  // 5. Kembalikan format Acknowledgment 200 OK standar Shopee OpenAPI
  return NextResponse.json(
    {
      request_id: requestId,
      error: "",
      message: "success",
      ack_latency_ms: elapsedMs,
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-Karyalo-Webhook-Ack": "true",
      },
    }
  );
}
