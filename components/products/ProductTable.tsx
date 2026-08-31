import Link from "next/link";
import Image from "next/image";
import { AdminProduct } from "@/lib/data/catalog";
import { ProductStatusBadge } from "./ProductStatusBadge";
import { formatRupiah } from "@/lib/utils/currency";
import { ChevronRight, Package, AlertTriangle } from "lucide-react";

/**
 * PRD §12.1 Product List — Responsif Mobile (Full-width Vertical Cards) & Desktop (Table View).
 */
export function ProductTable({ products }: { products: AdminProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-(--radius-card) border border-dashed border-border bg-soft-sand p-8 text-center text-sm text-muted">
        Tidak ada produk pada tampilan ini.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile Vertical Card List (md:hidden) */}
      <div className="flex flex-col gap-3 md:hidden">
        {products.map((p) => {
          const isOutOfStock = p.stock === 0;
          const isLowStock = p.stock > 0 && p.stock <= p.lowStockThreshold;

          return (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-warm-white p-4 shadow-xs transition-all active:bg-soft-sand"
            >
              {/* Top Row: Thumbnail + Title + Status */}
              <div className="flex items-start gap-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-soft-sand">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm text-ink leading-tight line-clamp-2">
                      {p.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                    <span className="font-mono text-[10px] text-muted bg-soft-sand px-1.5 py-0.5 rounded">
                      {p.sku}
                    </span>
                    <span className="text-[10px] text-muted capitalize">
                      {p.categorySlug}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Status, Price & Stock */}
              <div className="flex items-center justify-between border-t border-border/60 pt-2.5">
                <div className="flex items-center gap-2">
                  <ProductStatusBadge status={p.status} />
                  {isOutOfStock ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-status-critical/10 px-2 py-0.5 text-[10px] font-semibold text-status-critical">
                      <AlertTriangle size={10} aria-hidden="true" />
                      Stok Habis
                    </span>
                  ) : isLowStock ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-status-warning/10 px-2 py-0.5 text-[10px] font-semibold text-status-warning">
                      <AlertTriangle size={10} aria-hidden="true" />
                      Stok Sisa {p.stock}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-md bg-soft-sand px-2 py-0.5 text-[10px] font-medium text-ink">
                      <Package size={10} className="text-muted" aria-hidden="true" />
                      Stok {p.stock}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-ink">
                    {formatRupiah(p.price)}
                  </span>
                  <ChevronRight size={16} className="text-muted/60" aria-hidden="true" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Desktop Table View (hidden md:block) */}
      <div className="hidden overflow-hidden rounded-(--radius-card) border border-border bg-warm-white shadow-xs md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-soft-sand text-xs text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Produk</th>
                <th className="px-4 py-3 font-medium">SKU</th>
                <th className="px-4 py-3 font-medium">Kategori</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Harga</th>
                <th className="px-4 py-3 text-right font-medium">Stok</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-soft-sand/60">
                  <td className="px-4 py-3">
                    <Link href={`/products/${p.id}`} className="flex items-center gap-3">
                      <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-border/80 bg-soft-sand">
                        <Image src={p.image} alt="" fill className="object-cover" sizes="40px" />
                      </div>
                      <span className="font-medium text-karyalo-green hover:underline">{p.name}</span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted">{p.sku}</td>
                  <td className="px-4 py-3 text-xs text-muted capitalize">{p.categorySlug}</td>
                  <td className="px-4 py-3">
                    <ProductStatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-ink">{formatRupiah(p.price)}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={p.stock === 0 ? "font-bold text-status-critical" : p.stock <= p.lowStockThreshold ? "font-bold text-status-warning" : "font-medium text-ink"}>
                      {p.stock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
