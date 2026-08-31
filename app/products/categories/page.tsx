import { getCategories } from "@/lib/data/catalog";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

/** PRD §12.3 Category. */
export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-4 text-xl font-semibold text-ink md:text-2xl">Kategori</h1>
      <SampleDataBanner />
      <div className="overflow-hidden rounded-(--radius-card) border border-border bg-warm-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-soft-sand text-xs text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Kategori</th>
              <th className="px-4 py-3 text-right font-medium">Jumlah Produk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {categories.map((c) => (
              <tr key={c.slug}>
                <td className="px-4 py-3 font-medium text-ink">{c.name}</td>
                <td className="px-4 py-3 text-right text-muted">{c.productCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
