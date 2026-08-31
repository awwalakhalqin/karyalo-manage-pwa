import { getOrdersByFilter } from "@/lib/data/orders";
import { OrderList } from "@/components/orders/OrderList";
import { OrderFilterTabs } from "@/components/orders/OrderFilterTabs";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

export default async function ReturnsOrdersPage() {
  const orders = await getOrdersByFilter("returns");

  return (
    <div className="mx-auto max-w-(--container-wide) px-3.5 py-5 sm:px-6 sm:py-8">
      <div className="mb-4">
        <h1 className="text-lg font-bold text-ink sm:text-2xl">Retur & Refund</h1>
        <p className="text-xs text-muted sm:text-sm">{orders.length} permintaan retur atau pengembalian dana</p>
      </div>
      <SampleDataBanner />
      <OrderFilterTabs />
      <OrderList orders={orders} />
    </div>
  );
}
