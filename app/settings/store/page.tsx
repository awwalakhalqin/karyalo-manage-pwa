import { SampleDataBanner } from "@/components/system/SampleDataBanner";

/** PRD §19.1 Store Settings. */
export default function StoreSettingsPage() {
  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-4 text-xl font-semibold text-ink md:text-2xl">Pengaturan Toko</h1>
      <SampleDataBanner />
      <div className="max-w-xl">
        <label className="mb-1 block text-xs font-medium text-ink">Nama Toko</label>
        <input defaultValue="Karyalo Store (Demo)" className="mb-3 w-full rounded-lg border border-border bg-warm-white px-3.5 py-2.5 text-sm text-ink" />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-ink">Mata Uang</label>
            <input defaultValue="IDR (Rp)" disabled className="w-full rounded-lg border border-border bg-soft-sand px-3.5 py-2.5 text-sm text-muted" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink">Zona Waktu</label>
            <input defaultValue="WIB (UTC+7)" disabled className="w-full rounded-lg border border-border bg-soft-sand px-3.5 py-2.5 text-sm text-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
