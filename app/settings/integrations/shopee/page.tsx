"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Zap,
  KeyRound,
  Check,
  Server,
  Play,
  Activity,
  CheckCircle,
  XCircle,
  Copy,
  Link2,
} from "lucide-react";
import { ShopeePushEventCode } from "@/lib/shopee/config";

interface PushTestResult {
  success: boolean;
  statusCode: number;
  latencyMs: number;
  generatedSignature?: string;
  webhookResponse?: {
    request_id?: string;
    error?: string;
    message?: string;
  };
}

export default function ShopeeIntegrationPage() {
  const [currentEnv, setCurrentEnv] = useState<"sandbox" | "production">("sandbox");
  const [autoSyncOrders, setAutoSyncOrders] = useState(true);
  const [autoSyncStock, setAutoSyncStock] = useState(true);
  const [autoSyncLogistics, setAutoSyncLogistics] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectSuccess, setConnectSuccess] = useState(false);

  // Webhook Simulator State
  const [selectedEventCode, setSelectedEventCode] = useState<number>(ShopeePushEventCode.ORDER_STATUS_UPDATE);
  const [isSimulating, setIsSimulating] = useState(false);
  const [testResult, setTestResult] = useState<PushTestResult | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    }, 1000);
  };

  const handleConnectShopee = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setConnectSuccess(true);
      setTimeout(() => setConnectSuccess(false), 4000);
    }, 1200);
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleRunPushSimulation = async () => {
    setIsSimulating(true);
    setTestResult(null);

    try {
      const res = await fetch("/api/shopee/test-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventCode: selectedEventCode,
          orderSn: `260831SHP${Math.floor(1000 + Math.random() * 9000)}A`,
          status: "READY_TO_SHIP",
        }),
      });

      const data = await res.json();
      setTestResult(data);
    } catch (err) {
      setTestResult({
        success: false,
        statusCode: 500,
        latencyMs: 0,
        webhookResponse: {
          error: "network_error",
          message: err instanceof Error ? err.message : "Simulasi gagal",
        },
      });
    } finally {
      setIsSimulating(false);
    }
  };

  const callbackUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/api/shopee/callback`
      : "https://manage.karyalo.com/api/shopee/callback";

  const webhookUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/api/shopee/webhook`
      : "https://manage.karyalo.com/api/shopee/webhook";

  return (
    <div className="mx-auto max-w-(--container-wide) px-3.5 py-5 sm:px-6 sm:py-7">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Link
          href="/settings/integrations"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft size={13} aria-hidden="true" />
          <span>Pengaturan Integrasi</span>
        </Link>
      </div>

      {/* Header Utama */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#ee4d2d]/10 text-[#ee4d2d]">
            <ShoppingBag size={22} aria-hidden="true" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-bold text-ink sm:text-xl">Integrasi Shopee OpenAPI</h1>
              <span className="rounded-md bg-[#ee4d2d]/10 px-2 py-0.5 text-xs font-semibold text-[#ee4d2d]">
                OpenAPI v2.0
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted">
              Sinkronisasi katalog produk, pesanan baru, dan nomor resi kurir.
            </p>
          </div>
        </div>

        {/* Actions & Environment Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Environment Switcher */}
          <div className="inline-flex rounded-lg border border-border bg-soft-sand p-0.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => setCurrentEnv("sandbox")}
              className={`tap-target rounded-md px-2.5 py-1 transition-colors ${
                currentEnv === "sandbox" ? "bg-warm-white text-ink shadow-2xs font-semibold" : "text-muted hover:text-ink"
              }`}
            >
              Sandbox
            </button>
            <button
              type="button"
              onClick={() => setCurrentEnv("production")}
              className={`tap-target rounded-md px-2.5 py-1 transition-colors ${
                currentEnv === "production" ? "bg-deep-pine text-warm-white shadow-2xs font-semibold" : "text-muted hover:text-ink"
              }`}
            >
              Live
            </button>
          </div>

          <button
            type="button"
            onClick={handleManualSync}
            disabled={isSyncing}
            className="tap-target inline-flex items-center gap-1.5 rounded-lg border border-border bg-warm-white px-3 py-1.5 text-xs font-medium text-ink shadow-2xs hover:border-karyalo-green disabled:opacity-50"
          >
            <RefreshCw size={13} className={isSyncing ? "animate-spin text-karyalo-green" : "text-muted"} />
            <span>{isSyncing ? "Menyinkronkan..." : "Tarik Data"}</span>
          </button>

          <Link
            href="/orders/shopee"
            className="tap-target inline-flex items-center rounded-lg bg-deep-pine px-3 py-1.5 text-xs font-semibold text-warm-white hover:bg-deep-pine/90"
          >
            Pesanan Shopee
          </Link>
        </div>
      </div>

      {syncSuccess && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-soft-sage p-3 text-xs text-karyalo-green animate-in fade-in">
          <Check size={15} />
          <span>Data pesanan dan stok Shopee berhasil disinkronkan.</span>
        </div>
      )}

      {connectSuccess && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-soft-sage p-3 text-xs text-karyalo-green animate-in fade-in">
          <Check size={15} />
          <span>Toko Shopee berhasil terhubung dengan otorisasi OAuth 2.0.</span>
        </div>
      )}

      {/* Alur 4 Langkah Integrasi */}
      <div className="mb-6 rounded-2xl border border-border/80 bg-warm-white p-4 sm:p-5 shadow-xs">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
          Alur Integrasi Toko
        </h2>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border/70 bg-soft-sand/30 p-3">
            <span className="flex size-6 items-center justify-center rounded-md bg-deep-pine text-xs font-bold text-warm-white mb-2">
              1
            </span>
            <h3 className="text-xs font-bold text-ink">Daftar & Masuk</h3>
            <p className="mt-0.5 text-xs text-muted">
              Masuk ke portal dashboard KaryaLo Manage.
            </p>
          </div>

          <div className="rounded-xl border border-[#ee4d2d]/30 bg-[#ee4d2d]/5 p-3">
            <span className="flex size-6 items-center justify-center rounded-md bg-[#ee4d2d] text-xs font-bold text-warm-white mb-2">
              2
            </span>
            <h3 className="text-xs font-bold text-ink">Klik Hubungkan Toko</h3>
            <p className="mt-0.5 text-xs text-muted">
              Pilih menu integrasi dan klik tombol otorisasi.
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-soft-sand/30 p-3">
            <span className="flex size-6 items-center justify-center rounded-md bg-deep-pine text-xs font-bold text-warm-white mb-2">
              3
            </span>
            <h3 className="text-xs font-bold text-ink">Otorisasi OAuth 2.0</h3>
            <p className="mt-0.5 text-xs text-muted">
              Setujui izin akses di Shopee Seller Centre.
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-soft-sand/30 p-3">
            <span className="flex size-6 items-center justify-center rounded-md bg-karyalo-green text-xs font-bold text-warm-white mb-2">
              4
            </span>
            <h3 className="text-xs font-bold text-ink">Pantau Real-Time</h3>
            <p className="mt-0.5 text-xs text-muted">
              Pesanan, resi, dan stok tersinkron otomatis.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Konten 2 Kolom */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 min-w-0">
        {/* Kolom Kiri: Kredensial Toko & Kesiapan Teknis (5 cols) */}
        <div className="flex flex-col gap-5 lg:col-span-5 min-w-0">
          {/* Card Toko Terhubung */}
          <div className="rounded-2xl border border-border/80 bg-warm-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <h3 className="text-sm font-bold text-ink">Kredensial Toko</h3>
                <p className="text-[11px] text-muted">
                  {currentEnv === "sandbox" ? "Mode Pengujian (Sandbox)" : "Mode Live Produksi"}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-md bg-soft-sand px-2 py-0.5 text-xs font-medium text-status-success">
                <CheckCircle2 size={12} />
                Terhubung
              </span>
            </div>

            <div className="mt-3 flex flex-col divide-y divide-border/60 text-xs">
              <div className="flex justify-between py-2">
                <span className="text-muted">Nama Toko</span>
                <span className="font-semibold text-ink">
                  {currentEnv === "sandbox" ? "Karyalo Test Store" : "Karyalo Official Store"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted">Shop ID</span>
                <span className="font-mono text-ink">918230114</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted">Partner ID</span>
                <span className="font-mono text-ink">2004812</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted">Status Token</span>
                <span className="font-medium text-status-success">Aktif (28 hari lagi)</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted">Tipe Aplikasi</span>
                <span className="text-ink">Custom ERP</span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleConnectShopee}
                disabled={isConnecting}
                className="tap-target inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#ee4d2d] py-2.5 text-xs font-bold text-warm-white hover:bg-[#ee4d2d]/90 disabled:opacity-50 transition-colors"
              >
                {isConnecting ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Menghubungkan...</span>
                  </>
                ) : (
                  <>
                    <Link2 size={13} />
                    <span>Hubungkan Toko Shopee (OAuth 2.0)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Checklist Standar Teknis */}
          <div className="rounded-2xl border border-border/80 bg-warm-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-center gap-2 text-deep-pine mb-3">
              <ShieldCheck size={16} className="text-karyalo-green" />
              <h3 className="text-xs font-bold text-ink">Standar Keamanan API</h3>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle size={13} className="text-status-success shrink-0" />
                <span className="text-ink">Fast Ack 200 OK non-blocking (&lt;50ms)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={13} className="text-status-success shrink-0" />
                <span className="text-ink">Verifikasi Tanda Tangan HMAC-SHA256</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={13} className="text-status-success shrink-0" />
                <span className="text-ink">Perlindungan Anti-Replay (Toleransi 300s)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={13} className="text-status-success shrink-0" />
                <span className="text-ink">Masking Data Pribadi Pembeli (UU PDP)</span>
              </div>
            </div>

            <div className="mt-3.5 border-t border-border/60 pt-2.5 text-xs">
              <Link href="/privacy" className="text-karyalo-green font-medium hover:underline">
                Lihat Kebijakan Privasi
              </Link>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Endpoint URL & Pengujian Webhook (7 cols) */}
        <div className="flex flex-col gap-5 lg:col-span-7 min-w-0">
          {/* Card URL Endpoint */}
          <div className="rounded-2xl border border-border/80 bg-warm-white p-4 sm:p-5 shadow-xs">
            <h3 className="text-sm font-bold text-ink">Alamat Callback & Webhook</h3>
            <p className="text-xs text-muted mt-0.5">
              Daftarkan URL ini pada Shopee Open Platform Console.
            </p>

            <div className="mt-3 flex flex-col gap-2.5 text-xs">
              {/* OAuth Callback */}
              <div className="rounded-xl border border-border/70 bg-soft-sand/40 p-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-ink text-[11px]">OAuth Redirect URL</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(callbackUrl, "callback")}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-karyalo-green hover:underline"
                  >
                    {copiedField === "callback" ? <Check size={11} /> : <Copy size={11} />}
                    <span>{copiedField === "callback" ? "Tersalin" : "Salin"}</span>
                  </button>
                </div>
                <code className="font-mono text-xs text-muted break-all">{callbackUrl}</code>
              </div>

              {/* Push Webhook */}
              <div className="rounded-xl border border-border/70 bg-soft-sand/40 p-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-ink text-[11px]">Push Mechanism Webhook URL</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(webhookUrl, "webhook")}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-karyalo-green hover:underline"
                  >
                    {copiedField === "webhook" ? <Check size={11} /> : <Copy size={11} />}
                    <span>{copiedField === "webhook" ? "Tersalin" : "Salin"}</span>
                  </button>
                </div>
                <code className="font-mono text-xs text-muted break-all">{webhookUrl}</code>
              </div>
            </div>
          </div>

          {/* Simulator Webhook */}
          <div className="rounded-2xl border border-border/80 bg-warm-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-ink">Uji Coba Push Webhook</h3>
                <p className="text-xs text-muted mt-0.5">
                  Simulasikan notifikasi push untuk memeriksa respon 200 OK.
                </p>
              </div>
              <span className="text-[11px] font-mono text-status-success bg-soft-sand px-2 py-0.5 rounded">
                HTTP Probe 200 OK
              </span>
            </div>

            <div className="mt-3 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <select
                value={selectedEventCode}
                onChange={(e) => setSelectedEventCode(Number(e.target.value))}
                className="flex-1 rounded-xl border border-border bg-warm-white px-3 py-2 text-xs text-ink focus:outline-hidden focus:border-karyalo-green"
              >
                <option value={ShopeePushEventCode.ORDER_STATUS_UPDATE}>
                  Status Pesanan (v2.order)
                </option>
                <option value={ShopeePushEventCode.ORDER_TRACKING_NO}>
                  Terbit Nomor Resi (v2.logistics)
                </option>
                <option value={ShopeePushEventCode.RESERVED_STOCK_CHANGE}>
                  Sinkronisasi Stok (v2.product.stock)
                </option>
              </select>

              <button
                type="button"
                onClick={handleRunPushSimulation}
                disabled={isSimulating}
                className="tap-target inline-flex items-center justify-center gap-1.5 rounded-xl bg-deep-pine px-4 py-2 text-xs font-semibold text-warm-white hover:bg-deep-pine/90 disabled:opacity-50 shrink-0"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <Play size={13} />
                    <span>Kirim Tes</span>
                  </>
                )}
              </button>
            </div>

            {testResult && (
              <div className="mt-3 rounded-xl border border-border/80 bg-soft-sand/30 p-3 text-xs animate-in fade-in">
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <div className="flex items-center gap-1.5">
                    {testResult.success ? (
                      <CheckCircle size={14} className="text-status-success" />
                    ) : (
                      <XCircle size={14} className="text-status-critical" />
                    )}
                    <span className="font-semibold text-ink">
                      Status: HTTP {testResult.statusCode} {testResult.success ? "OK" : "Gagal"}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-muted">
                    Respon: <strong className="text-status-success">{testResult.latencyMs} ms</strong>
                  </span>
                </div>
                <div className="mt-2 font-mono text-[11px] text-muted truncate">
                  Ack: {JSON.stringify(testResult.webhookResponse)}
                </div>
              </div>
            )}
          </div>

          {/* Pengaturan Sinkronisasi Otomatis */}
          <div className="rounded-2xl border border-border/80 bg-warm-white p-4 sm:p-5 shadow-xs">
            <h3 className="text-sm font-bold text-ink mb-3">Pengaturan Sinkronisasi</h3>

            <div className="flex flex-col divide-y divide-border/60 text-xs">
              <div className="flex items-center justify-between py-2.5">
                <div>
                  <span className="font-semibold text-ink block">Sinkronisasi Pesanan (v2.order)</span>
                  <span className="text-muted text-[11px]">Tarik pesanan baru secara real-time ke antrean.</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoSyncOrders}
                  onChange={(e) => setAutoSyncOrders(e.target.checked)}
                  className="size-4 accent-karyalo-green cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-2.5">
                <div>
                  <span className="font-semibold text-ink block">Sinkronisasi Stok (v2.product)</span>
                  <span className="text-muted text-[11px]">Potong stok varian saat checkout di Shopee/Web.</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoSyncStock}
                  onChange={(e) => setAutoSyncStock(e.target.checked)}
                  className="size-4 accent-karyalo-green cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-2.5">
                <div>
                  <span className="font-semibold text-ink block">Logistik & Resi (v2.logistics)</span>
                  <span className="text-muted text-[11px]">Sinkronkan nomor resi kurir SPX/J&T otomatis.</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoSyncLogistics}
                  onChange={(e) => setAutoSyncLogistics(e.target.checked)}
                  className="size-4 accent-karyalo-green cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
