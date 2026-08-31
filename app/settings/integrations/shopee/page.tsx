"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Radio,
  ExternalLink,
  ShieldCheck,
  Zap,
  Clock,
  KeyRound,
  Check,
} from "lucide-react";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

export default function ShopeeIntegrationPage() {
  const [autoSyncOrders, setAutoSyncOrders] = useState(true);
  const [autoSyncStock, setAutoSyncStock] = useState(true);
  const [autoSyncLogistics, setAutoSyncLogistics] = useState(true);
  const [pushNotification, setPushNotification] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-(--container-wide) px-3.5 py-5 sm:px-6 sm:py-8">
      {/* Navigation Breadcrumb */}
      <div className="mb-4">
        <Link
          href="/settings/integrations"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Kembali ke Integrasi</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#ee4d2d]/10 text-[#ee4d2d] shadow-xs sm:size-12">
            <ShoppingBag size={24} aria-hidden="true" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h1 className="text-lg font-bold text-ink sm:text-2xl">Shopee Open Platform API</h1>
              <span className="rounded-full bg-[#ee4d2d]/10 px-2 py-0.5 text-xs font-semibold text-[#ee4d2d]">
                v2.0
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-soft-sand px-2 py-0.5 text-xs font-medium text-status-success">
                <CheckCircle2 size={12} aria-hidden="true" />
                Terhubung
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted">
              Manajemen koneksi toko, sinkronisasi stok, dan otomasi pesanan Shopee.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleManualSync}
            disabled={isSyncing}
            className="tap-target inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-warm-white px-3.5 py-2 text-xs font-semibold text-ink shadow-xs hover:border-karyalo-green disabled:opacity-50 sm:w-auto"
          >
            <RefreshCw size={14} className={isSyncing ? "animate-spin text-karyalo-green" : "text-muted"} aria-hidden="true" />
            <span>{isSyncing ? "Menyinkronkan..." : "Tarik Data Sekarang"}</span>
          </button>
          <Link
            href="/orders/shopee"
            className="tap-target inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-deep-pine px-4 py-2 text-xs font-semibold text-warm-white shadow-xs hover:bg-deep-pine/90 sm:w-auto"
          >
            <span>Lihat Pesanan Shopee</span>
          </Link>
        </div>
      </div>

      <SampleDataBanner note="Modul ini mendemonstrasikan kapabilitas Karyalo Commerce sebagai Shopee Open Platform Partner App (OAuth v2, v2.order, v2.product, v2.logistics, dan webhook)." />

      {savedSuccess && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-soft-sage p-3 text-xs font-medium text-karyalo-green">
          <Check size={16} aria-hidden="true" />
          <span>Sinkronisasi data pesanan dan stok Shopee berhasil diselesaikan.</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Kolom Kiri: Detail Akun Toko & Status OAuth (1 col) */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {/* Card Toko Terhubung */}
          <div className="rounded-(--radius-card) border border-border bg-warm-white p-4 sm:p-5 shadow-xs">
            <h2 className="text-sm font-semibold text-ink">Informasi Toko Terhubung</h2>
            <p className="mt-0.5 text-xs text-muted">Akun Shopee Seller yang saat ini diotorisasi.</p>

            <div className="mt-4 flex flex-col divide-y divide-border text-xs">
              <div className="flex justify-between py-2.5">
                <span className="text-muted">Nama Toko</span>
                <span className="font-semibold text-ink">Karyalo Official Store</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-muted">Shop ID</span>
                <span className="font-mono font-medium text-ink">918230114</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-muted">Region</span>
                <span className="font-medium text-ink">Indonesia (ID)</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-muted">Partner ID</span>
                <span className="font-mono font-medium text-ink">2004812</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-muted">Status Token</span>
                <span className="font-medium text-status-success">Aktif (Expires in 28d)</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-muted">Tipe App</span>
                <span className="font-medium text-ink">In-House / Custom ERP</span>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <button
                type="button"
                className="tap-target inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-soft-sand px-3 py-2 text-xs font-semibold text-ink hover:bg-soft-sage hover:text-karyalo-green"
              >
                <KeyRound size={14} aria-hidden="true" />
                <span>Re-Authorize Toko (OAuth)</span>
              </button>
            </div>
          </div>

          {/* Card Keamanan & Perlindungan Data Shopee */}
          <div className="rounded-(--radius-card) border border-border bg-warm-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-center gap-2 text-deep-pine">
              <ShieldCheck size={18} className="text-karyalo-green" aria-hidden="true" />
              <h2 className="text-sm font-semibold text-ink">Kepatuhan Data & Privasi</h2>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Sistem Karyalo mematuhi <strong>Shopee Open Platform Data Protection Policy</strong> dan <strong>UU PDP No. 27/2022</strong>. Data pribadi pembeli (PII) dienkripsi saat transit (TLS 1.3) dan di-mask pada tampilan antarmuka.
            </p>
            <div className="mt-3 flex items-center gap-3 text-xs">
              <Link href="/privacy" className="font-medium text-karyalo-green hover:underline">
                Kebijakan Privasi
              </Link>
              <span className="text-border">•</span>
              <Link href="/terms" className="font-medium text-karyalo-green hover:underline">
                Ketentuan Layanan
              </Link>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Pengaturan Sinkronisasi API & Webhook (2 col) */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Card Fitur Sinkronisasi OpenAPI */}
          <div className="rounded-(--radius-card) border border-border bg-warm-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-ink">Pengaturan Sinkronisasi OpenAPI v2</h2>
                <p className="mt-0.5 text-xs text-muted">
                  Konfigurasi modul integrasi otomatis antara Karyalo Manage dan Shopee Seller Center.
                </p>
              </div>
              <Sliders size={18} className="text-muted" aria-hidden="true" />
            </div>

            <div className="mt-5 flex flex-col gap-4">
              {/* Toggle 1: Auto-sync Pesanan */}
              <div className="flex items-start justify-between gap-3 rounded-xl border border-border/80 bg-soft-sand/40 p-3.5 sm:p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-soft-sand text-karyalo-green">
                    <Zap size={16} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-ink">Sinkronisasi Pesanan Otomatis (v2.order)</h3>
                    <p className="mt-0.5 text-xs text-muted leading-relaxed">
                      Menarik pesanan baru berstatus <code className="rounded bg-soft-sand px-1 font-mono text-xs">READY_TO_SHIP</code> secara realtime ke daftar antrean fulfillment Karyalo.
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={autoSyncOrders}
                    onChange={(e) => setAutoSyncOrders(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-border peer-checked:bg-karyalo-green peer-checked:after:translate-x-full peer-checked:after:border-warm-white after:absolute after:top-[2px] after:left-[2px] after:size-5 after:rounded-full after:border after:border-border after:bg-warm-white after:transition-all after:content-['']" />
                </label>
              </div>

              {/* Toggle 2: Sinkronisasi Stok */}
              <div className="flex items-start justify-between gap-3 rounded-xl border border-border/80 bg-soft-sand/40 p-3.5 sm:p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-soft-sand text-karyalo-green">
                    <RefreshCw size={16} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-ink">Sinkronisasi Stok Dua Arah (v2.product.update_stock)</h3>
                    <p className="mt-0.5 text-xs text-muted leading-relaxed">
                      Memotong stok varian SKU secara instan saat terjadi checkout di Shopee maupun Storefront Web untuk mencegah <em>overselling</em>.
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={autoSyncStock}
                    onChange={(e) => setAutoSyncStock(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-border peer-checked:bg-karyalo-green peer-checked:after:translate-x-full peer-checked:after:border-warm-white after:absolute after:top-[2px] after:left-[2px] after:size-5 after:rounded-full after:border after:border-border after:bg-warm-white after:transition-all after:content-['']" />
                </label>
              </div>

              {/* Toggle 3: Logistik & Resi */}
              <div className="flex items-start justify-between gap-3 rounded-xl border border-border/80 bg-soft-sand/40 p-3.5 sm:p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-soft-sand text-karyalo-green">
                    <Radio size={16} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-ink">Integrasi Kurir & Cetak AWB (v2.logistics)</h3>
                    <p className="mt-0.5 text-xs text-muted leading-relaxed">
                      Menerbitkan nomor resi Shopee Xpress / J&T / SiCepat dan generate thermal label pengiriman langsung dari dashboard admin.
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={autoSyncLogistics}
                    onChange={(e) => setAutoSyncLogistics(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-border peer-checked:bg-karyalo-green peer-checked:after:translate-x-full peer-checked:after:border-warm-white after:absolute after:top-[2px] after:left-[2px] after:size-5 after:rounded-full after:border after:border-border after:bg-warm-white after:transition-all after:content-['']" />
                </label>
              </div>

              {/* Toggle 4: Notifikasi Web Push */}
              <div className="flex items-start justify-between gap-3 rounded-xl border border-border/80 bg-soft-sand/40 p-3.5 sm:p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-soft-sand text-karyalo-green">
                    <Clock size={16} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-ink">Web Push Notifikasi Pesanan Baru</h3>
                    <p className="mt-0.5 text-xs text-muted leading-relaxed">
                      Mengirimkan notifikasi langsung ke smartphone atau browser admin saat pesanan Shopee masuk.
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={pushNotification}
                    onChange={(e) => setPushNotification(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-border peer-checked:bg-karyalo-green peer-checked:after:translate-x-full peer-checked:after:border-warm-white after:absolute after:top-[2px] after:left-[2px] after:size-5 after:rounded-full after:border after:border-border after:bg-warm-white after:transition-all after:content-['']" />
                </label>
              </div>
            </div>
          </div>

          {/* Card Webhook Developer Endpoints */}
          <div className="rounded-(--radius-card) border border-border bg-warm-white p-4 sm:p-5 shadow-xs">
            <h2 className="text-sm font-semibold text-ink">Konfigurasi Endpoint & Webhook Shopee</h2>
            <p className="mt-0.5 text-xs text-muted">
              Alamat endpoint yang didaftarkan di Shopee Open Platform Console untuk penerimaan event realtime.
            </p>

            <div className="mt-4 flex flex-col gap-3 text-xs">
              <div className="flex flex-col gap-1 rounded-lg border border-border bg-soft-sand p-3">
                <span className="font-semibold text-ink">OAuth Redirect URL (Authorization Callback)</span>
                <code className="font-mono text-xs text-karyalo-green select-all break-all">
                  https://manage.karyalo.com/api/shopee/callback
                </code>
              </div>

              <div className="flex flex-col gap-1 rounded-lg border border-border bg-soft-sand p-3">
                <span className="font-semibold text-ink">Push Mechanism Webhook URL (Order & Tracking Event)</span>
                <code className="font-mono text-xs text-karyalo-green select-all break-all">
                  https://manage.karyalo.com/api/shopee/webhook
                </code>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4 text-xs sm:flex-row sm:items-center sm:justify-between">
              <span className="text-muted">Webhook Health Status: <strong className="text-status-success">200 OK (Verified)</strong></span>
              <a
                href="https://open.shopee.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-karyalo-green hover:underline"
              >
                <span>Buka Shopee Open Platform Console</span>
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
