import { SampleDataBanner } from "@/components/system/SampleDataBanner";

const METHODS = [
  { name: "Transfer Bank", status: "Aktif" },
  { name: "E-Wallet", status: "Aktif" },
  { name: "DOKU (payment gateway)", status: "Belum terhubung" },
];

/**
 * PRD §19.2 — referensi konfigurasi, BUKAN penyimpanan kredensial
 * sensitif (§5 Non-Goals: "Tidak menyimpan PAN/payment credential
 * sensitif di Admin"). Tidak ada field kredensial di halaman ini sama
 * sekali, disengaja.
 */
export default function PaymentSettingsPage() {
  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-4 text-xl font-semibold text-ink md:text-2xl">Pembayaran</h1>
      <SampleDataBanner note="Integrasi DOKU ditunda pemilik proyek — halaman ini tidak pernah menyimpan kredensial pembayaran (§5 Non-Goals)." />
      <div className="flex flex-col gap-2">
        {METHODS.map((m) => (
          <div key={m.name} className="flex items-center justify-between rounded-(--radius-card) border border-border bg-warm-white p-4">
            <span className="text-sm font-medium text-ink">{m.name}</span>
            <span className="text-xs text-muted">{m.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
