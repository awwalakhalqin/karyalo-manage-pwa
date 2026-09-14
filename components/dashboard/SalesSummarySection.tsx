"use client";

import { useState } from "react";
import { TrendingUp, ShoppingBag, Layers, Globe, PackageCheck, Package } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SalesTrendChart } from "@/components/dashboard/SalesTrendChart";
import { ORDERS, OrderChannel } from "@/lib/data/orders";
import { formatRupiah } from "@/lib/utils/currency";

export function SalesSummarySection() {
  const [selectedChannel, setSelectedChannel] = useState<"all" | OrderChannel>("all");

  const filteredOrders = ORDERS.filter((order) => {
    if (selectedChannel === "all") return true;
    return order.channel === selectedChannel;
  });

  const activeOrders = filteredOrders.filter((o) => o.status !== "cancelled");
  const totalSales = activeOrders.reduce((sum, order) => sum + order.total, 0);

  const shopeeSales = ORDERS.filter(
    (o) => o.channel === "shopee" && o.status !== "cancelled"
  ).reduce((sum, o) => sum + o.total, 0);

  const webstoreSales = ORDERS.filter(
    (o) => o.channel === "storefront" && o.status !== "cancelled"
  ).reduce((sum, o) => sum + o.total, 0);

  const newCount = filteredOrders.filter((o) => o.status === "new").length;
  const packingCount = filteredOrders.filter(
    (o) => o.status === "processing" || o.status === "fulfillment"
  ).length;
  const readyToShipCount = newCount + packingCount;

  const totalItemsSold = activeOrders.reduce(
    (sum, order) => sum + order.items.reduce((iSum, item) => iSum + item.quantity, 0),
    0
  );

  const getSalesHint = () => {
    if (selectedChannel === "shopee") return `Dari ${activeOrders.length} pesanan Shopee`;
    if (selectedChannel === "storefront") return `Dari ${activeOrders.length} pesanan Web`;
    return `Shopee: ${formatRupiah(shopeeSales)} • Web: ${formatRupiah(webstoreSales)}`;
  };

  return (
    <section aria-label="Ringkasan Penjualan" className="flex flex-col gap-3 min-w-0">
      {/* Title & Channel Filter */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
          Ringkasan Penjualan Hari Ini
        </h2>

        {/* Channel Filter Chips */}
        <div className="flex items-center gap-1 rounded-xl border border-border bg-soft-sand p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setSelectedChannel("all")}
            className={`tap-target rounded-lg px-2.5 py-1 font-medium transition-colors ${
              selectedChannel === "all"
                ? "bg-warm-white text-ink shadow-2xs"
                : "text-muted hover:text-ink"
            }`}
          >
            Semua Kanal
          </button>
          <button
            type="button"
            onClick={() => setSelectedChannel("shopee")}
            className={`tap-target rounded-lg px-2.5 py-1 font-medium transition-colors ${
              selectedChannel === "shopee"
                ? "bg-[#ee4d2d] text-warm-white shadow-2xs"
                : "text-muted hover:text-ink"
            }`}
          >
            Shopee
          </button>
          <button
            type="button"
            onClick={() => setSelectedChannel("storefront")}
            className={`tap-target rounded-lg px-2.5 py-1 font-medium transition-colors ${
              selectedChannel === "storefront"
                ? "bg-deep-pine text-warm-white shadow-2xs"
                : "text-muted hover:text-ink"
            }`}
          >
            Webstore
          </button>
        </div>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 min-w-0">
        <MetricCard
          label="Total Omset (GMV)"
          value={formatRupiah(totalSales)}
          hint={getSalesHint()}
          icon={TrendingUp}
          variant="primary"
        />
        <MetricCard
          label="Pesanan Masuk"
          value={`${filteredOrders.length} Pesanan`}
          hint={`${activeOrders.length} aktif • ${filteredOrders.length - activeOrders.length} batal`}
          icon={ShoppingBag}
          href={selectedChannel === "shopee" ? "/orders/shopee" : "/orders"}
        />
        <MetricCard
          label="Perlu Dikirim"
          value={`${readyToShipCount} Pesanan`}
          hint={`${newCount} baru • ${packingCount} siap packing`}
          icon={PackageCheck}
          variant={readyToShipCount > 0 ? "warning" : "standard"}
          href="/orders/fulfillment"
        />
        <MetricCard
          label="Produk Terjual"
          value={`${totalItemsSold} Unit`}
          hint="Dari 18 SKU katalog"
          icon={Package}
          href="/products"
        />
      </div>

      {/* Chart */}
      <SalesTrendChart />
    </section>
  );
}
