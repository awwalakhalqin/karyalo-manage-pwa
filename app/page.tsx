import {
  TrendingUp,
  ShoppingBag,
  AlertTriangle,
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { OrderPipelineProgress } from "@/components/dashboard/OrderPipelineProgress";
import { ActionRequiredCard } from "@/components/dashboard/ActionRequiredCard";
import { QuickActions } from "@/components/dashboard/QuickActions";

/**
 * Dashboard Operasional — Didistilasi & Dipoles untuk Skala UMKM & Multi-Channel.
 * Mengurangi kepadatan kartu visual dengan hierarki yang tegas dan elegan.
 */
export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-(--container-wide) flex-col gap-6 px-3.5 py-5 sm:px-6 sm:py-8">
      {/* Header Halaman */}
      <header className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-deep-pine sm:text-2xl">
            Dashboard Toko
          </h1>
          <p className="mt-0.5 text-xs text-muted sm:text-sm">
            Ringkasan omzet hari ini, antrean fulfillment, dan aksi yang diperlukan.
          </p>
        </div>
        <div className="mt-1 sm:mt-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-soft-sand px-2.5 py-1 text-xs font-medium text-muted">
            <span className="size-2 rounded-full bg-accent-cyan" aria-hidden="true" />
            Prototype PWA Multi-Channel
          </span>
        </div>
      </header>

      {/* 1. Ringkasan Metrik Utama (3 Kartu Utama yang Bersih & Lega) */}
      <section aria-labelledby="heading-sales-summary" className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 id="heading-sales-summary" className="text-xs font-semibold uppercase tracking-wider text-muted">
            Ikhtisar Penjualan Hari Ini
          </h2>
          <span className="text-[11px] text-muted/70">Sinkronisasi Realtime</span>
        </div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          <MetricCard
            label="Total Penjualan Kotor"
            hint="Omzet kotor Web Store & Shopee hari ini"
            icon={TrendingUp}
            variant="primary"
          />
          <MetricCard
            label="Total Pesanan Masuk"
            hint="Termasuk pesanan Shopee & Storefront"
            icon={ShoppingBag}
            variant="primary"
            href="/orders"
          />
          <MetricCard
            label="Peringatan Inventori"
            hint="SKU dengan stok menipis di gudang"
            icon={AlertTriangle}
            variant="warning"
            href="/products/inventory"
          />
        </div>
      </section>

      {/* 2. Pipeline Pemrosesan Pesanan (Unified & Interactive Stepper) */}
      <section aria-labelledby="heading-order-pipeline">
        <OrderPipelineProgress />
      </section>

      {/* 3. Pusat Perhatian & Tindakan */}
      <section aria-labelledby="heading-action-required" className="flex flex-col gap-2.5">
        <h2 id="heading-action-required" className="text-xs font-semibold uppercase tracking-wider text-muted">
          Pusat Perhatian & Tindakan
        </h2>
        <ActionRequiredCard />
      </section>

      {/* 4. Tindakan Cepat */}
      <section aria-labelledby="heading-quick-actions" className="flex flex-col gap-2.5">
        <h2 id="heading-quick-actions" className="text-xs font-semibold uppercase tracking-wider text-muted">
          Pintasan Cepat
        </h2>
        <QuickActions />
      </section>
    </div>
  );
}
