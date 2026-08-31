import { SampleDataBanner } from "@/components/system/SampleDataBanner";

const OPTIONS = [
  { name: "Reguler", eta: "3–5 hari", cost: "Rp 15.000" },
  { name: "Express", eta: "1–2 hari", cost: "Rp 35.000" },
];

/** PRD §19.2 Shipping and Payment Configuration. Cocok dengan opsi yang dipakai storefront checkout. */
export default function ShippingSettingsPage() {
  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-4 text-xl font-semibold text-ink md:text-2xl">Pengiriman</h1>
      <SampleDataBanner note="Integrasi Biteship ditunda pemilik proyek (lihat 04_PROJECT_CHANGELOG.md)." />
      <div className="flex flex-col gap-2">
        {OPTIONS.map((o) => (
          <div key={o.name} className="flex items-center justify-between rounded-(--radius-card) border border-border bg-warm-white p-4">
            <div>
              <p className="text-sm font-medium text-ink">{o.name}</p>
              <p className="text-xs text-muted">{o.eta}</p>
            </div>
            <span className="text-sm text-ink">{o.cost}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
