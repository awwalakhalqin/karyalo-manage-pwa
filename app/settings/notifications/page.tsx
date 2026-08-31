import { SampleDataBanner } from "@/components/system/SampleDataBanner";
import { PushSubscribeButton } from "@/components/notifications/PushSubscribeButton";

const PREFERENCES = [
  { label: "Masalah pembayaran", channel: "Push + In-app" },
  { label: "Stok rendah", channel: "In-app" },
  { label: "Publish gagal", channel: "In-app" },
];

/**
 * PRD §16.5 Permission Prompt + §16.6 Preferences.
 *
 * **Diperbarui 16 Agustus 2026:** "Order baru" dipindah dari daftar
 * preference statis di bawah menjadi kontrol SUNGGUHAN (`PushSubscribeButton`)
 * — jawaban atas pertanyaan pemilik proyek soal push notification order
 * baru. Event lain (pembayaran/stok/publish) TETAP tampilan saja, belum
 * ada Notification Service untuk itu — SampleDataBanner tetap berlaku
 * untuk bagian itu, TIDAK untuk bagian push order baru di atasnya (itu
 * sudah nyata, dites lewat tombol "Kirim Tes Notifikasi" atau checkout
 * sungguhan di storefront).
 */
export default function NotificationSettingsPage() {
  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-4 text-xl font-semibold text-ink md:text-2xl">Pengaturan Notifikasi</h1>

      <p className="mb-2 text-sm font-medium text-ink">Order baru — sungguhan, bukan contoh</p>
      <div className="mb-6">
        <PushSubscribeButton />
      </div>

      <p className="mb-2 text-sm font-medium text-ink">Event lain</p>
      <SampleDataBanner note="Preference di bawah ini masih tampilan — belum ada Notification Service untuk event selain order baru." />
      <div className="flex flex-col divide-y divide-border rounded-(--radius-card) border border-border bg-warm-white">
        {PREFERENCES.map((p) => (
          <div key={p.label} className="flex items-center justify-between px-4 py-3.5">
            <span className="text-sm text-ink">{p.label}</span>
            <span className="text-xs text-muted">{p.channel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
