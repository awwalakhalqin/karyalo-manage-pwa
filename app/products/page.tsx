import Link from "next/link";
import { getAllProducts } from "@/lib/data/catalog";
import { ProductTable } from "@/components/products/ProductTable";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";
import { PermissionGate } from "@/components/system/PermissionGate";
import { Plus } from "lucide-react";

/** PRD §12.1 Product List — Responsif Mobile & Desktop. */
export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto max-w-(--container-wide) px-3.5 py-5 sm:px-6 sm:py-8">
      {/* Header Halaman */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-ink sm:text-2xl">Katalog Produk</h1>
          <p className="text-xs text-muted sm:text-sm">{products.length} produk terdaftar</p>
        </div>
        <PermissionGate capability="catalogWrite">
          <Link
            href="/products/new"
            className="tap-target inline-flex items-center gap-1.5 rounded-xl bg-karyalo-green px-3.5 py-2 text-xs font-semibold text-warm-white shadow-xs hover:opacity-90 active:scale-95"
          >
            <Plus size={16} aria-hidden="true" />
            <span>Tambah Produk</span>
          </Link>
        </PermissionGate>
      </div>

      <SampleDataBanner />

      {/* Filter Tabs Scrollable */}
      <div className="mb-4 flex items-center gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:gap-2 sm:pb-0">
        <Link
          href="/products"
          className="tap-target shrink-0 rounded-full bg-deep-pine px-3.5 py-1.5 text-xs font-medium text-warm-white shadow-xs"
        >
          Semua Produk
        </Link>
        <Link
          href="/products/categories"
          className="tap-target shrink-0 rounded-full bg-soft-sand px-3.5 py-1.5 text-xs font-medium text-ink hover:bg-soft-sage"
        >
          Kategori
        </Link>
        <Link
          href="/products/collections"
          className="tap-target shrink-0 rounded-full bg-soft-sand px-3.5 py-1.5 text-xs font-medium text-ink hover:bg-soft-sage"
        >
          Koleksi
        </Link>
        <Link
          href="/products/inventory"
          className="tap-target shrink-0 rounded-full bg-soft-sand px-3.5 py-1.5 text-xs font-medium text-ink hover:bg-soft-sage"
        >
          Ringkasan Inventori
        </Link>
      </div>

      {/* List Produk (Vertical Cards di Mobile, Table di Desktop) */}
      <ProductTable products={products} />
    </div>
  );
}
