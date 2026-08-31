import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  AlertTriangle,
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { OrderPipelineProgress } from "@/components/dashboard/OrderPipelineProgress";
import { ActionRequiredCard } from "@/components/dashboard/ActionRequiredCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ActiveRoleBanner } from "@/components/dashboard/ActiveRoleBanner";
import { FeatureModulesGrid } from "@/components/dashboard/FeatureModulesGrid";

export default function DashboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-(--container-wide) min-w-0 flex-col gap-6 px-3.5 py-5 sm:px-6 sm:py-8 box-border">
      {/* Header Halaman */}
      <header className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between min-w-0">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-deep-pine sm:text-2xl truncate">
            Dashboard Cockpit Toko
          </h1>
          <p className="mt-0.5 text-xs text-muted sm:text-sm">
            Kendali operasional toko multi-channel: Web Storefront & Shopee Marketplace.
          </p>
        </div>
        <div className="mt-1 sm:mt-0 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ee4d2d]/10 px-3 py-1 text-xs font-semibold text-[#ee4d2d]">
            <ShoppingBag size={12} aria-hidden="true" />
            Shopee Partner Ready
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-soft-sand px-3 py-1 text-xs font-medium text-muted">
            <span className="size-2 rounded-full bg-status-success" aria-hidden="true" />
            Live Sync
          </span>
        </div>
      </header>

      {/* Role Context & Permission Indicator */}
      <ActiveRoleBanner />

      {/* 1. Ringkasan Metrik Utama */}
      <section aria-labelledby="heading-sales-summary" className="flex flex-col gap-3 min-w-0">
        <div className="flex items-center justify-between">
          <h2 id="heading-sales-summary" className="text-xs font-semibold uppercase tracking-wider text-muted">
            Ikhtisar Penjualan Hari Ini
          </h2>
          <span className="text-xs text-muted/70">Sinkronisasi Realtime</span>
        </div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3 min-w-0">
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

      {/* 2. Visual Pipeline Pemrosesan Pesanan Multi-Channel */}
      <section aria-labelledby="heading-order-pipeline" className="min-w-0">
        <OrderPipelineProgress />
      </section>

      {/* 3. Semua Modul & Fitur Operasional — Beradaptasi Berdasarkan Role Aktif */}
      <FeatureModulesGrid />

      {/* 4. Pusat Antrean Tindakan Cepat */}
      <section aria-labelledby="heading-action-required" className="flex flex-col gap-2.5 min-w-0">
        <h2 id="heading-action-required" className="text-xs font-semibold uppercase tracking-wider text-muted">
          Pusat Perhatian & Antrean Tindakan
        </h2>
        <ActionRequiredCard />
      </section>

      {/* 5. Pintasan Cepat Harian — Beradaptasi Berdasarkan Role Aktif */}
      <section aria-labelledby="heading-quick-actions" className="flex flex-col gap-2.5 min-w-0">
        <h2 id="heading-quick-actions" className="text-xs font-semibold uppercase tracking-wider text-muted">
          Pintasan Cepat
        </h2>
        <QuickActions />
      </section>
    </div>
  );
}
