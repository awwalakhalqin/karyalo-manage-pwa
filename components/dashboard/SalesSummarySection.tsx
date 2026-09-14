"use client";

import { useState } from "react";
import { TrendingUp, ShoppingBag, PackageCheck, Package } from "lucide-react";
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

  const newCount = filteredOrders.filter((o) => o.status === "new").length;
  const packingCount = filteredOrders.filter(
    (o) => o.status === "processing" || o.status === "fulfillment"
  ).length;
  const readyToShipCount = newCount + packingCount;

  const totalItemsSold = activeOrders.reduce(
    (sum, order) => sum + order.items.reduce((iSum, item) => iSum + item.quantity, 0),
    0
  );

  return (
    <section aria-label="Ringkasan Penjualan" className="flex flex-col gap-3 min-w-0">
      {/* Title & Channel Filter */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
          Penjualan Hari Ini
        </h2>

        {/* Channel Filter Chips */}
        <div className="inline-flex rounded-lg border border-border bg-soft-sand p-0.5 text-xs font-medium">
          <button
            type="button"
            onClick={() => setSelectedChannel("all")}
            className={`tap-target rounded-md px-2.5 py-1 transition-colors ${
              selectedChannel === "all" ? "bg-warm-white text-ink shadow-2xs font-semibold" : "text-muted hover:text-ink"
            }`}
          >
            Semua
          </button>
          <button
            type="button"
            onClick={() => setSelectedChannel("shopee")}
            className={`tap-target rounded-md px-2.5 py-1 transition-colors ${
              selectedChannel === "shopee" ? "bg-[#ee4d2d] text-warm-white shadow-2xs font-semibold" : "text-muted hover:text-ink"
            }`}
          >
            Shopee
          </button>
          <button
            type="button"
            onClick={() => setSelectedChannel("storefront")}
            className={`tap-target rounded-md px-2.5 py-1 transition-colors ${
              selectedChannel === "storefront" ? "bg-deep-pine text-warm-white shadow-2xs font-semibold" : "text-muted hover:text-ink"
            }`}
          >
            Webstore
          </button>
        </div>
      </div>

      {/* 4 Cards: clean, no description paragraphs */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 min-w-0">
        <MetricCard
          label="Omset (GMV)"
          value={formatRupiah(totalSales)}
          icon={TrendingUp}
          variant="primary"
        />
        <MetricCard
          label="Pesanan Masuk"
          value={`${filteredOrders.length} Order`}
          icon={ShoppingBag}
          href={selectedChannel === "shopee" ? "/orders/shopee" : "/orders"}
        />
        <MetricCard
          label="Perlu Dikirim"
          value={`${readyToShipCount} Order`}
          icon={PackageCheck}
          variant={readyToShipCount > 0 ? "warning" : "standard"}
          href="/orders/fulfillment"
        />
        <MetricCard
          label="Produk Terjual"
          value={`${totalItemsSold} Unit`}
          icon={Package}
          href="/products"
        />
      </div>

      {/* Chart */}
      <SalesTrendChart />
    </section>
  );
}
