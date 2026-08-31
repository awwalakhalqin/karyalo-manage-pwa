import { getOrdersByFilter } from "@/lib/data/orders";
import { OrderList } from "@/components/orders/OrderList";
import { OrderFilterTabs } from "@/components/orders/OrderFilterTabs";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";
import Link from "next/link";
import { Settings2 } from "lucide-react";

export default async function ShopeeOrdersPage() {
  const orders = await getOrdersByFilter("shopee");

  return (
    <div className="mx-auto max-w-(--container-wide) px-3.5 py-5 sm:px-6 sm:py-8">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg font-bold text-ink sm:text-2xl">Pesanan Shopee</h1>
            <span className="rounded-md bg-[#ee4d2d]/10 px-2 py-0.5 text-xs font-semibold text-[#ee4d2d]">
              OpenAPI v2.0
            </span>
          </div>
          <p className="mt-1 text-xs text-muted sm:text-sm">
            Menampilkan {orders.length} pesanan otomatis dari toko Shopee.
          </p>
        </div>
        <Link
          href="/settings/integrations/shopee"
          className="tap-target inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-warm-white px-3.5 py-2 text-xs font-medium text-ink shadow-xs hover:border-karyalo-green sm:w-auto"
        >
          <Settings2 size={14} className="text-muted" />
          <span>Pengaturan Sync Shopee</span>
        </Link>
      </div>

      <SampleDataBanner note="Data pesanan Shopee disimulasikan dari skema Shopee OpenAPI v2 (v2.order.get_order_list & get_order_detail)." />
      <OrderFilterTabs />
      <OrderList orders={orders} />
    </div>
  );
}
