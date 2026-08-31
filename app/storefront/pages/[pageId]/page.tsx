import { notFound } from "next/navigation";
import { getCmsPageBySlugOrId, getCmsPages } from "@/lib/data/cms";
import { PublishStatusBadge } from "@/components/cms/PublishStatusBadge";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

export async function generateStaticParams() {
  const pages = await getCmsPages();
  return pages.map((p) => ({ pageId: p.id }));
}

/** PRD §11.3 Page Editor + §11.8 Draft/Preview/Publish/Schedule. */
export default async function CmsPageEditorPage({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = await params;
  const page = await getCmsPageBySlugOrId(pageId);
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <div className="mb-1 flex items-center gap-2">
        <h1 className="text-xl font-semibold text-ink md:text-2xl">{page.title}</h1>
        <PublishStatusBadge status={page.status} />
      </div>
      <p className="mb-4 text-sm text-muted">/{page.slug}</p>
      <SampleDataBanner note="Editor konten rich text belum dibangun — placeholder field saja." />
      <div className="max-w-xl">
        <label className="mb-1 block text-xs font-medium text-ink">Judul</label>
        <input defaultValue={page.title} className="mb-3 w-full rounded-lg border border-border bg-warm-white px-3.5 py-2.5 text-sm text-ink" />
        <label className="mb-1 block text-xs font-medium text-ink">Konten</label>
        <textarea
          rows={8}
          placeholder="Editor rich text belum tersedia pada Fase 1 — akan dibangun di Fase 2 (§11.3, §37 Coding Rule 13 sanitasi konten)."
          className="w-full rounded-lg border border-border bg-warm-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted"
        />
      </div>
    </div>
  );
}
