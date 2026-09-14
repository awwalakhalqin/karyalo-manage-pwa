import Link from "next/link";
import { ShoppingBag, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import { SalesSummarySection } from "@/components/dashboard/SalesSummarySection";
import { OrderPipelineProgress } from "@/components/dashboard/OrderPipelineProgress";
import { ActionRequiredCard } from "@/components/dashboard/ActionRequiredCard";
import { QuickActions } from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-(--container-wide) min-w-0 flex-col gap-6 px-3.5 py-5 sm:px-6 sm:py-7 box-border">
      {/* Header Halaman */}
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between min-w-0 border-b border-border/60 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Ringkasan Toko
          </h1>
          <p className="mt-0.5 text-xs text-muted">
            Pantau performa penjualan, status pesanan, dan integrasi multi-channel.
          </p>
        </div>

        {/* Status Integrasi Shopee */}
        <div className="flex items-center gap-2">
          <Link
            href="/settings/integrations/shopee"
            className="tap-target inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-warm-white px-2.5 py-1.5 text-xs font-medium text-ink hover:border-karyalo-green transition-colors"
          >
            <span className="size-2 rounded-full bg-status-success" aria-hidden="true" />
            <span>Shopee OpenAPI Terhubung</span>
            <ChevronRight size={13} className="text-muted" />
          </Link>
        </div>
      </header>

      {/* 1. Metrik Penjualan & Grafik Tren */}
      <SalesSummarySection />

      {/* 2. Operasional Pesanan & Aksi Cepat (2 Kolom di Desktop) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 min-w-0">
        {/* Kolom Kiri: Alur Pesanan & Status (7 cols) */}
        <div className="flex flex-col gap-4 lg:col-span-7 min-w-0">
          <OrderPipelineProgress />
          <ActionRequiredCard />
        </div>

        {/* Kolom Kanan: Status Kanal Shopee & Pintasan Cepat (5 cols) */}
        <div className="flex flex-col gap-4 lg:col-span-5 min-w-0">
          {/* Card Status Shopee */}
          <div className="rounded-2xl border border-border/80 bg-warm-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#ee4d2d]/10 text-[#ee4d2d]">
                  <ShoppingBag size={18} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-ink">Shopee Open Platform</h3>
                  <span className="text-[11px] text-muted">Shop ID: 918230114</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-md bg-soft-sand px-2 py-0.5 text-[11px] font-semibold text-status-success">
                <CheckCircle2 size={11} />
                Aktif
              </span>
            </div>

            <p className="mt-3 text-xs text-muted leading-relaxed">
              Sinkronisasi otomatis aktif untuk pesanan masuk (v2.order) dan update stok varian (v2.product).
            </p>

            <div className="mt-3.5 flex items-center justify-between border-t border-border/60 pt-3">
              <Link
                href="/orders/shopee"
                className="text-xs font-semibold text-karyalo-green hover:underline"
              >
                Lihat Pesanan Shopee
              </Link>
              <Link
                href="/settings/integrations/shopee"
                className="tap-target inline-flex items-center gap-1 rounded-lg bg-soft-sand px-2.5 py-1 text-xs font-medium text-ink hover:bg-soft-sage hover:text-karyalo-green transition-colors"
              >
                <span>Kelola</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Pintasan Aksi */}
          <div className="flex flex-col gap-2">
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
