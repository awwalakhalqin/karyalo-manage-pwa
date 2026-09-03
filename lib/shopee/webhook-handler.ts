import {
  ShopeePushEventCode,
  ShopeePushPayload,
  ShopeeOrderPushData,
  SHOPEE_EVENT_NAMES,
} from "./config";
import { maskSensitiveData } from "./security";

/**
 * Log entry untuk riwayat event webhook yang diterima (terakhir 20 event)
 */
export interface WebhookAuditLog {
  id: string;
  receivedAt: string;
  code: number;
  eventName: string;
  shopId: number;
  orderSn?: string;
  status?: string;
  ip: string;
  isDuplicate: boolean;
  rawPayload: Record<string, unknown>;
}

// In-memory cache untuk deduplikasi (idempotency) selama 1 jam
const processedEventsCache = new Map<string, number>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 Jam

// In-memory audit log untuk tampilan diagnostik UI
const recentWebhookLogs: WebhookAuditLog[] = [];
const MAX_LOGS = 20;

/**
 * Membersihkan cache idempotensi yang sudah kadaluarsa
 */
function cleanExpiredCache() {
  const now = Date.now();
  for (const [key, timestamp] of processedEventsCache.entries()) {
    if (now - timestamp > CACHE_TTL_MS) {
      processedEventsCache.delete(key);
    }
  }
}

/**
 * Membuat kunci unik untuk memeriksa duplikasi event
 */
function getEventDeduplicationKey(payload: ShopeePushPayload): string {
  if (payload.msg_id) {
    return `msg_${payload.msg_id}`;
  }

  const orderData = payload.data as unknown as ShopeeOrderPushData;
  if (orderData?.ordersn) {
    return `order_${payload.code}_${payload.shop_id}_${orderData.ordersn}_${orderData.update_time || payload.timestamp}`;
  }

  return `event_${payload.code}_${payload.shop_id}_${payload.timestamp}`;
}

/**
 * Memeriksa apakah event ini sudah pernah diproses sebelumnya (Idempotency)
 */
export function isDuplicateEvent(payload: ShopeePushPayload): boolean {
  cleanExpiredCache();
  const key = getEventDeduplicationKey(payload);
  if (processedEventsCache.has(key)) {
    return true;
  }
  processedEventsCache.set(key, Date.now());
  return false;
}

/**
 * Mendapatkan daftar log webhook terbaru untuk diagnostik
 */
export function getRecentWebhookLogs(): WebhookAuditLog[] {
  return [...recentWebhookLogs];
}

/**
 * Menyimpan log ke riwayat diagnostik
 */
export function recordWebhookLog(log: Omit<WebhookAuditLog, "id" | "receivedAt">): WebhookAuditLog {
  const newLog: WebhookAuditLog = {
    ...log,
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    receivedAt: new Date().toISOString(),
  };

  recentWebhookLogs.unshift(newLog);
  if (recentWebhookLogs.length > MAX_LOGS) {
    recentWebhookLogs.pop();
  }

  return newLog;
}

/**
 * Handler Asinkron untuk memproses payload Push Event Shopee di background
 * Dijalankan setelah respon 200 OK dikembalikan ke Shopee.
 */
export async function processShopeeEventAsync(
  payload: ShopeePushPayload,
  clientIp: string,
  isDuplicate: boolean
): Promise<void> {
  const eventName = SHOPEE_EVENT_NAMES[payload.code] || `Event Code ${payload.code}`;
  const orderData = payload.data as unknown as ShopeeOrderPushData;
  const orderSn = orderData?.ordersn;

  // Catat ke audit log
  recordWebhookLog({
    code: payload.code,
    eventName,
    shopId: payload.shop_id,
    orderSn,
    status: orderData?.status,
    ip: clientIp,
    isDuplicate,
    rawPayload: payload as unknown as Record<string, unknown>,
  });

  if (isDuplicate) {
    console.log(
      `[Shopee Webhook] [DEDUPLICATED] Event ${payload.code} untuk order ${orderSn || "N/A"} sudah diproses sebelumnya.`
    );
    return;
  }

  console.log(
    `[Shopee Webhook] [PROCESSING] Menerima ${eventName} (Code: ${payload.code}) dari Shop ID: ${payload.shop_id}`
  );

  try {
    switch (payload.code) {
      case ShopeePushEventCode.ORDER_STATUS_UPDATE: {
        const status = orderData.status;
        console.log(
          `[Shopee Webhook] Update pesanan Shopee: Order SN ${orderSn}, Status: ${status}`
        );
        // Di sini sistem dapat melakukan upsert ke Convex / database lokal / dispatch web push
        break;
      }

      case ShopeePushEventCode.ORDER_TRACKING_NO: {
        const trackingNo = orderData.tracking_no;
        console.log(
          `[Shopee Webhook] Nomor Resi Kurir terbit: Order SN ${orderSn}, Tracking: ${maskSensitiveData(trackingNo || "")}`
        );
        break;
      }

      case ShopeePushEventCode.RETURN_REFUND_UPDATE: {
        console.log(`[Shopee Webhook] Pengajuan Retur/Refund untuk Order SN ${orderSn}`);
        break;
      }

      case ShopeePushEventCode.RESERVED_STOCK_CHANGE: {
        console.log(`[Shopee Webhook] Update stok produk diterima dari Shopee.`);
        break;
      }

      case ShopeePushEventCode.SHOP_AUTHORIZATION: {
        console.log(`[Shopee Webhook] Status otorisasi toko diperbarui untuk Shop ID: ${payload.shop_id}`);
        break;
      }

      default:
        console.log(`[Shopee Webhook] Event kode ${payload.code} diterima dan dicatat.`);
        break;
    }
  } catch (err) {
    console.error(`[Shopee Webhook] Kesalahan saat memproses event background:`, err);
  }
}
