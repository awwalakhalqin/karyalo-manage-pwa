"use client";

import { useState } from "react";
import { TrendingUp, ShoppingBag, Layers, Globe, PackageCheck, Package } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SalesTrendChart } from "@/components/dashboard/SalesTrendChart";
import { ORDERS, OrderChannel } from "@/lib/data/orders";

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function SalesSummarySection() {
  const [selectedChannel, setSelectedChannel] = useState<"all" | OrderChannel>("all");

  // Filter pesanan berdasarkan kanal yang dipilih
  const filteredOrders = ORDERS.filter((order) => {
    if (selectedChannel === "all") return true;
    return order.channel === selectedChannel;
  });

  // Pesanan aktif (tidak dibatalkan)
  const activeOrders = filteredOrders.filter((o) => o.status !== "cancelled");

  // Total omzet penjualan kotor (GMV)
  const totalSales = activeOrders.reduce((sum, order) => sum + order.total, 0);

  // Breakdown kanal untuk hint
  const shopeeSales = ORDERS.filter(
    (o) => o.channel === "shopee" && o.status !== "cancelled"
  ).reduce((sum, o) => sum + o.total, 0);

  const webstoreSales = ORDERS.filter(
    (o) => o.channel === "storefront" && o.status !== "cancelled"
  ).reduce((sum, o) => sum + o.total, 0);

  // Hitung status pesanan
  const newCount = filteredOrders.filter((o) => o.status === "new").length;
  const packingCount = filteredOrders.filter(
    (o) => o.status === "processing" || o.status === "fulfillment"
  ).length;
  const readyToShipCount = newCount + packingCount;

  // Total kuantitas produk terjual
  const totalItemsSold = activeOrders.reduce(
    (sum, order) => sum + order.items.reduce((iSum, item) => iSum + item.quantity, 0),
    0
  );

  const getSalesHint = () => {
    if (selectedChannel === "shopee") {
      return `Omzet real-time via Shopee OpenAPI v2 (${activeOrders.length} pesanan)`;
    }
    if (selectedChannel === "storefront") {
      return `Omzet real-time via Web Storefront PWA (${activeOrders.length} pesanan)`;
    }
    return `Shopee: ${formatRupiah(shopeeSales)} • Web: ${formatRupiah(webstoreSales)}`;
  };

  const getOrderHint = () => {
    return `${newCount} Baru • ${packingCount} Dipacking • ${filteredOrders.filter(o => o.status === "shipped").length} Dikirim`;
  };

  return (
    <section aria-labelledby="heading-sales-summary" className="flex flex-col gap-4 min-w-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="heading-sales-summary" className="text-xs font-semibold uppercase tracking-wider text-muted">
            Ikhtisar Penjualan Toko (Cockpit Monitoring)
          </h2>
          <p className="text-xs text-muted/80">
            Metrik operasional real-time terintegrasi Shopee OpenAPI v2 & Storefront PWA.
          </p>
        </div>

        {/* Channel Filter Chips */}
        <div className="flex items-center gap-1.5 rounded-xl border border-border bg-warm-white p-1 shadow-2xs">
          <button
            type="button"
            onClick={() => setSelectedChannel("all")}
            className={`tap-target flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
              selectedChannel === "all"
                ? "bg-deep-pine text-warm-white shadow-2xs"
                : "text-muted hover:text-ink hover:bg-soft-sand"
            }`}
          >
            <Layers size={13} aria-hidden="true" />
            <span>Semua Kanal</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedChannel("shopee")}
            className={`tap-target flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
              selectedChannel === "shopee"
                ? "bg-[#ee4d2d] text-warm-white shadow-2xs"
                : "text-muted hover:text-ink hover:bg-soft-sand"
            }`}
          >
            <ShoppingBag size={13} aria-hidden="true" />
            <span>Shopee</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedChannel("storefront")}
            className={`tap-target flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
              selectedChannel === "storefront"
                ? "bg-karyalo-green text-warm-white shadow-2xs"
                : "text-muted hover:text-ink hover:bg-soft-sand"
            }`}
          >
            <Globe size={13} aria-hidden="true" />
            <span>Webstore</span>
          </button>
        </div>
      </div>

      {/* 4 Kartu Metrik Monitoring Toko */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 min-w-0">
        <MetricCard
          label="Total Omset (GMV)"
          value={formatRupiah(totalSales)}
          hint={getSalesHint()}
          icon={TrendingUp}
          variant="primary"
          statusBadge={selectedChannel === "all" ? "Multi-Channel" : selectedChannel === "shopee" ? "Shopee API" : "Web PWA"}
        />
        <MetricCard
          label="Jumlah Pesanan Masuk"
          value={`${filteredOrders.length} Pesanan`}
          hint={getOrderHint()}
          icon={ShoppingBag}
          variant="standard"
          href={selectedChannel === "shopee" ? "/orders/shopee" : "/orders"}
          statusBadge={`${activeOrders.length} Aktif`}
        />
        <MetricCard
          label="Pesanan Perlu Dikirim"
          value={`${readyToShipCount} Pesanan`}
          hint="Siap dipacking & perlu serah terima kurir"
          icon={PackageCheck}
          variant={readyToShipCount > 0 ? "warning" : "standard"}
          href="/orders/fulfillment"
          statusBadge="Fulfillment"
        />
        <MetricCard
          label="Total Produk Terjual"
          value={`${totalItemsSold} Unit`}
          hint="Kuantitas item produk dari pesanan aktif"
          icon={Package}
          variant="standard"
          href="/products"
          statusBadge="Katalog Terjual"
        />
      </div>

      {/* Grafik Tren Penjualan Harian & Mingguan */}
      <SalesTrendChart />
    </section>
  );
}
