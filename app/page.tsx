import {
  TrendingUp,
  ShoppingBag,
  Receipt,
  Sparkles,
  Clock,
  PackageCheck,
  Truck,
  AlertTriangle,
  PackageX,
  UserPlus,
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ActionRequiredCard } from "@/components/dashboard/ActionRequiredCard";
import { QuickActions } from "@/components/dashboard/QuickActions";

/**
 * Dashboard — PRD §10, route `/admin` atau `/admin/dashboard` di PRD;
 * di project standalone ini dipetakan ke `/` (root Home nav item, §8.2).
 *
 * §10.1 Today Summary — 10 metrik P0 yang telah didistilasi dan dikelompokkan
 * ke dalam 3 tier logis (Performa Utama, Pipeline Order, dan Inventori/Pelanggan)
 * dengan dukungan aksesibilitas penuh (semantic section landmarks, WCAG AA, focus states).
 */
export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-(--container-wide) flex-col gap-8 px-4 py-6 md:px-6 md:py-8">
      {/* Header Halaman */}
      <header className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-deep-pine md:text-2xl">
            Dashboard Operasional
          </h1>
          <p className="mt-0.5 text-xs text-muted sm:text-sm">
            Ikhtisar performa toko hari ini, status pipeline pesanan, dan tindakan yang diperlukan.
          </p>
        </div>
        <div className="mt-2 sm:mt-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-soft-sand px-2.5 py-1 text-xs font-medium text-muted">
            <span className="size-2 rounded-full bg-accent-cyan" aria-hidden="true" />
            Fase Prototype PWA
          </span>
        </div>
      </header>

      {/* 1. Performa Penjualan Utama (3 Core Highlights) */}
      <section aria-labelledby="heading-sales-performance" className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 id="heading-sales-performance" className="text-xs font-semibold uppercase tracking-wider text-muted">
            Performa Penjualan Hari Ini
          </h2>
          <span className="text-[11px] text-muted/70">Diperbarui realtime</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <MetricCard
            label="Penjualan Kotor"
            hint="Total nilai transaksi kotor sebelum diskon"
            icon={TrendingUp}
            variant="primary"
          />
          <MetricCard
            label="Total Order Hari Ini"
            hint="Jumlah transaksi yang masuk hari ini"
            icon={ShoppingBag}
            variant="primary"
            href="/orders"
          />
          <MetricCard
            label="Rata-rata Nilai Order (AOV)"
            hint="Estimasi rata-rata belanja per pesanan"
            icon={Receipt}
            variant="primary"
          />
        </div>
      </section>

      {/* 2. Pipeline Pemrosesan Pesanan (4 Tahap Operasional) */}
      <section aria-labelledby="heading-order-pipeline" className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 id="heading-order-pipeline" className="text-xs font-semibold uppercase tracking-wider text-muted">
            Pipeline Pemrosesan Pesanan
          </h2>
          <span className="text-[11px] text-muted/70">4 Tahap Fulfillment</span>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricCard
            label="1. Order Baru"
            hint="Pesanan baru masuk sistem"
            icon={Sparkles}
            href="/orders"
            statusBadge="Masuk"
          />
          <MetricCard
            label="2. Menunggu Pembayaran"
            hint="VA terbit / menunggu pelunasan"
            icon={Clock}
            href="/orders"
            statusBadge="Menunggu"
          />
          <MetricCard
            label="3. Perlu Diproses"
            hint="Sudah lunas, siap packing"
            icon={PackageCheck}
            href="/orders"
            statusBadge="Siap Kirim"
          />
          <MetricCard
            label="4. Dalam Fulfillment"
            hint="Diserahkan ke kurir / resi aktif"
            icon={Truck}
            href="/orders"
            statusBadge="Ekspedisi"
          />
        </div>
      </section>

      {/* 3. Inventori & Pelanggan (Watchlist) */}
      <section aria-labelledby="heading-inventory-customers" className="flex flex-col gap-3">
        <h2 id="heading-inventory-customers" className="text-xs font-semibold uppercase tracking-wider text-muted">
          Inventori & Pelanggan
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <MetricCard
            label="SKU Stok Rendah"
            hint="Stok di bawah batas minimum"
            icon={AlertTriangle}
            variant="warning"
            href="/products/inventory"
          />
          <MetricCard
            label="SKU Habis"
            hint="Varian produk kosong dari gudang"
            icon={PackageX}
            variant="warning"
            href="/products/inventory"
          />
          <MetricCard
            label="Pelanggan Baru"
            hint="Akun terdaftar hari ini"
            icon={UserPlus}
            href="/customers"
          />
        </div>
      </section>

      {/* 4. Action Required */}
      <section aria-labelledby="heading-action-required" className="flex flex-col gap-3">
        <h2 id="heading-action-required" className="text-xs font-semibold uppercase tracking-wider text-muted">
          Pusat Perhatian & Tindakan
        </h2>
        <ActionRequiredCard />
      </section>

      {/* 5. Tindakan Cepat */}
      <section aria-labelledby="heading-quick-actions" className="flex flex-col gap-3">
        <h2 id="heading-quick-actions" className="text-xs font-semibold uppercase tracking-wider text-muted">
          Tindakan Cepat
        </h2>
        <QuickActions />
      </section>
    </div>
  );
}
