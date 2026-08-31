import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  AlertTriangle,
  Package,
  LayoutTemplate,
  Megaphone,
  Users,
  BarChart3,
  Settings,
  Bell,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Globe,
  Truck,
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { OrderPipelineProgress } from "@/components/dashboard/OrderPipelineProgress";
import { ActionRequiredCard } from "@/components/dashboard/ActionRequiredCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ActiveRoleBanner } from "@/components/dashboard/ActiveRoleBanner";

export default function DashboardPage() {
  const FEATURE_MODULES = [
    {
      title: "Katalog & Varian Produk",
      desc: "Kelola 18 produk fesyen, varian ukuran/warna, dan matriks stok.",
      icon: Package,
      href: "/products",
      badge: "18 SKU",
      color: "text-karyalo-green bg-karyalo-green/10",
      links: [
        { label: "Semua Produk", href: "/products" },
        { label: "Kategori", href: "/products/categories" },
        { label: "Inventori Stok", href: "/products/inventory" },
      ],
    },
    {
      title: "Manajemen Pesanan (OMS)",
      desc: "Pantau pesanan masuk dari Storefront PWA dan Shopee Marketplace.",
      icon: ShoppingBag,
      href: "/orders",
      badge: "Multi-Channel",
      color: "text-deep-pine bg-deep-pine/10",
      links: [
        { label: "Semua Order", href: "/orders" },
        { label: "Pesanan Webstore", href: "/orders/webstore" },
        { label: "Pesanan Shopee", href: "/orders/shopee" },
        { label: "Fulfillment & Resi", href: "/orders/fulfillment" },
      ],
    },
    {
      title: "Web Storefront Builder & CMS",
      desc: "Kustomisasi tampilan homepage, banner promo, tema, dan navigasi.",
      icon: LayoutTemplate,
      href: "/storefront",
      badge: "Web PWA",
      color: "text-ink bg-soft-sand",
      links: [
        { label: "Homepage", href: "/storefront/homepage" },
        { label: "Banner", href: "/storefront/banners" },
        { label: "Halaman", href: "/storefront/pages" },
      ],
    },
    {
      title: "Integrasi Shopee Open Platform",
      desc: "Sinkronisasi OpenAPI v2 (v2.product, v2.order, dan v2.logistics).",
      icon: ShoppingBag,
      href: "/settings/integrations/shopee",
      badge: "OpenAPI v2",
      color: "text-[#ee4d2d] bg-[#ee4d2d]/10",
      links: [
        { label: "Status Koneksi", href: "/settings/integrations/shopee" },
        { label: "Pesanan Shopee", href: "/orders/shopee" },
      ],
    },
    {
      title: "Promosi & Marketing",
      desc: "Atur diskon harga coret, flash sale, dan voucher belanja.",
      icon: Megaphone,
      href: "/marketing/promotions",
      badge: "Promosi",
      color: "text-status-warning bg-status-warning/10",
      links: [
        { label: "Voucher & Promo", href: "/marketing/promotions" },
        { label: "Kampanye", href: "/marketing/campaigns" },
      ],
    },
    {
      title: "Database Pelanggan (CRM)",
      desc: "Daftar pembeli setia, riwayat transaksi, dan loyalitas pelanggan.",
      icon: Users,
      href: "/customers",
      badge: "Pelanggan",
      color: "text-ink bg-soft-sand",
      links: [{ label: "Semua Pelanggan", href: "/customers" }],
    },
    {
      title: "Laporan & Analytics",
      desc: "Grafik omzet penjualan, produk terlaris, dan performa kanal toko.",
      icon: BarChart3,
      href: "/analytics",
      badge: "Laporan",
      color: "text-karyalo-green bg-soft-sage",
      links: [{ label: "Ikhtisar Penjualan", href: "/analytics" }],
    },
    {
      title: "Pusat Notifikasi & Push",
      desc: "Notifikasi real-time pesanan baru via Web Push Notification.",
      icon: Bell,
      href: "/notifications",
      badge: "Live Alert",
      color: "text-deep-pine bg-soft-sand",
      links: [{ label: "Riwayat Notifikasi", href: "/notifications" }],
    },
    {
      title: "Pengaturan Toko & Logistik",
      desc: "Konfigurasi kurir pengiriman, rekening bank, dan hak akses staf.",
      icon: Settings,
      href: "/settings/store",
      badge: "Sistem",
      color: "text-muted bg-soft-sand",
      links: [
        { label: "Profil Toko", href: "/settings/store" },
        { label: "Kurir & Ongkir", href: "/settings/shipping" },
        { label: "Role Tim", href: "/settings/roles" },
      ],
    },
  ];

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

      {/* 2. Pipeline Pemrosesan Pesanan */}
      <section aria-labelledby="heading-order-pipeline" className="min-w-0">
        <OrderPipelineProgress />
      </section>

      {/* 3. Pusat Akses Semua Fitur & Modul Operasional Toko */}
      <section aria-labelledby="heading-all-modules" className="flex flex-col gap-3 min-w-0">
        <div className="flex items-center justify-between">
          <h2 id="heading-all-modules" className="text-xs font-semibold uppercase tracking-wider text-muted">
            Semua Modul & Fitur Operasional (9 Modul Lengkap)
          </h2>
          <span className="text-xs text-karyalo-green font-medium">Lengkap & Siap Digunakan</span>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
          {FEATURE_MODULES.map((m) => (
            <div
              key={m.title}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-warm-white p-4 shadow-xs transition-all hover:border-karyalo-green/40 hover:shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`flex size-9 items-center justify-center rounded-xl ${m.color}`}>
                      <m.icon size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <Link
                        href={m.href}
                        className="font-bold text-xs text-ink group-hover:text-karyalo-green transition-colors flex items-center gap-1"
                      >
                        <span>{m.title}</span>
                        <ChevronRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </div>
                  </div>
                  <span className="rounded-full bg-soft-sand px-2 py-0.5 text-xs font-semibold text-muted">
                    {m.badge}
                  </span>
                </div>

                <p className="mt-2.5 text-xs text-muted leading-relaxed line-clamp-2">
                  {m.desc}
                </p>
              </div>

              {/* Sub-links */}
              <div className="mt-3.5 flex flex-wrap items-center gap-1.5 border-t border-border/60 pt-2.5">
                {m.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="tap-target rounded-lg bg-soft-sand/60 px-2 py-1 text-xs font-medium text-ink hover:bg-soft-sage hover:text-karyalo-green transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Pusat Perhatian & Tindakan */}
      <section aria-labelledby="heading-action-required" className="flex flex-col gap-2.5 min-w-0">
        <h2 id="heading-action-required" className="text-xs font-semibold uppercase tracking-wider text-muted">
          Pusat Perhatian & Antrean Tindakan
        </h2>
        <ActionRequiredCard />
      </section>

      {/* 5. Pintasan Cepat */}
      <section aria-labelledby="heading-quick-actions" className="flex flex-col gap-2.5 min-w-0">
        <h2 id="heading-quick-actions" className="text-xs font-semibold uppercase tracking-wider text-muted">
          Pintasan Cepat
        </h2>
        <QuickActions />
      </section>
    </div>
  );
}
