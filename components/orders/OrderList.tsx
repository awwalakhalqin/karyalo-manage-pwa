import Link from "next/link";
import { AdminOrder } from "@/lib/data/orders";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { ChannelBadge } from "./ChannelBadge";
import { formatRupiah } from "@/lib/utils/currency";
import { ChevronRight, Truck, User, Calendar } from "lucide-react";

/**
 * PRD §14.2 Order List — Responsif Mobile (Full-width Vertical Cards) & Desktop (Table View).
 */
export function OrderList({ orders }: { orders: AdminOrder[] }) {
  if (orders.length === 0) {
    return (
      <div className="rounded-(--radius-card) border border-dashed border-border bg-soft-sand p-8 text-center text-sm text-muted">
        Tidak ada order pada tampilan ini.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile Full-width Vertical Card List (md:hidden) */}
      <div className="flex flex-col gap-3.5 md:hidden">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-warm-white p-4 shadow-xs transition-all active:bg-soft-sand"
          >
            {/* Row 1: Order ID + Channel Badge & Status Badge */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-ink">{order.orderNumber}</span>
                  <ChannelBadge channel={order.channel} />
                </div>
                {order.channelOrderNumber && (
                  <span className="font-mono text-[11px] text-muted">
                    Shopee: {order.channelOrderNumber}
                  </span>
                )}
              </div>
              <OrderStatusBadge status={order.status} />
            </div>

            {/* Row 2: Customer & Date Info */}
            <div className="flex flex-col gap-1 rounded-xl bg-soft-sand/50 p-2.5 text-xs">
              <div className="flex items-center justify-between text-ink">
                <div className="flex items-center gap-1.5 font-medium">
                  <User size={13} className="text-muted" aria-hidden="true" />
                  <span>{order.customerName}</span>
                  <span className="text-muted">({order.city})</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted">
                <Calendar size={12} aria-hidden="true" />
                <span>{order.createdAtLabel}</span>
              </div>
            </div>

            {/* Row 3: Courier & Tracking */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-muted">
                <Truck size={13} className="text-karyalo-green" aria-hidden="true" />
                <span className="font-medium text-ink">{order.shippingLabel}</span>
              </div>
              {order.trackingNumber ? (
                <code className="rounded bg-soft-sand px-1.5 py-0.5 font-mono text-[11px] text-muted">
                  {order.trackingNumber}
                </code>
              ) : (
                <span className="text-[11px] text-muted/60">Belum ada resi</span>
              )}
            </div>

            {/* Row 4: Total & Details Action */}
            <div className="flex items-center justify-between border-t border-border/60 pt-2.5">
              <div className="flex items-center gap-1 text-xs text-muted">
                <span>{order.items.length} produk</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted">Total:</span>
                <span className="text-base font-bold text-karyalo-green">
                  {formatRupiah(order.total)}
                </span>
                <ChevronRight size={16} className="text-muted/60" aria-hidden="true" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop Table View (hidden md:block) */}
      <div className="hidden overflow-hidden rounded-(--radius-card) border border-border bg-warm-white shadow-xs md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-soft-sand text-xs font-medium text-muted">
              <tr>
                <th className="px-4 py-3">Order & Channel</th>
                <th className="px-4 py-3">Pelanggan & Lokasi</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Kurir / Resi</th>
                <th className="px-4 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr key={order.id} className="transition-colors hover:bg-soft-sand/60">
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/orders/${order.id}`}
                          className="font-semibold text-karyalo-green hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-karyalo-green"
                        >
                          {order.orderNumber}
                        </Link>
                        <ChannelBadge channel={order.channel} />
                      </div>
                      {order.channelOrderNumber && (
                        <span className="text-[11px] font-mono text-muted/80">
                          No. Shopee: {order.channelOrderNumber}
                        </span>
                      )}
                      <span className="text-[11px] text-muted">{order.createdAtLabel}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <p className="font-medium text-ink">{order.customerName}</p>
                    <p className="text-xs text-muted">{order.city}</p>
                  </td>

                  <td className="px-4 py-3.5">
                    <OrderStatusBadge status={order.status} />
                  </td>

                  <td className="px-4 py-3.5">
                    <p className="text-xs font-medium text-ink">{order.shippingLabel}</p>
                    {order.trackingNumber ? (
                      <span className="font-mono text-[11px] text-muted">
                        {order.trackingNumber}
                      </span>
                    ) : (
                      <span className="text-[11px] text-muted/60">Belum ada resi</span>
                    )}
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <span className="font-semibold text-ink">{formatRupiah(order.total)}</span>
                    <p className="text-[11px] text-muted">{order.items.length} produk</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
