import Link from "next/link";
import { getAllProducts } from "@/lib/data/catalog";
import { ProductTable } from "@/components/products/ProductTable";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";
import { PermissionGate } from "@/components/system/PermissionGate";

/** PRD §12.1 Product List. */
export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto max-w-(--container-wide) px-4 py-6 md:px-6 md:py-8">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold text-ink md:text-2xl">Products</h1>
        <PermissionGate capability="catalogWrite">
          <Link
            href="/products/new"
            className="tap-target rounded-full bg-karyalo-green px-4 py-2 text-xs font-medium text-warm-white hover:opacity-90"
          >
            Tambah Produk
          </Link>
        </PermissionGate>
      </div>
      <p className="mb-4 text-sm text-muted">{products.length} produk</p>
      <SampleDataBanner />
      <div className="mb-4 flex flex-wrap gap-2 text-xs">
        <Link href="/products/categories" className="rounded-full bg-soft-sand px-3.5 py-1.5 font-medium text-ink hover:bg-soft-sage">Kategori</Link>
        <Link href="/products/collections" className="rounded-full bg-soft-sand px-3.5 py-1.5 font-medium text-ink hover:bg-soft-sage">Koleksi</Link>
        <Link href="/products/inventory" className="rounded-full bg-soft-sand px-3.5 py-1.5 font-medium text-ink hover:bg-soft-sage">Ringkasan Inventori</Link>
      </div>
      <ProductTable products={products} />
    </div>
  );
}
