import Link from "next/link";
import { AdminOrder } from "@/lib/data/orders";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { ChannelBadge } from "./ChannelBadge";
import { formatRupiah } from "@/lib/utils/currency";
import { ChevronRight, Truck } from "lucide-react";

/**
 * PRD §14.2 Order List — Responsif Mobile (Card View) & Desktop (Table View).
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
    <div>
      {/* Mobile Card List (sm:hidden) */}
      <div className="flex flex-col gap-3 sm:hidden">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="flex flex-col gap-2.5 rounded-xl border border-border bg-warm-white p-3.5 shadow-xs active:bg-soft-sand"
          >
            {/* Header: Order Number, Channel Badge & Status */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-ink">{order.orderNumber}</span>
                  <ChannelBadge channel={order.channel} />
                </div>
                {order.channelOrderNumber && (
                  <span className="font-mono text-[10px] text-muted">
                    No. Shopee: {order.channelOrderNumber}
                  </span>
                )}
                <span className="text-[10px] text-muted">{order.createdAtLabel}</span>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>

            {/* Customer & Location */}
            <div className="flex items-center justify-between border-t border-border/60 pt-2 text-xs">
              <div>
                <span className="font-medium text-ink">{order.customerName}</span>
                <span className="text-muted text-[11px]"> • {order.city}</span>
              </div>
              <span className="font-bold text-ink">{formatRupiah(order.total)}</span>
            </div>

            {/* Courier & Items */}
            <div className="flex items-center justify-between text-[11px] text-muted">
              <div className="flex items-center gap-1">
                <Truck size={12} className="text-muted" aria-hidden="true" />
                <span className="truncate max-w-[180px]">
                  {order.shippingLabel} {order.trackingNumber ? `(${order.trackingNumber})` : ""}
                </span>
              </div>
              <div className="flex items-center gap-1 text-karyalo-green font-medium">
                <span>{order.items.length} produk</span>
                <ChevronRight size={14} aria-hidden="true" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop Table View (hidden sm:block) */}
      <div className="hidden overflow-hidden rounded-(--radius-card) border border-border bg-warm-white shadow-xs sm:block">
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
