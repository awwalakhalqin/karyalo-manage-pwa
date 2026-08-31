import { getLowStockProducts, getOutOfStockProducts } from "@/lib/data/catalog";
import { ProductTable } from "@/components/products/ProductTable";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

/** PRD §12.1 — proyeksi Inventory/WMS, bukan source of truth di sini (§24.4). */
export default async function InventoryPage() {
  const [lowStock, outOfStock] = await Promise.all([getLowStockProducts(), getOutOfStockProducts()]);

  return (
    <div className="mx-auto max-w-(--container-wide) px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-4 text-xl font-semibold text-ink md:text-2xl">Ringkasan Inventori</h1>
      <SampleDataBanner note="Proyeksi dari Inventory/WMS — Admin bukan source of truth stok (§24.4)." />

      <section className="mb-6">
        <h2 className="mb-2 text-sm font-semibold text-ink">Stok Habis ({outOfStock.length})</h2>
        <ProductTable products={outOfStock} />
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-ink">Stok Rendah ({lowStock.length})</h2>
        <ProductTable products={lowStock} />
      </section>
    </div>
  );
}
