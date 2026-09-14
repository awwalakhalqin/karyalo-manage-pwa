"use client";

import { useState } from "react";
import { TrendingUp, ShoppingBag, Globe, Calendar, ArrowUpRight } from "lucide-react";
import { formatRupiah } from "@/lib/utils/currency";

interface DailyDataPoint {
  label: string;
  dayName: string;
  date: string;
  shopeeAmount: number;
  webstoreAmount: number;
  totalOrders: number;
}

interface WeeklyDataPoint {
  label: string;
  weekName: string;
  dateRange: string;
  shopeeAmount: number;
  webstoreAmount: number;
  totalOrders: number;
}

const DAILY_DATA: DailyDataPoint[] = [
  { label: "Sen", dayName: "Senin", date: "8 Sep 2026", shopeeAmount: 320000, webstoreAmount: 140000, totalOrders: 3 },
  { label: "Sel", dayName: "Selasa", date: "9 Sep 2026", shopeeAmount: 450000, webstoreAmount: 210000, totalOrders: 4 },
  { label: "Rab", dayName: "Rabu", date: "10 Sep 2026", shopeeAmount: 390000, webstoreAmount: 180000, totalOrders: 3 },
  { label: "Kam", dayName: "Kamis", date: "11 Sep 2026", shopeeAmount: 620000, webstoreAmount: 280000, totalOrders: 5 },
  { label: "Jum", dayName: "Jumat", date: "12 Sep 2026", shopeeAmount: 890000, webstoreAmount: 420000, totalOrders: 7 },
  { label: "Sab", dayName: "Sabtu", date: "13 Sep 2026", shopeeAmount: 1150000, webstoreAmount: 510000, totalOrders: 9 },
  { label: "Min", dayName: "Minggu", date: "14 Sep 2026", shopeeAmount: 780000, webstoreAmount: 340000, totalOrders: 6 },
];

const WEEKLY_DATA: WeeklyDataPoint[] = [
  { label: "M-1", weekName: "Minggu 1", dateRange: "18 - 24 Ags 2026", shopeeAmount: 3200000, webstoreAmount: 1850000, totalOrders: 28 },
  { label: "M-2", weekName: "Minggu 2", dateRange: "25 - 31 Ags 2026", shopeeAmount: 3950000, webstoreAmount: 2100000, totalOrders: 34 },
  { label: "M-3", weekName: "Minggu 3", dateRange: "1 - 7 Sep 2026", shopeeAmount: 4400000, webstoreAmount: 2450000, totalOrders: 38 },
  { label: "M-4", weekName: "Minggu 4", dateRange: "8 - 14 Sep 2026", shopeeAmount: 4600000, webstoreAmount: 2080000, totalOrders: 37 },
];

export function SalesTrendChart() {
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("daily");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeData = viewMode === "daily" ? DAILY_DATA : WEEKLY_DATA;

  // Hitung agregat
  const totalShopee = activeData.reduce((sum, item) => sum + item.shopeeAmount, 0);
  const totalWebstore = activeData.reduce((sum, item) => sum + item.webstoreAmount, 0);
  const totalRevenue = totalShopee + totalWebstore;
  const totalOrders = activeData.reduce((sum, item) => sum + item.totalOrders, 0);

  // Nilai maksimum untuk skala tinggi batang chart
  const maxAmount = Math.max(
    ...activeData.map((item) => item.shopeeAmount + item.webstoreAmount)
  );

  const shopeePercentage = Math.round((totalShopee / (totalRevenue || 1)) * 100);
  const webstorePercentage = 100 - shopeePercentage;

  const currentHoveredItem = hoveredIndex !== null ? activeData[hoveredIndex] : null;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-warm-white p-4 sm:p-5 shadow-xs">
      {/* Header & Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-karyalo-green" aria-hidden="true" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Grafik & Tren Penjualan Toko
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-muted">
            Performa omset gabungan Shopee OpenAPI v2 dan Storefront Web.
          </p>
        </div>

        {/* Toggle Harian vs Mingguan */}
        <div className="flex items-center gap-1 rounded-xl border border-border bg-soft-sand p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setViewMode("daily");
              setHoveredIndex(null);
            }}
            className={`tap-target rounded-lg px-3 py-1 transition-all ${
              viewMode === "daily"
                ? "bg-warm-white text-ink shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            Harian (7 Hari)
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode("weekly");
              setHoveredIndex(null);
            }}
            className={`tap-target rounded-lg px-3 py-1 transition-all ${
              viewMode === "weekly"
                ? "bg-deep-pine text-warm-white shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            Mingguan (4 Minggu)
          </button>
        </div>
      </div>

      {/* Snapshot Ringkasan Periode */}
      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-soft-sand/50 p-3 text-xs sm:grid-cols-4">
        <div>
          <span className="text-muted block">Total Omset Periode</span>
          <span className="font-bold text-ink text-sm sm:text-base">
            {formatRupiah(totalRevenue)}
          </span>
        </div>
        <div>
          <span className="text-muted block">Total Transaksi</span>
          <span className="font-bold text-ink text-sm sm:text-base">
            {totalOrders} Pesanan
          </span>
        </div>
        <div>
          <span className="text-muted flex items-center gap-1">
            <ShoppingBag size={11} className="text-[#ee4d2d]" />
            Shopee ({shopeePercentage}%)
          </span>
          <span className="font-semibold text-ink text-xs sm:text-sm">
            {formatRupiah(totalShopee)}
          </span>
        </div>
        <div>
          <span className="text-muted flex items-center gap-1">
            <Globe size={11} className="text-karyalo-green" />
            Storefront ({webstorePercentage}%)
          </span>
          <span className="font-semibold text-ink text-xs sm:text-sm">
            {formatRupiah(totalWebstore)}
          </span>
        </div>
      </div>

      {/* Interactive Stacked Bar Chart */}
      <div className="mt-6 flex flex-col">
        {/* Tooltip / Status saat bar disentuh/di-hover */}
        <div className="h-7 mb-2 flex items-center justify-between text-xs">
          {currentHoveredItem ? (
            <div className="flex items-center gap-2 animate-in fade-in duration-150">
              <span className="font-bold text-ink">
                {"dayName" in currentHoveredItem
                  ? `${currentHoveredItem.dayName} (${currentHoveredItem.date})`
                  : `${currentHoveredItem.weekName} (${currentHoveredItem.dateRange})`}
              </span>
              <span className="text-muted">•</span>
              <span className="text-karyalo-green font-semibold">
                {formatRupiah(currentHoveredItem.shopeeAmount + currentHoveredItem.webstoreAmount)}
              </span>
              <span className="text-muted text-[11px]">
                ({currentHoveredItem.totalOrders} pesanan)
              </span>
            </div>
          ) : (
            <span className="text-muted text-[11px] flex items-center gap-1">
              <Calendar size={12} />
              Arahkan kursor atau sentuh diagram untuk rincian per periode
            </span>
          )}

          <div className="hidden sm:flex items-center gap-1 text-status-success text-xs font-semibold">
            <ArrowUpRight size={14} />
            <span>+18.4% vs periode lalu</span>
          </div>
        </div>

        {/* Chart Bars */}
        <div className="flex h-44 w-full items-end justify-between gap-2 border-b border-border/80 pb-2 pt-4">
          {activeData.map((item, idx) => {
            const totalItemAmount = item.shopeeAmount + item.webstoreAmount;
            const barHeightPercent = maxAmount > 0 ? (totalItemAmount / maxAmount) * 100 : 0;
            const shopeeHeightPercent = totalItemAmount > 0 ? (item.shopeeAmount / totalItemAmount) * 100 : 0;
            const webstoreHeightPercent = 100 - shopeeHeightPercent;

            const isSelected = hoveredIndex === idx;

            return (
              <div
                key={item.label}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex flex-1 flex-col items-center h-full justify-end cursor-pointer"
              >
                {/* Visual Bar Stack */}
                <div
                  style={{ height: `${Math.max(barHeightPercent, 10)}%` }}
                  className={`w-full max-w-[44px] flex flex-col justify-end overflow-hidden rounded-t-lg transition-all duration-200 ${
                    isSelected
                      ? "ring-2 ring-deep-pine/50 shadow-md scale-[1.03]"
                      : "opacity-90 hover:opacity-100"
                  }`}
                >
                  {/* Webstore portion (Top) */}
                  <div
                    style={{ height: `${webstoreHeightPercent}%` }}
                    className="w-full bg-deep-pine transition-colors group-hover:bg-deep-pine/90"
                    title={`Storefront: ${formatRupiah(item.webstoreAmount)}`}
                  />
                  {/* Shopee portion (Bottom) */}
                  <div
                    style={{ height: `${shopeeHeightPercent}%` }}
                    className="w-full bg-[#ee4d2d] transition-colors group-hover:bg-[#ee4d2d]/90"
                    title={`Shopee: ${formatRupiah(item.shopeeAmount)}`}
                  />
                </div>

                {/* X Axis Label */}
                <span
                  className={`mt-2 text-[11px] font-semibold transition-colors ${
                    isSelected ? "text-ink font-bold" : "text-muted group-hover:text-ink"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-xs bg-[#ee4d2d]" aria-hidden="true" />
              <span className="text-muted font-medium">Shopee OpenAPI v2</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-xs bg-deep-pine" aria-hidden="true" />
              <span className="text-muted font-medium">Storefront Web PWA</span>
            </div>
          </div>

          <span className="text-[11px] text-muted">
            Sinkronisasi data otomatis setiap 60 detik
          </span>
        </div>
      </div>
    </div>
  );
}
