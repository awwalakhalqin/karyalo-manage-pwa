import { getNavigationTree } from "@/lib/data/cms";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

/** PRD §11.4 Navigation. */
export default async function NavigationPage() {
  const tree = await getNavigationTree();

  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-4 text-xl font-semibold text-ink md:text-2xl">Navigasi</h1>
      <SampleDataBanner note="Reorder/tambah item belum interaktif — Fase 2." />
      <div className="flex flex-col gap-2">
        {tree.map((item) => (
          <div key={item.href} className="rounded-(--radius-card) border border-border bg-warm-white p-3.5">
            <p className="text-sm font-medium text-ink">
              {item.label} <span className="font-normal text-muted">— {item.href}</span>
            </p>
            {item.children && (
              <div className="ml-4 mt-2 flex flex-col gap-1 border-l border-border pl-3">
                {item.children.map((c) => (
                  <p key={c.href} className="text-xs text-muted">
                    {c.label} — {c.href}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
