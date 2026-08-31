import { getAllOrders } from "@/lib/data/orders";
import { OrderList } from "@/components/orders/OrderList";
import { OrderFilterTabs } from "@/components/orders/OrderFilterTabs";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

/** PRD §14.2 Order List — semua order. */
export default async function OrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="mx-auto max-w-(--container-wide) px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-1 text-xl font-semibold text-ink md:text-2xl">Orders</h1>
      <p className="mb-4 text-sm text-muted">{orders.length} order</p>
      <SampleDataBanner />
      <OrderFilterTabs />
      <OrderList orders={orders} />
    </div>
  );
}
