import { GripVertical } from "lucide-react";
import { getHomepageSections } from "@/lib/data/cms";
import { PublishStatusBadge } from "@/components/cms/PublishStatusBadge";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

/** PRD §11.1 Homepage Section Builder — constrained (bukan free-form website builder, §5 Non-Goals). */
export default async function HomepageBuilderPage() {
  const sections = await getHomepageSections();

  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-1 text-xl font-semibold text-ink md:text-2xl">Homepage Builder</h1>
      <p className="mb-4 text-sm text-muted">Urutan section yang tampil di homepage storefront.</p>
      <SampleDataBanner note="Reorder/edit belum interaktif — Fase 2." />
      <div className="flex flex-col gap-2">
        {sections.map((s) => (
          <div key={s.id} className="flex items-center gap-3 rounded-(--radius-card) border border-border bg-warm-white p-3.5">
            <GripVertical size={16} className="text-muted" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-sm font-medium text-ink">{s.label}</p>
              <p className="text-xs text-muted">{s.type}</p>
            </div>
            <PublishStatusBadge status={s.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
