import { getAllOrders } from "@/lib/data/orders";
import { OrderList } from "@/components/orders/OrderList";
import { OrderFilterTabs } from "@/components/orders/OrderFilterTabs";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

/** PRD §14.2 Order List — semua order. */
export default async function OrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="mx-auto max-w-(--container-wide) px-3.5 py-5 sm:px-6 sm:py-8">
      <div className="mb-4">
        <h1 className="text-lg font-bold text-ink sm:text-2xl">Daftar Pesanan</h1>
        <p className="text-xs text-muted sm:text-sm">{orders.length} total transaksi masuk</p>
      </div>
      <SampleDataBanner />
      <OrderFilterTabs />
      <OrderList orders={orders} />
    </div>
  );
}
