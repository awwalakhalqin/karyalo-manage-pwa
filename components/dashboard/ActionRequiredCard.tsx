import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

/**
 * PRD §10.2 Action Required.
 * Hardened & Accessible empty-state banner dengan link yang ramah pembaca layar (screen reader)
 * dan penanganan keyboard focus yang presisi.
 */
export function ActionRequiredCard() {
  return (
    <div
      className="flex flex-col justify-between gap-4 rounded-(--radius-card) border border-border bg-warm-white p-5 shadow-xs transition-colors sm:flex-row sm:items-center"
      role="region"
      aria-label="Status Tindakan Diperlukan"
    >
      <div className="flex items-start gap-3.5">
        <div
          className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-soft-sand text-muted"
          aria-hidden="true"
        >
          <CheckCircle2 size={20} className="text-karyalo-green" />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-ink">Tidak ada tindakan mendesak</h3>
            <span className="rounded-full bg-soft-sand px-2 py-0.5 text-[10px] font-medium text-muted">
              Fase Integrasi
            </span>
          </div>
          <p className="max-w-xl text-xs leading-relaxed text-muted">
            Semua modul berstatus normal. Daftar ini akan otomatis memuat order baru, verifikasi pembayaran, stok kritis, dan alert fulfillment saat backend OMS & Commerce aktif.
          </p>
        </div>
      </div>

      <Link
        href="/orders"
        className="tap-target inline-flex shrink-0 items-center gap-1.5 rounded-md text-xs font-medium text-karyalo-green hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-karyalo-green focus-visible:ring-offset-2 sm:self-center"
        aria-label="Buka Daftar Pesanan Toko"
      >
        <span>Buka Daftar Pesanan</span>
        <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </div>
  );
}
