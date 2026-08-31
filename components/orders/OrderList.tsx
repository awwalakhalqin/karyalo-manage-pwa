import Link from "next/link";
import { AdminOrder } from "@/lib/data/orders";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { ChannelBadge } from "./ChannelBadge";
import { formatRupiah } from "@/lib/utils/currency";

/**
 * PRD §14.2 Order List — Multi-channel Order Table dengan dukungan Shopee Open Platform.
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
    <div className="overflow-hidden rounded-(--radius-card) border border-border bg-warm-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
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
  );
}
