import { OrderStatus, ORDER_STATUS_LABEL } from "@/lib/data/orders";

const STYLES: Record<OrderStatus, string> = {
  new: "bg-soft-sage text-karyalo-green",
  payment_issue: "bg-terracotta-soft text-status-critical",
  processing: "bg-soft-sage text-karyalo-green",
  fulfillment: "bg-terracotta-soft text-status-warning",
  shipped: "bg-soft-sand text-ink",
  completed: "bg-soft-sage text-status-success",
  cancelled: "bg-soft-sand text-muted",
  return_refund: "bg-terracotta-soft text-status-warning",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${STYLES[status]}`}>
      {ORDER_STATUS_LABEL[status]}
    </span>
  );
}
