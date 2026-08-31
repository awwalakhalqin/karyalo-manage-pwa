import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { getMediaAssets } from "@/lib/data/cms";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";
import { PermissionGate } from "@/components/system/PermissionGate";

/** PRD §11.5 Media Library. */
export default async function MediaLibraryPage() {
  const media = await getMediaAssets();

  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold text-ink md:text-2xl">Media</h1>
        <PermissionGate capability="cmsWrite">
          <button className="tap-target flex items-center gap-1.5 rounded-full bg-karyalo-green px-4 py-2 text-xs font-medium text-warm-white hover:opacity-90">
            <ImagePlus size={14} aria-hidden="true" />
            Upload
          </button>
        </PermissionGate>
      </div>
      <p className="mb-4 text-sm text-muted">{media.length} aset</p>
      <SampleDataBanner note="Upload belum fungsional (Fase 2)." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {media.map((m) => (
          <div key={m.id} className="rounded-(--radius-card) border border-border bg-warm-white p-3">
            <div className="mb-2 flex aspect-square items-center justify-center rounded-lg bg-soft-sage">
              <Image src="/mock/product-placeholder.svg" alt="" width={40} height={40} />
            </div>
            <p className="truncate text-xs font-medium text-ink">{m.name}</p>
            <p className="truncate text-[11px] text-muted">{m.usedIn}</p>
            <p className="text-[11px] text-muted">{m.sizeLabel}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
