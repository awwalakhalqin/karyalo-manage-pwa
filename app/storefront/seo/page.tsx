import { SampleDataBanner } from "@/components/system/SampleDataBanner";

/** PRD §11.7 SEO. */
export default function SeoPage() {
  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-4 text-xl font-semibold text-ink md:text-2xl">SEO</h1>
      <SampleDataBanner note="Form contoh untuk Homepage saja — pengaturan per-halaman belum dibangun (Fase 2)." />
      <div className="max-w-xl">
        <label className="mb-1 block text-xs font-medium text-ink">Meta Title (Homepage)</label>
        <input
          defaultValue="Karyalo Store — Fashion sehari-hari, tanpa ribet"
          className="mb-3 w-full rounded-lg border border-border bg-warm-white px-3.5 py-2.5 text-sm text-ink"
        />
        <label className="mb-1 block text-xs font-medium text-ink">Meta Description</label>
        <textarea
          rows={3}
          defaultValue="Belanja cepat, transparan, dan terpercaya — koleksi wanita, pria, sepatu, tas, dan aksesoris dalam satu tempat."
          className="w-full rounded-lg border border-border bg-warm-white px-3.5 py-2.5 text-sm text-ink"
        />
      </div>
    </div>
  );
}
