/**
 * Konfigurasi Shopee Open Platform OpenAPI v2
 * Mengatur lingkungan kerja (Sandbox vs Live/Production), kredensial, host API,
 * dan definisi tipe event Push Mechanism (Webhook).
 */

export type ShopeeEnvironment = "sandbox" | "production";

export interface ShopeeConfig {
  env: ShopeeEnvironment;
  partnerId: number;
  partnerKey: string;
  shopId: number;
  apiHost: string;
  authHost: string;
  webhookUrl: string;
  redirectUrl: string;
}

// Host resmi Shopee Open Platform OpenAPI v2
export const SHOPEE_HOSTS = {
  sandbox: {
    api: "https://partner.test-stable.shopeemobile.com",
    auth: "https://partner.test-stable.shopeemobile.com/api/v2/shop/auth_partner",
  },
  production: {
    api: "https://partner.shopeemobile.com",
    auth: "https://partner.shopeemobile.com/api/v2/shop/auth_partner",
  },
} as const;

/**
 * Mendapatkan konfigurasi Shopee saat ini dari Environment Variables
 * dengan fallback default yang aman untuk pengujian lokal.
 */
export function getShopeeConfig(): ShopeeConfig {
  const env: ShopeeEnvironment =
    process.env.SHOPEE_ENV === "production" ? "production" : "sandbox";

  const partnerId = Number(process.env.SHOPEE_PARTNER_ID || "2004812");
  const partnerKey = process.env.SHOPEE_PARTNER_KEY || "shopee_test_partner_key_sample_2026";
  const shopId = Number(process.env.SHOPEE_SHOP_ID || "918230114");

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3001");

  return {
    env,
    partnerId,
    partnerKey,
    shopId,
    apiHost: SHOPEE_HOSTS[env].api,
    authHost: SHOPEE_HOSTS[env].auth,
    webhookUrl: process.env.SHOPEE_WEBHOOK_URL || `${baseUrl}/api/shopee/webhook`,
    redirectUrl: process.env.SHOPEE_REDIRECT_URL || `${baseUrl}/api/shopee/callback`,
  };
}

/**
 * Kode Tipe Event Push Mechanism Shopee OpenAPI v2
 * @see https://open.shopee.com/documents/v2/v2.push.push_mechanism
 */
export enum ShopeePushEventCode {
  ORDER_STATUS_UPDATE = 3, // Order created / update status (READY_TO_SHIP, SHIPPED, etc.)
  ORDER_TRACKING_NO = 4,   // Nomor resi terbit
  SHIPPING_DOCUMENT_STATUS = 5, // Status cetak label AWB
  ITEM_PROMOTION = 8,      // Perubahan harga/promo produk
  RESERVED_STOCK_CHANGE = 9, // Perubahan stok reserved
  RETURN_REFUND_UPDATE = 10, // Update retur dan pengembalian dana
  SHOP_AUTHORIZATION = 11, // Toko berhasil diotorisasi atau deotorisasi
  CHAT_NOTIFICATION = 12,  // Pesan chat pembeli baru
  SHOP_PERFORMANCE = 15,   // Update penalti / performa toko
}

export const SHOPEE_EVENT_NAMES: Record<number, string> = {
  [ShopeePushEventCode.ORDER_STATUS_UPDATE]: "Update Status Pesanan (v2.order.status)",
  [ShopeePushEventCode.ORDER_TRACKING_NO]: "Nomor Resi Kurir Terbit (v2.logistics.tracking)",
  [ShopeePushEventCode.SHIPPING_DOCUMENT_STATUS]: "Status Dokumen Pengiriman / AWB",
  [ShopeePushEventCode.ITEM_PROMOTION]: "Update Promosi & Harga Produk",
  [ShopeePushEventCode.RESERVED_STOCK_CHANGE]: "Perubahan Stok Produk (v2.product.stock)",
  [ShopeePushEventCode.RETURN_REFUND_UPDATE]: "Pengajuan Retur / Pengembalian Dana",
  [ShopeePushEventCode.SHOP_AUTHORIZATION]: "Otorisasi Toko (Shop Auth/De-auth)",
  [ShopeePushEventCode.CHAT_NOTIFICATION]: "Pesan Chat Pembeli Baru",
  [ShopeePushEventCode.SHOP_PERFORMANCE]: "Performa & Penalti Toko",
};

/**
 * Format standar payload Push Notification dari Shopee
 */
export interface ShopeePushPayload<TData = Record<string, unknown>> {
  code: number;
  shop_id: number;
  timestamp: number;
  data: TData;
  msg_id?: string;
}

/**
 * Payload spesifik untuk update pesanan (code: 3)
 */
export interface ShopeeOrderPushData {
  ordersn: string;
  status: string; // UNPAID, READY_TO_SHIP, PROCESSED, SHIPPED, COMPLETED, CANCELLED
  update_time: number;
  buyer_user_id?: number;
  total_amount?: number;
  payment_method?: string;
  tracking_no?: string;
  logistics_channel_id?: number;
}
