import { getOrdersByFilter } from "@/lib/data/orders";
import { OrderList } from "@/components/orders/OrderList";
import { OrderFilterTabs } from "@/components/orders/OrderFilterTabs";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

export default async function PaymentIssuesOrdersPage() {
  const orders = await getOrdersByFilter("payment-issues");

  return (
    <div className="mx-auto w-full max-w-(--container-wide) min-w-0 px-3.5 py-5 sm:px-6 sm:py-8 box-border">
      <div className="mb-4">
        <h1 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">Masalah Pembayaran</h1>
        <p className="mt-0.5 text-xs text-muted sm:text-sm">{orders.length} pesanan dengan status pembayaran bermasalah</p>
      </div>
      <SampleDataBanner />
      <OrderFilterTabs />
      <OrderList orders={orders} />
    </div>
  );
}
