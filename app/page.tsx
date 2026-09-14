import Link from "next/link";
import { ShoppingBag, ChevronRight, CheckCircle2 } from "lucide-react";
import { SalesSummarySection } from "@/components/dashboard/SalesSummarySection";
import { OrderPipelineProgress } from "@/components/dashboard/OrderPipelineProgress";
import { ActionRequiredCard } from "@/components/dashboard/ActionRequiredCard";
import { QuickActions } from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-(--container-wide) min-w-0 flex-col gap-5 px-3.5 py-4 sm:px-6 sm:py-6 box-border">
      {/* Header Halaman */}
      <header className="flex items-center justify-between min-w-0 border-b border-border/60 pb-3">
        <h1 className="text-lg font-bold tracking-tight text-ink sm:text-xl">
          Ringkasan Toko
        </h1>

        <Link
          href="/settings/integrations/shopee"
          className="tap-target inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-warm-white px-2.5 py-1 text-xs font-medium text-ink hover:border-karyalo-green transition-colors"
        >
          <span className="size-2 rounded-full bg-status-success" aria-hidden="true" />
          <span>Shopee Terhubung</span>
          <ChevronRight size={12} className="text-muted" />
        </Link>
      </header>

      {/* 1. Metrik Penjualan & Grafik */}
      <SalesSummarySection />

      {/* 2. Operasional Pesanan & Aksi (2 Kolom) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 min-w-0">
        {/* Kolom Kiri: Alur Pesanan (7 cols) */}
        <div className="flex flex-col gap-3 lg:col-span-7 min-w-0">
          <OrderPipelineProgress />
          <ActionRequiredCard />
        </div>

        {/* Kolom Kanan: Status Shopee & Aksi Cepat (5 cols) */}
        <div className="flex flex-col gap-3 lg:col-span-5 min-w-0">
          {/* Card Status Shopee */}
          <div className="rounded-2xl border border-border/80 bg-warm-white p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-[#ee4d2d]/10 text-[#ee4d2d]">
                  <ShoppingBag size={14} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-ink">Shopee OpenAPI</h3>
                  <span className="text-[11px] text-muted font-mono">Shop ID: 918230114</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded bg-soft-sand px-2 py-0.5 text-[11px] font-semibold text-status-success">
                <CheckCircle2 size={11} />
                Aktif
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-border/60 pt-2.5 text-xs">
              <Link
                href="/orders/shopee"
                className="font-medium text-karyalo-green hover:underline"
              >
                Lihat Pesanan Shopee
              </Link>
              <Link
                href="/settings/integrations/shopee"
                className="text-muted hover:text-ink"
              >
                Kelola →
              </Link>
            </div>
          </div>

          {/* Pintasan Aksi */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Aksi Cepat
            </h3>
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}
