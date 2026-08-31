import { SampleDataBanner } from "@/components/system/SampleDataBanner";

const TOKENS = [
  { name: "Brand Navy (deep-pine)", hex: "#1E2F5C" },
  { name: "Brand Royal Blue (karyalo-green)", hex: "#1E5AA8" },
  { name: "Accent Cyan", hex: "#2FC1D6" },
  { name: "Ink", hex: "#1C2430" },
  { name: "Warm White", hex: "#FCFBF7" },
  { name: "Terracotta", hex: "#A5482D" },
];

/** PRD §11.6 Theme and Branding — menampilkan token Karyalo Design System §11 yang sedang aktif di storefront (read-only, editor belum dibangun). */
export default function ThemePage() {
  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-4 text-xl font-semibold text-ink md:text-2xl">Tema</h1>
      <SampleDataBanner note="Read-only — editor token warna/font belum dibangun (Fase 2)." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {TOKENS.map((t) => (
          <div key={t.hex} className="rounded-(--radius-card) border border-border bg-warm-white p-3">
            <div className="mb-2 h-12 w-full rounded-lg" style={{ backgroundColor: t.hex }} />
            <p className="text-xs font-medium text-ink">{t.name}</p>
            <p className="text-[11px] text-muted">{t.hex}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
