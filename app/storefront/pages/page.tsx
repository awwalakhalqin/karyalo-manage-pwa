import Link from "next/link";
import { getCmsPages } from "@/lib/data/cms";
import { PublishStatusBadge } from "@/components/cms/PublishStatusBadge";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

/** PRD §11.3 Pages. */
export default async function CmsPagesPage() {
  const pages = await getCmsPages();

  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-4 text-xl font-semibold text-ink md:text-2xl">Halaman</h1>
      <SampleDataBanner />
      <div className="flex flex-col gap-2">
        {pages.map((p) => (
          <Link
            key={p.id}
            href={`/storefront/pages/${p.id}`}
            className="flex items-center justify-between gap-3 rounded-(--radius-card) border border-border bg-warm-white p-4 hover:border-karyalo-green"
          >
            <div>
              <p className="text-sm font-medium text-ink">{p.title}</p>
              <p className="text-xs text-muted">/{p.slug}</p>
            </div>
            <PublishStatusBadge status={p.status} />
          </Link>
        ))}
      </div>
    </div>
  );
}
