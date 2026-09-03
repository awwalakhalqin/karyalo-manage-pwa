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
  AlertTriangle,
  Server,
  Play,
  Activity,
  Lock,
  Flame,
  CheckCircle,
  XCircle,
  Copy,
} from "lucide-react";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";
import { ShopeePushEventCode, SHOPEE_EVENT_NAMES } from "@/lib/shopee/config";

interface PushTestResult {
  success: boolean;
  statusCode: number;
  latencyMs: number;
  generatedSignature?: string;
  sentPayload?: Record<string, unknown>;
  webhookResponse?: {
    request_id?: string;
    error?: string;
    message?: string;
    ack_latency_ms?: number;
  };
  environment?: string;
}

export default function ShopeeIntegrationPage() {
  // Environment state (Sandbox vs Production)
  const [currentEnv, setCurrentEnv] = useState<"sandbox" | "production">("sandbox");

  // Sync toggles
  const [autoSyncOrders, setAutoSyncOrders] = useState(true);
  const [autoSyncStock, setAutoSyncStock] = useState(true);
  const [autoSyncLogistics, setAutoSyncLogistics] = useState(true);
  const [pushNotification, setPushNotification] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Webhook Simulator State
  const [selectedEventCode, setSelectedEventCode] = useState<number>(ShopeePushEventCode.ORDER_STATUS_UPDATE);
  const [isSimulating, setIsSimulating] = useState(false);
  const [testResult, setTestResult] = useState<PushTestResult | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
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
          message: err instanceof Error ? err.message : "Gagal memicu simulasi push",
        },
      });
    } finally {
      setIsSimulating(false);
    }
  };

  const callbackUrl = typeof window !== "undefined" ? `${window.location.origin}/api/shopee/callback` : "https://manage.karyalo.com/api/shopee/callback";
  const webhookUrl = typeof window !== "undefined" ? `${window.location.origin}/api/shopee/webhook` : "https://manage.karyalo.com/api/shopee/webhook";

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
                OpenAPI v2.0
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                  currentEnv === "sandbox"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-soft-sand text-status-success"
                }`}
              >
                <CheckCircle2 size={12} aria-hidden="true" />
                {currentEnv === "sandbox" ? "Sandbox Test Mode" : "Live Production"}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted">
              Manajemen koneksi toko, validasi Webhook Push Mechanism, dan otomasi pesanan Shopee.
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
            <RefreshCw
              size={14}
              className={isSyncing ? "animate-spin text-karyalo-green" : "text-muted"}
              aria-hidden="true"
            />
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

      <SampleDataBanner note="Modul ini telah di-harden dengan arsitektur Shopee OpenAPI Push Mechanism: Fast 200 OK Ack (<50ms), HMAC-SHA256 signature verification, anti-replay protection, dan multi-environment Sandbox/Live." />

      {savedSuccess && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-soft-sage p-3 text-xs font-medium text-karyalo-green">
          <Check size={16} aria-hidden="true" />
          <span>Sinkronisasi data pesanan dan stok Shopee berhasil diselesaikan.</span>
        </div>
      )}

      {/* Selector Environment Mode (Sandbox vs Live) */}
      <div className="mb-6 rounded-(--radius-card) border border-border bg-warm-white p-4 shadow-xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Server size={16} className="text-karyalo-green" aria-hidden="true" />
              <h2 className="text-sm font-semibold text-ink">Target Environment Shopee OpenAPI</h2>
            </div>
            <p className="mt-0.5 text-xs text-muted">
              Pilih mode lingkungan pengujian sesuai akun Shopee Open Platform Anda.
            </p>
          </div>

          <div className="inline-flex rounded-lg border border-border bg-soft-sand p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setCurrentEnv("sandbox")}
              className={`tap-target rounded-md px-3 py-1.5 transition-all ${
                currentEnv === "sandbox"
                  ? "bg-warm-white text-ink shadow-xs"
                  : "text-muted hover:text-ink"
              }`}
            >
              🧪 Sandbox (Testing)
            </button>
            <button
              type="button"
              onClick={() => setCurrentEnv("production")}
              className={`tap-target rounded-md px-3 py-1.5 transition-all ${
                currentEnv === "production"
                  ? "bg-deep-pine text-warm-white shadow-xs"
                  : "text-muted hover:text-ink"
              }`}
            >
              🚀 Live (Production)
            </button>
          </div>
        </div>

        {currentEnv === "sandbox" && (
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 p-2.5 text-xs text-amber-900 border border-amber-200/70">
            <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-700" aria-hidden="true" />
            <span>
              <strong>Mode Sandbox Aktif:</strong> Menggunakan endpoint host{" "}
              <code className="font-mono font-bold">partner.test-stable.shopeemobile.com</code>. Gunakan akun Seller Test di Console Shopee Open Platform Sandbox untuk memicu push notification simulasi.
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Kolom Kiri: Detail Akun Toko & Keamanan (1 col) */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {/* Card Toko Terhubung */}
          <div className="rounded-(--radius-card) border border-border bg-warm-white p-4 sm:p-5 shadow-xs">
            <h2 className="text-sm font-semibold text-ink">Informasi Kredensial OpenAPI</h2>
            <p className="mt-0.5 text-xs text-muted">Akun Shopee Seller yang saat ini diotorisasi.</p>

            <div className="mt-4 flex flex-col divide-y divide-border text-xs">
              <div className="flex justify-between py-2.5">
                <span className="text-muted">Nama Toko</span>
                <span className="font-semibold text-ink">
                  {currentEnv === "sandbox" ? "Karyalo Test Store (Sandbox)" : "Karyalo Official Store"}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-muted">Shop ID</span>
                <span className="font-mono font-medium text-ink">
                  {currentEnv === "sandbox" ? "918230114 (Test)" : "918230114"}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-muted">API Host</span>
                <span className="font-mono text-xs text-muted truncate max-w-[160px]">
                  {currentEnv === "sandbox"
                    ? "partner.test-stable..."
                    : "partner.shopeemobile..."}
                </span>
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
                <span className="font-medium text-ink">Custom ERP / In-House</span>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <button
                type="button"
                className="tap-target inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-soft-sand px-3 py-2 text-xs font-semibold text-ink hover:bg-soft-sage hover:text-karyalo-green"
              >
                <KeyRound size={14} aria-hidden="true" />
                <span>Re-Authorize Toko (OAuth v2)</span>
              </button>
            </div>
          </div>

          {/* Card Checklist Kesiapan Keamanan & Webhook */}
          <div className="rounded-(--radius-card) border border-border bg-warm-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-center gap-2 text-deep-pine">
              <ShieldCheck size={18} className="text-karyalo-green" aria-hidden="true" />
              <h2 className="text-sm font-semibold text-ink">Checklist Kesiapan Webhook</h2>
            </div>
            <p className="mt-1 text-xs text-muted">Status proteksi dan kepatuhan backend Karyalo:</p>

            <div className="mt-3 flex flex-col gap-2.5 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-status-success shrink-0" />
                <span className="text-ink">
                  <strong>Fast Ack 200 OK:</strong> Respon non-blocking (&lt;50ms)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-status-success shrink-0" />
                <span className="text-ink">
                  <strong>Signature Verify:</strong> HMAC-SHA256 Timing-Safe
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-status-success shrink-0" />
                <span className="text-ink">
                  <strong>Anti-Replay Attack:</strong> Toleransi timestamp 300s
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-status-success shrink-0" />
                <span className="text-ink">
                  <strong>Idempotency Cache:</strong> Deduplikasi 1 Jam
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-status-success shrink-0" />
                <span className="text-ink">
                  <strong>UU PDP & PII:</strong> Masking data sensitif pembeli
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 border-t border-border pt-3 text-xs">
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

        {/* Kolom Kanan: Simulator Webhook & Pengaturan (2 col) */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Card Webhook Developer Endpoints */}
          <div className="rounded-(--radius-card) border border-border bg-warm-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-ink">Konfigurasi Callback & Webhook URL</h2>
                <p className="mt-0.5 text-xs text-muted">
                  Daftarkan alamat URL berikut pada Shopee Open Platform Console.
                </p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-soft-sage px-2.5 py-1 text-xs font-medium text-status-success">
                <Activity size={12} className="animate-pulse" />
                <span>Endpoint Ready</span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 text-xs">
              {/* Callback URL */}
              <div className="flex flex-col gap-1 rounded-lg border border-border bg-soft-sand p-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-ink">OAuth Redirect URL (Authorization Callback)</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(callbackUrl, "callback")}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-karyalo-green hover:underline"
                  >
                    {copiedField === "callback" ? (
                      <>
                        <Check size={12} />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
                <code className="font-mono text-xs text-karyalo-green select-all break-all">
                  {callbackUrl}
                </code>
              </div>

              {/* Webhook Push URL */}
              <div className="flex flex-col gap-1 rounded-lg border border-border bg-soft-sand p-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-ink">Push Mechanism Webhook URL (Realtime Event)</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(webhookUrl, "webhook")}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-karyalo-green hover:underline"
                  >
                    {copiedField === "webhook" ? (
                      <>
                        <Check size={12} />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
                <code className="font-mono text-xs text-karyalo-green select-all break-all">
                  {webhookUrl}
                </code>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4 text-xs sm:flex-row sm:items-center sm:justify-between">
              <span className="text-muted">
                HTTP Probe Status: <strong className="text-status-success">200 OK (GET & POST Supported)</strong>
              </span>
              <a
                href={currentEnv === "sandbox" ? "https://open.shopee.com" : "https://open.shopee.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-karyalo-green hover:underline"
              >
                <span>Buka Shopee Console</span>
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Card Webhook Push Simulator (BARU - Hardening & Testing) */}
          <div className="rounded-(--radius-card) border border-border bg-warm-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame size={18} className="text-[#ee4d2d]" aria-hidden="true" />
                <div>
                  <h2 className="text-sm font-semibold text-ink">Push Notification Test Simulator</h2>
                  <p className="mt-0.5 text-xs text-muted">
                    Uji endpoint webhook lokal secara langsung untuk memvalidasi respon 200 OK dan HMAC signature.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 rounded-xl border border-border/80 bg-soft-sand/40 p-3.5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <label htmlFor="event-select" className="text-xs font-semibold text-ink sm:w-1/3">
                  Pilih Tipe Event:
                </label>
                <select
                  id="event-select"
                  value={selectedEventCode}
                  onChange={(e) => setSelectedEventCode(Number(e.target.value))}
                  className="flex-1 rounded-lg border border-border bg-warm-white px-3 py-1.5 text-xs text-ink focus:border-karyalo-green focus:outline-none"
                >
                  <option value={ShopeePushEventCode.ORDER_STATUS_UPDATE}>
                    Code 3: Update Status Pesanan (v2.order)
                  </option>
                  <option value={ShopeePushEventCode.ORDER_TRACKING_NO}>
                    Code 4: Terbit Nomor Resi (v2.logistics)
                  </option>
                  <option value={ShopeePushEventCode.RESERVED_STOCK_CHANGE}>
                    Code 9: Sinkronisasi Stok (v2.product.stock)
                  </option>
                  <option value={ShopeePushEventCode.RETURN_REFUND_UPDATE}>
                    Code 10: Pengajuan Retur / Refund
                  </option>
                </select>

                <button
                  type="button"
                  onClick={handleRunPushSimulation}
                  disabled={isSimulating}
                  className="tap-target inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#ee4d2d] px-4 py-2 text-xs font-semibold text-warm-white shadow-xs hover:bg-[#ee4d2d]/90 disabled:opacity-50"
                >
                  {isSimulating ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <Play size={13} />
                      <span>Kirim Simulasi Push</span>
                    </>
                  )}
                </button>
              </div>

              {/* Hasil Simulasi */}
              {testResult && (
                <div className="mt-3 rounded-lg border border-border bg-warm-white p-3 text-xs">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <div className="flex items-center gap-2">
                      {testResult.success ? (
                        <CheckCircle size={15} className="text-status-success" />
                      ) : (
                        <XCircle size={15} className="text-status-critical" />
                      )}
                      <span className="font-semibold text-ink">
                        Status Respon: HTTP {testResult.statusCode} {testResult.success ? "OK" : "Failed"}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-semibold text-muted">
                      Latency: <strong className="text-status-success">{testResult.latencyMs} ms</strong>
                    </span>
                  </div>

                  <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2 text-[11px]">
                    <div>
                      <span className="text-muted">HMAC-SHA256 Signature:</span>
                      <p className="font-mono text-[10px] text-ink break-all mt-0.5">
                        {testResult.generatedSignature || "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted">Acknowledgment Payload:</span>
                      <pre className="mt-0.5 rounded bg-soft-sand p-1.5 font-mono text-[10px] text-ink overflow-x-auto">
                        {JSON.stringify(testResult.webhookResponse, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card Panduan Audit & Troubleshooting 3 Poin */}
          <div className="rounded-(--radius-card) border border-border bg-warm-white p-4 sm:p-5 shadow-xs">
            <h2 className="text-sm font-semibold text-ink">Panduan Solusi Kendala Pengujian & Live</h2>
            <p className="mt-0.5 text-xs text-muted">
              Pemeriksaan wajib saat notifikasi push Shopee tidak kunjung masuk ke server:
            </p>

            <div className="mt-4 flex flex-col gap-3 text-xs">
              <div className="rounded-lg border border-border bg-soft-sand/40 p-3">
                <h3 className="font-semibold text-ink flex items-center gap-1.5">
                  <Server size={14} className="text-karyalo-green" />
                  <span>1. Environment Sesuai (Live vs Sandbox)</span>
                </h3>
                <p className="mt-1 text-muted leading-relaxed">
                  Pastikan akun testing Anda menggunakan kredensial dan URL Callback di <strong>Sandbox</strong> jika menguji dengan akun test Shopee, atau di <strong>Live</strong> jika menguji toko sungguhan. URL endpoint dan App Key pada kedua environment tidak boleh tertukar.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-soft-sand/40 p-3">
                <h3 className="font-semibold text-ink flex items-center gap-1.5">
                  <Zap size={14} className="text-karyalo-green" />
                  <span>2. Respon Server Wajib 200 OK Cepat (&lt;1 Detik)</span>
                </h3>
                <p className="mt-1 text-muted leading-relaxed">
                  Endpoint webhook Karyalo mengembalikan status code <code>200 OK</code> dengan format JSON <code>{`{"request_id": "...", "error": "", "message": "success"}`}</code> secara non-blocking dalam &lt;50ms. Pemrosesan database dilakukan di latar belakang (*asynchronous*) agar Shopee tidak menganggap pengiriman gagal/timeout.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-soft-sand/40 p-3">
                <h3 className="font-semibold text-ink flex items-center gap-1.5">
                  <Lock size={14} className="text-karyalo-green" />
                  <span>3. Firewall, IP Whitelist & Keamanan Signature</span>
                </h3>
                <p className="mt-1 text-muted leading-relaxed">
                  Pastikan server hosting/firewall Anda tidak memblokir IP Shopee dan URL webhook mendukung <strong>HTTPS publik</strong>. Setiap payload divalidasi dengan tanda tangan kriptografi <strong>HMAC-SHA256</strong> dan toleransi anti-replay 5 menit.
                </p>
              </div>
            </div>
          </div>

          {/* Card Fitur Sinkronisasi OpenAPI v2 */}
          <div className="rounded-(--radius-card) border border-border bg-warm-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-ink">Pengaturan Sinkronisasi Otomatis</h2>
                <p className="mt-0.5 text-xs text-muted">
                  Otomasi sinkronisasi data antara Karyalo Manage dan Shopee Seller Center.
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
        </div>
      </div>
    </div>
  );
}
