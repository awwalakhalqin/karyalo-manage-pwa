import { notFound } from "next/navigation";
import { getOrderById, getAllOrders } from "@/lib/data/orders";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { OrderTimeline } from "@/components/orders/OrderTimeline";
import { OrderCommandBar } from "@/components/orders/OrderCommandBar";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";
import { formatRupiah } from "@/lib/utils/currency";

export async function generateStaticParams() {
  const orders = await getAllOrders();
  return orders.map((o) => ({ orderId: o.id }));
}

/** PRD §14.3 Order Detail. */
export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await getOrderById(orderId);
  if (!order) notFound();

  return (
    <div className="mx-auto flex max-w-(--container-content) flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <SampleDataBanner />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-ink md:text-2xl">{order.orderNumber}</h1>
          <p className="text-sm text-muted">{order.customerName} — {order.city} · {order.createdAtLabel}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <OrderCommandBar />

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <section className="rounded-(--radius-card) border border-border bg-warm-white p-4">
            <h2 className="mb-3 text-sm font-semibold text-ink">Item Order</h2>
            <div className="flex flex-col divide-y divide-border">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="text-sm font-medium text-ink">{item.productName}</p>
                    <p className="text-xs text-muted">
                      {item.sku}
                      {item.variantLabel ? ` · ${item.variantLabel}` : ""} · {item.quantity}x
                    </p>
                  </div>
                  <span className="text-sm font-medium text-ink">{formatRupiah(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-1 border-t border-border pt-3 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span>{formatRupiah(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Ongkir</span>
                <span>{formatRupiah(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between font-semibold text-ink">
                <span>Total</span>
                <span>{formatRupiah(order.total)}</span>
              </div>
            </div>
          </section>

          <section className="rounded-(--radius-card) border border-border bg-warm-white p-4">
            <h2 className="mb-3 text-sm font-semibold text-ink">Fulfillment Timeline</h2>
            <OrderTimeline status={order.status} />
          </section>
        </div>

        <div className="flex flex-col gap-4">
          <section className="rounded-(--radius-card) border border-border bg-warm-white p-4">
            <h2 className="mb-2 text-sm font-semibold text-ink">Pembayaran</h2>
            <p className="text-sm text-ink">{order.paymentLabel}</p>
          </section>
          <section className="rounded-(--radius-card) border border-border bg-warm-white p-4">
            <h2 className="mb-2 text-sm font-semibold text-ink">Pengiriman</h2>
            <p className="text-sm text-ink">{order.shippingLabel}</p>
            <p className="mt-1 text-xs text-muted">{order.city}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
