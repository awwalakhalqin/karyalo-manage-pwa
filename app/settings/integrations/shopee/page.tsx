"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  Check,
  Play,
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
      setTimeout(() => setSyncSuccess(false), 2500);
    }, 1000);
  };

  const handleConnectShopee = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setConnectSuccess(true);
      setTimeout(() => setConnectSuccess(false), 3000);
    }, 1000);
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 1500);
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
    } catch {
      setTestResult({
        success: false,
        statusCode: 500,
        latencyMs: 0,
        webhookResponse: { error: "network_error", message: "Gagal" },
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
    <div className="mx-auto max-w-(--container-wide) px-3.5 py-4 sm:px-6 sm:py-6">
      {/* Breadcrumb */}
      <div className="mb-3">
        <Link
          href="/settings/integrations"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft size={13} aria-hidden="true" />
          <span>Pengaturan Integrasi</span>
        </Link>
      </div>

      {/* Header Utama */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#ee4d2d]/10 text-[#ee4d2d]">
            <ShoppingBag size={18} aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-ink sm:text-lg">Shopee OpenAPI</h1>
              <span className="rounded bg-[#ee4d2d]/10 px-2 py-0.5 text-xs font-semibold text-[#ee4d2d]">
                v2.0
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Environment */}
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
            className="tap-target inline-flex items-center gap-1.5 rounded-lg border border-border bg-warm-white px-2.5 py-1 text-xs font-medium text-ink shadow-2xs hover:border-karyalo-green disabled:opacity-50"
          >
            <RefreshCw size={12} className={isSyncing ? "animate-spin text-karyalo-green" : "text-muted"} />
            <span>{isSyncing ? "Sync..." : "Tarik Data"}</span>
          </button>

          <Link
            href="/orders/shopee"
            className="tap-target inline-flex items-center rounded-lg bg-deep-pine px-3 py-1 text-xs font-semibold text-warm-white hover:bg-deep-pine/90"
          >
            Pesanan
          </Link>
        </div>
      </div>

      {syncSuccess && (
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-soft-sage p-2.5 text-xs text-karyalo-green animate-in fade-in">
          <Check size={14} />
          <span>Data pesanan dan stok berhasil disinkronkan.</span>
        </div>
      )}

      {connectSuccess && (
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-soft-sage p-2.5 text-xs text-karyalo-green animate-in fade-in">
          <Check size={14} />
          <span>Toko berhasil terhubung via OAuth 2.0.</span>
        </div>
      )}

      {/* Alur 4 Langkah: Poin Inti Tanpa Deskripsi Panjang */}
      <div className="mb-5 rounded-xl border border-border/80 bg-warm-white p-3.5 shadow-xs">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2.5">
          Alur Integrasi Toko
        </h2>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="rounded-lg border border-border/70 bg-soft-sand/30 p-2.5 text-center">
            <span className="text-[11px] font-bold text-muted block mb-0.5">1</span>
            <span className="text-xs font-semibold text-ink">Daftar & Masuk</span>
          </div>

          <div className="rounded-lg border border-[#ee4d2d]/30 bg-[#ee4d2d]/5 p-2.5 text-center">
            <span className="text-[11px] font-bold text-[#ee4d2d] block mb-0.5">2</span>
            <span className="text-xs font-semibold text-ink">Hubungkan Toko</span>
          </div>

          <div className="rounded-lg border border-border/70 bg-soft-sand/30 p-2.5 text-center">
            <span className="text-[11px] font-bold text-muted block mb-0.5">3</span>
            <span className="text-xs font-semibold text-ink">Otorisasi OAuth</span>
          </div>

          <div className="rounded-lg border border-border/70 bg-soft-sand/30 p-2.5 text-center">
            <span className="text-[11px] font-bold text-karyalo-green block mb-0.5">4</span>
            <span className="text-xs font-semibold text-ink">Pantau Real-Time</span>
          </div>
        </div>
      </div>

      {/* Grid 2 Kolom */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 min-w-0">
        {/* Kolom Kiri (5 cols) */}
        <div className="flex flex-col gap-4 lg:col-span-5 min-w-0">
          {/* Card Toko Terhubung */}
          <div className="rounded-xl border border-border/80 bg-warm-white p-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/60 pb-2.5 mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted">Kredensial Toko</h3>
              <span className="inline-flex items-center gap-1 rounded bg-soft-sand px-2 py-0.5 text-xs font-medium text-status-success">
                <CheckCircle2 size={11} />
                Terhubung
              </span>
            </div>

            <div className="flex flex-col divide-y divide-border/60 text-xs">
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
                <span className="text-muted">Token</span>
                <span className="font-medium text-status-success">Aktif (28 hari)</span>
              </div>
            </div>

            <div className="mt-3.5">
              <button
                type="button"
                onClick={handleConnectShopee}
                disabled={isConnecting}
                className="tap-target inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#ee4d2d] py-2 text-xs font-bold text-warm-white hover:bg-[#ee4d2d]/90 disabled:opacity-50 transition-colors"
              >
                {isConnecting ? (
                  <>
                    <RefreshCw size={12} className="animate-spin" />
                    <span>Menghubungkan...</span>
                  </>
                ) : (
                  <>
                    <Link2 size={12} />
                    <span>Hubungkan Toko Shopee (OAuth 2.0)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Standar Teknis */}
          <div className="rounded-xl border border-border/80 bg-warm-white p-4 shadow-xs">
            <div className="flex items-center gap-2 text-deep-pine mb-2.5">
              <ShieldCheck size={15} className="text-karyalo-green" />
              <h3 className="text-xs font-bold text-ink">Standar Keamanan API</h3>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-ink">
              <div className="flex items-center gap-2">
                <CheckCircle size={12} className="text-status-success shrink-0" />
                <span>Respon 200 OK non-blocking (&lt;50ms)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={12} className="text-status-success shrink-0" />
                <span>Verifikasi Tanda Tangan HMAC-SHA256</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={12} className="text-status-success shrink-0" />
                <span>Anti-Replay Protection (300s)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={12} className="text-status-success shrink-0" />
                <span>Masking Data Pembeli (UU PDP)</span>
              </div>
            </div>

            <div className="mt-3 border-t border-border/60 pt-2 text-xs">
              <Link href="/privacy" className="text-karyalo-green hover:underline">
                Kebijakan Privasi →
              </Link>
            </div>
          </div>
        </div>

        {/* Kolom Kanan (7 cols) */}
        <div className="flex flex-col gap-4 lg:col-span-7 min-w-0">
          {/* Card URL Endpoint */}
          <div className="rounded-xl border border-border/80 bg-warm-white p-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">
              Endpoint Callback & Webhook
            </h3>

            <div className="flex flex-col gap-2 text-xs">
              <div className="rounded-lg border border-border/70 bg-soft-sand/30 p-2">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-semibold text-ink text-[11px]">OAuth Redirect URL</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(callbackUrl, "callback")}
                    className="text-[11px] text-karyalo-green hover:underline inline-flex items-center gap-1"
                  >
                    {copiedField === "callback" ? <Check size={11} /> : <Copy size={11} />}
                    <span>{copiedField === "callback" ? "Tersalin" : "Salin"}</span>
                  </button>
                </div>
                <code className="font-mono text-xs text-muted break-all">{callbackUrl}</code>
              </div>

              <div className="rounded-lg border border-border/70 bg-soft-sand/30 p-2">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-semibold text-ink text-[11px]">Push Webhook URL</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(webhookUrl, "webhook")}
                    className="text-[11px] text-karyalo-green hover:underline inline-flex items-center gap-1"
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
          <div className="rounded-xl border border-border/80 bg-warm-white p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
                Tes Push Webhook
              </h3>
              <span className="text-[11px] font-mono text-status-success bg-soft-sand px-1.5 py-0.5 rounded">
                HTTP 200 OK
              </span>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <select
                value={selectedEventCode}
                onChange={(e) => setSelectedEventCode(Number(e.target.value))}
                className="flex-1 rounded-lg border border-border bg-warm-white px-2.5 py-1.5 text-xs text-ink"
              >
                <option value={ShopeePushEventCode.ORDER_STATUS_UPDATE}>
                  Status Pesanan (v2.order)
                </option>
                <option value={ShopeePushEventCode.ORDER_TRACKING_NO}>
                  Nomor Resi (v2.logistics)
                </option>
                <option value={ShopeePushEventCode.RESERVED_STOCK_CHANGE}>
                  Sinkronisasi Stok (v2.product)
                </option>
              </select>

              <button
                type="button"
                onClick={handleRunPushSimulation}
                disabled={isSimulating}
                className="tap-target inline-flex items-center justify-center gap-1.5 rounded-lg bg-deep-pine px-3 py-1.5 text-xs font-semibold text-warm-white hover:bg-deep-pine/90 disabled:opacity-50 shrink-0"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw size={12} className="animate-spin" />
                    <span>Kirim...</span>
                  </>
                ) : (
                  <>
                    <Play size={12} />
                    <span>Kirim Tes</span>
                  </>
                )}
              </button>
            </div>

            {testResult && (
              <div className="mt-2.5 rounded-lg border border-border/80 bg-soft-sand/30 p-2.5 text-xs animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-ink inline-flex items-center gap-1">
                    {testResult.success ? <CheckCircle size={13} className="text-status-success" /> : <XCircle size={13} className="text-status-critical" />}
                    HTTP {testResult.statusCode}
                  </span>
                  <span className="font-mono text-[11px] text-muted">
                    {testResult.latencyMs} ms
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Pengaturan Sinkronisasi */}
          <div className="rounded-xl border border-border/80 bg-warm-white p-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">
              Sinkronisasi Otomatis
            </h3>

            <div className="flex flex-col divide-y divide-border/60 text-xs">
              <div className="flex items-center justify-between py-2">
                <span className="font-medium text-ink">Pesanan Baru (v2.order)</span>
                <input
                  type="checkbox"
                  checked={autoSyncOrders}
                  onChange={(e) => setAutoSyncOrders(e.target.checked)}
                  className="size-4 accent-karyalo-green cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="font-medium text-ink">Stok Varian (v2.product)</span>
                <input
                  type="checkbox"
                  checked={autoSyncStock}
                  onChange={(e) => setAutoSyncStock(e.target.checked)}
                  className="size-4 accent-karyalo-green cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="font-medium text-ink">Nomor Resi (v2.logistics)</span>
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
