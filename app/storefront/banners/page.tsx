import { getBanners } from "@/lib/data/cms";
import { PublishStatusBadge } from "@/components/cms/PublishStatusBadge";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

/** PRD §11.2 Banners. */
export default async function BannersPage() {
  const banners = await getBanners();

  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-4 text-xl font-semibold text-ink md:text-2xl">Banner</h1>
      <SampleDataBanner />
      <div className="flex flex-col gap-2">
        {banners.map((b) => (
          <div key={b.id} className="flex items-center justify-between gap-3 rounded-(--radius-card) border border-border bg-warm-white p-4">
            <div>
              <p className="text-sm font-medium text-ink">{b.title}</p>
              <p className="text-xs text-muted">{b.placement}</p>
            </div>
            <PublishStatusBadge status={b.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
