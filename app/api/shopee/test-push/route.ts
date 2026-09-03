import { NextRequest, NextResponse } from "next/server";
import { getShopeeConfig, ShopeePushEventCode, ShopeePushPayload } from "@/lib/shopee/config";
import { generateShopeeSignature } from "@/lib/shopee/security";
import { getRecentWebhookLogs } from "@/lib/shopee/webhook-handler";

/**
 * GET: Mengambil riwayat log webhook terbaru untuk diagnostik antarmuka admin
 */
export async function GET() {
  const logs = getRecentWebhookLogs();
  return NextResponse.json({ logs });
}

/**
 * POST: Mengirim simulasi Push Notification Shopee untuk pengujian end-to-end
 */
export async function POST(request: NextRequest) {
  const config = getShopeeConfig();
  const body = await request.json().catch(() => ({}));

  const eventCode = Number(body.eventCode || ShopeePushEventCode.ORDER_STATUS_UPDATE);
  const customOrderSn = body.orderSn || `260831SHP${Math.floor(1000 + Math.random() * 9000)}A`;
  const orderStatus = body.status || "READY_TO_SHIP";

  const simulatedPayload: ShopeePushPayload = {
    code: eventCode,
    shop_id: config.shopId,
    timestamp: Math.floor(Date.now() / 1000),
    msg_id: `sim_msg_${Date.now()}`,
    data: {
      ordersn: customOrderSn,
      status: orderStatus,
      update_time: Math.floor(Date.now() / 1000),
      buyer_user_id: 10928371,
      total_amount: 264000,
      payment_method: "ShopeePay",
      tracking_no: "SPXID" + Math.floor(100000000 + Math.random() * 900000000),
      logistics_channel_id: 80001,
    },
  };

  const rawBody = JSON.stringify(simulatedPayload);
  const webhookUrl = `${request.nextUrl.origin}/api/shopee/webhook`;
  const signature = generateShopeeSignature(webhookUrl, rawBody, config.partnerKey);

  const startTime = Date.now();

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: signature,
      },
      body: rawBody,
    });

    const elapsedMs = Date.now() - startTime;
    const responseData = await res.json().catch(() => ({}));

    return NextResponse.json({
      success: res.ok,
      statusCode: res.status,
      latencyMs: elapsedMs,
      generatedSignature: signature,
      sentPayload: simulatedPayload,
      webhookResponse: responseData,
      environment: config.env,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: "fetch_failed",
        message: err instanceof Error ? err.message : "Gagal memanggil endpoint webhook",
      },
      { status: 500 }
    );
  }
}
