import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { anyApi } from "@/lib/convex/anyApi";
import { LiveDataBanner } from "@/components/system/LiveDataBanner";
import { formatRupiah } from "@/lib/utils/currency";

/**
 * BARU 16 Agustus 2026 — deep link tujuan push notification order baru
 * (PRD §16.3/16.4: "Deep link: /admin/orders/{order_id}", diadaptasi ke
 * routing project ini yang tidak pakai prefix `/admin`). Sengaja route
 * TERPISAH dari `/orders/[orderId]` (yang menampilkan order MOCK dari
 * `lib/data/orders.ts`) — order di sini dibaca langsung dari Convex
 * (backend yang sama dengan storefront), bukan data contoh.
 *
 * Kenapa cuma halaman minimal (bukan modul Orders penuh yang tersambung
 * Convex)? Karena model status admin (`new|payment_issue|processing|...`
 * di lib/data/orders.ts) beda dari model status storefront
 * (`diproses|dikirim|selesai|dibatalkan` di convex/schema.ts) — menyatukan
 * keduanya adalah bagian dari keputusan arsitektur backend Manage yang
 * lebih besar (§1/§23 Domain Ownership Matrix), BELUM diputuskan/dibangun.
 * Halaman ini murni untuk membuktikan alur push notification end-to-end
 * bekerja (order sungguhan → notifikasi → tap → lihat order), bukan
 * pura-pura modul Orders sudah tersambung backend.
 *
 * **Belum tervalidasi jalan dari sisi saya** — sandbox tanpa akses
 * Convex/npm, sama seperti bagian lain prototype ini.
 */
export default async function LiveOrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  let order: {
    _id: string;
    orderNumber: string;
    status: string;
    createdAtLabel: string;
    items: {
      productId: string;
      name: string;
      variantLabel?: string;
      unitPrice: number;
      quantity: number;
      imageUrl: string | null;
    }[];
    subtotal: number;
    shippingCost: number;
    total: number;
    shippingLabel: string;
    paymentLabel: string;
    recipientName: string;
    address: string;
  } | null = null;
  let loadError: string | null = null;

  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    loadError =
      "NEXT_PUBLIC_CONVEX_URL belum diisi — tidak bisa membaca order sungguhan. Lihat CONVEX_SETUP.md di folder Karyalo_Storefront_PWA.";
  } else {
    try {
      // orderId dari deep link push adalah Convex document ID mentah
      // (bukan orderNumber) — lihat notificationActions.ts `payload.orderId`.
      order = await fetchQuery(anyApi.orders.getById, { id: orderId });
    } catch (err) {
      loadError = err instanceof Error ? err.message : "Gagal memuat order dari Convex.";
    }
  }

  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <Link href="/orders" className="mb-3 inline-block text-xs text-muted hover:text-ink">
        ← Kembali ke Orders
      </Link>
      <h1 className="mb-4 text-xl font-semibold text-ink md:text-2xl">Detail Pesanan (Live)</h1>
      <LiveDataBanner />

      {loadError && (
        <p className="rounded-lg border border-status-critical/40 bg-warm-white p-4 text-sm text-status-critical">
          {loadError}
        </p>
      )}

      {!loadError && !order && (
        <p className="rounded-lg border border-border bg-warm-white p-4 text-sm text-muted">
          Order tidak ditemukan — ID mungkin salah, atau order sudah dihapus.
        </p>
      )}

      {order && (
        <div className="flex flex-col gap-4">
          <div className="rounded-(--radius-card) border border-border bg-warm-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">#{order.orderNumber}</p>
              <span className="rounded-full bg-soft-sand px-2.5 py-1 text-xs font-medium text-ink">
                {order.status}
              </span>
            </div>
            <p className="text-xs text-muted">{order.createdAtLabel}</p>
            <div className="mt-3 flex flex-col gap-1 text-sm">
              <p className="text-ink">{order.recipientName}</p>
              <p className="text-xs text-muted">{order.address}</p>
            </div>
          </div>

          <div className="rounded-(--radius-card) border border-border bg-warm-white p-4">
            <p className="mb-3 text-sm font-medium text-ink">Item</p>
            <div className="flex flex-col gap-2">
              {order.items.map((item, idx) => (
                <div key={`${item.productId}-${idx}`} className="flex justify-between text-sm">
                  <span className="max-w-[70%] text-muted">
                    {item.name}
                    {item.variantLabel ? ` (${item.variantLabel})` : ""} × {item.quantity}
                  </span>
                  <span className="text-ink">{formatRupiah(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-1.5 border-t border-border pt-3 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="text-ink">{formatRupiah(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Ongkos Kirim ({order.shippingLabel})</span>
                <span className="text-ink">{formatRupiah(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-ink">
                <span>Total</span>
                <span>{formatRupiah(order.total)}</span>
              </div>
              <p className="text-xs text-muted">Pembayaran: {order.paymentLabel}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
