"use client";

import { useState } from "react";
import { TrendingUp, ShoppingBag, Globe, Calendar } from "lucide-react";
import { formatRupiah } from "@/lib/utils/currency";

interface DataPoint {
  label: string;
  subLabel: string;
  shopeeAmount: number;
  webstoreAmount: number;
  totalOrders: number;
}

const DAILY_DATA: DataPoint[] = [
  { label: "Sen", subLabel: "8 Sep", shopeeAmount: 320000, webstoreAmount: 140000, totalOrders: 3 },
  { label: "Sel", subLabel: "9 Sep", shopeeAmount: 450000, webstoreAmount: 210000, totalOrders: 4 },
  { label: "Rab", subLabel: "10 Sep", shopeeAmount: 390000, webstoreAmount: 180000, totalOrders: 3 },
  { label: "Kam", subLabel: "11 Sep", shopeeAmount: 620000, webstoreAmount: 280000, totalOrders: 5 },
  { label: "Jum", subLabel: "12 Sep", shopeeAmount: 890000, webstoreAmount: 420000, totalOrders: 7 },
  { label: "Sab", subLabel: "13 Sep", shopeeAmount: 1150000, webstoreAmount: 510000, totalOrders: 9 },
  { label: "Min", subLabel: "14 Sep", shopeeAmount: 780000, webstoreAmount: 340000, totalOrders: 6 },
];

const WEEKLY_DATA: DataPoint[] = [
  { label: "Mgg 1", subLabel: "18-24 Ags", shopeeAmount: 3200000, webstoreAmount: 1850000, totalOrders: 28 },
  { label: "Mgg 2", subLabel: "25-31 Ags", shopeeAmount: 3950000, webstoreAmount: 2100000, totalOrders: 34 },
  { label: "Mgg 3", subLabel: "1-7 Sep", shopeeAmount: 4400000, webstoreAmount: 2450000, totalOrders: 38 },
  { label: "Mgg 4", subLabel: "8-14 Sep", shopeeAmount: 4600000, webstoreAmount: 2080000, totalOrders: 37 },
];

export function SalesTrendChart() {
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("daily");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeData = viewMode === "daily" ? DAILY_DATA : WEEKLY_DATA;

  const totalShopee = activeData.reduce((sum, item) => sum + item.shopeeAmount, 0);
  const totalWebstore = activeData.reduce((sum, item) => sum + item.webstoreAmount, 0);
  const totalRevenue = totalShopee + totalWebstore;
  const totalOrders = activeData.reduce((sum, item) => sum + item.totalOrders, 0);

  const maxAmount = Math.max(...activeData.map((item) => item.shopeeAmount + item.webstoreAmount));
  const currentHoveredItem = hoveredIndex !== null ? activeData[hoveredIndex] : null;

  return (
    <div className="rounded-2xl border border-border/80 bg-warm-white p-4 sm:p-5 shadow-xs">
      {/* Header Bar */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-baseline gap-2">
          <h3 className="text-sm font-semibold text-ink">Tren Penjualan</h3>
          <span className="text-xs text-muted tabular-nums">
            Total: <strong className="text-ink font-semibold">{formatRupiah(totalRevenue)}</strong> ({totalOrders} pesanan)
          </span>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Legend */}
          <div className="flex items-center gap-3 text-[11px] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-xs bg-[#ee4d2d]" aria-hidden="true" />
              Shopee
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-xs bg-deep-pine" aria-hidden="true" />
              Webstore
            </span>
          </div>

          {/* Toggle */}
          <div className="inline-flex rounded-lg border border-border bg-soft-sand p-0.5 text-xs">
            <button
              type="button"
              onClick={() => {
                setViewMode("daily");
                setHoveredIndex(null);
              }}
              className={`tap-target rounded-md px-2.5 py-1 font-medium transition-colors ${
                viewMode === "daily" ? "bg-warm-white text-ink shadow-2xs" : "text-muted hover:text-ink"
              }`}
            >
              Harian
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode("weekly");
                setHoveredIndex(null);
              }}
              className={`tap-target rounded-md px-2.5 py-1 font-medium transition-colors ${
                viewMode === "weekly" ? "bg-warm-white text-ink shadow-2xs" : "text-muted hover:text-ink"
              }`}
            >
              Mingguan
            </button>
          </div>
        </div>
      </div>

      {/* Info Tooltip on Hover */}
      <div className="mt-3 flex h-5 items-center justify-between text-xs">
        {currentHoveredItem ? (
          <div className="flex items-center gap-2 text-[11px]">
            <span className="font-semibold text-ink">
              {currentHoveredItem.label} ({currentHoveredItem.subLabel})
            </span>
            <span className="text-muted">•</span>
            <span className="font-semibold text-[#ee4d2d]">
              Shopee: {formatRupiah(currentHoveredItem.shopeeAmount)}
            </span>
            <span className="text-muted">•</span>
            <span className="font-semibold text-deep-pine">
              Web: {formatRupiah(currentHoveredItem.webstoreAmount)}
            </span>
            <span className="text-muted">({currentHoveredItem.totalOrders} order)</span>
          </div>
        ) : (
          <span className="text-[11px] text-muted/70 flex items-center gap-1">
            <Calendar size={11} aria-hidden="true" />
            Sentuh batang diagram untuk rincian kanal
          </span>
        )}
      </div>

      {/* Chart Canvas */}
      <div className="mt-2 flex h-36 w-full items-end justify-between gap-2 border-b border-border/70 pb-2 pt-2 sm:h-40">
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
              className="group flex flex-1 flex-col items-center h-full justify-end cursor-pointer"
            >
              <div
                style={{ height: `${Math.max(barHeightPercent, 12)}%` }}
                className={`w-full max-w-[38px] flex flex-col justify-end overflow-hidden rounded-t-md transition-all duration-150 ${
                  isSelected ? "ring-2 ring-deep-pine/40 scale-[1.04]" : "opacity-85 hover:opacity-100"
                }`}
              >
                <div style={{ height: `${webstoreHeightPercent}%` }} className="w-full bg-deep-pine" />
                <div style={{ height: `${shopeeHeightPercent}%` }} className="w-full bg-[#ee4d2d]" />
              </div>

              <span
                className={`mt-2 text-[11px] transition-colors tabular-nums ${
                  isSelected ? "font-bold text-ink" : "text-muted group-hover:text-ink"
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
