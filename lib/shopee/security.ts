import crypto from "crypto";
import { getShopeeConfig } from "./config";

/**
 * Modul Keamanan & Verifikasi Shopee Open Platform
 * Mengamankan endpoint webhook dari pemalsuan request (tampering),
 * replay attack, dan kebocoran data pribadi (UU PDP).
 */

export interface SignatureVerificationResult {
  isValid: boolean;
  reason?: string;
  calculatedSign?: string;
}

/**
 * Menghitung HMAC-SHA256 Signature sesuai spesifikasi Shopee OpenAPI v2 Push Mechanism
 * Format dasar: HMAC_SHA256(url + "|" + request_body, partner_key)
 */
export function generateShopeeSignature(url: string, rawBody: string, partnerKey: string): string {
  const baseString = `${url}|${rawBody}`;
  return crypto.createHmac("sha256", partnerKey).update(baseString, "utf8").digest("hex");
}

/**
 * Verifikasi tanda tangan push notification yang dikirimkan oleh Shopee
 *
 * @param url URL endpoint webhook lengkap (misal: https://manage.karyalo.com/api/shopee/webhook)
 * @param rawBody Raw JSON string body dari request
 * @param providedSign Signature yang diterima di header 'Authorization' atau query parameter 'sign'
 * @param partnerKey (Opsional) Partner Key Shopee, default mengambil dari konfigurasi env
 */
export function verifyShopeeSignature(
  url: string,
  rawBody: string,
  providedSign: string | null | undefined,
  partnerKey?: string
): SignatureVerificationResult {
  const config = getShopeeConfig();
  const key = partnerKey || config.partnerKey;

  // Jika di mode development dan tidak ada signature atau header bypass diizinkan
  if (process.env.NODE_ENV === "development" && (!providedSign || providedSign === "dev-test-bypass")) {
    return {
      isValid: true,
      reason: "Bypassed in local development mode",
    };
  }

  if (!providedSign) {
    return {
      isValid: false,
      reason: "Header 'Authorization' atau parameter 'sign' tidak ditemukan",
    };
  }

  const calculatedSign = generateShopeeSignature(url, rawBody, key);

  // Gunakan timingSafeEqual untuk mencegah serangan timing attack
  try {
    const providedBuffer = Buffer.from(providedSign, "utf8");
    const calculatedBuffer = Buffer.from(calculatedSign, "utf8");

    if (providedBuffer.length !== calculatedBuffer.length) {
      return {
        isValid: false,
        reason: "Panjang signature tidak valid",
        calculatedSign: process.env.NODE_ENV === "development" ? calculatedSign : undefined,
      };
    }

    const isMatch = crypto.timingSafeEqual(providedBuffer, calculatedBuffer);
    if (!isMatch) {
      return {
        isValid: false,
        reason: "Signature tidak cocok dengan Partner Key yang terdaftar",
        calculatedSign: process.env.NODE_ENV === "development" ? calculatedSign : undefined,
      };
    }

    return { isValid: true };
  } catch (err) {
    return {
      isValid: false,
      reason: `Gagal memverifikasi signature: ${err instanceof Error ? err.message : "unknown error"}`,
    };
  }
}

/**
 * Memeriksa apakah timestamp request masih dalam batas toleransi
 * untuk mencegah serangan Replay Attack.
 *
 * @param timestamp Timestamp dalam detik (epoch time dari Shopee)
 * @param maxToleranceSeconds Batas toleransi maksimal dalam detik (default 300 detik = 5 menit)
 */
export function verifyRequestTimestamp(
  timestamp: number,
  maxToleranceSeconds: number = 300
): { isValid: boolean; ageSeconds: number } {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const ageSeconds = Math.abs(currentTimestamp - timestamp);

  return {
    isValid: ageSeconds <= maxToleranceSeconds,
    ageSeconds,
  };
}

/**
 * Helper untuk mengambil IP klien dari headers (aman dari reverse proxy / Cloudflare / Vercel)
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return headers.get("x-real-ip") || headers.get("cf-connecting-ip") || "127.0.0.1";
}

/**
 * Helper untuk masking data sensitif pembeli (PII) pada log webhook
 */
export function maskSensitiveData(str: string): string {
  if (!str || str.length <= 4) return "****";
  const start = str.slice(0, 2);
  const end = str.slice(-2);
  return `${start}***${end}`;
}
