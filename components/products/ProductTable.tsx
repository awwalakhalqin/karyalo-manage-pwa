import Link from "next/link";
import Image from "next/image";
import { AdminProduct } from "@/lib/data/catalog";
import { ProductStatusBadge } from "./ProductStatusBadge";
import { formatRupiah } from "@/lib/utils/currency";
import { ChevronRight, Package, AlertTriangle } from "lucide-react";

/**
 * PRD §12.1 Product List — Responsif Mobile (Full-width Vertical Cards, Zero Overflow) & Desktop (Table View).
 */
export function ProductTable({ products }: { products: AdminProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="w-full rounded-2xl border border-dashed border-border bg-soft-sand p-8 text-center text-sm text-muted">
        Tidak ada produk pada tampilan ini.
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 max-w-full">
      {/* Mobile Vertical Card List (md:hidden) */}
      <div className="flex w-full min-w-0 max-w-full flex-col gap-3 md:hidden">
        {products.map((p) => {
          const isOutOfStock = p.stock === 0;
          const isLowStock = p.stock > 0 && p.stock <= p.lowStockThreshold;

          return (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="group box-border flex w-full min-w-0 max-w-full flex-col gap-3 rounded-2xl border border-border bg-warm-white p-4 shadow-xs transition-all hover:border-karyalo-green/40 active:scale-[0.99]"
            >
              {/* Top Row: Thumbnail + Title + SKU */}
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-soft-sand shadow-2xs">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1 min-w-0">
                  <h3 className="font-bold text-sm text-ink leading-snug line-clamp-2 transition-colors group-hover:text-karyalo-green">
                    {p.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5 min-w-0">
                    <span className="rounded bg-soft-sand px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted">
                      {p.sku}
                    </span>
                    <span className="text-[11px] text-muted capitalize truncate">
                      {p.categorySlug}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Status, Price & Stock */}
              <div className="flex items-center justify-between border-t border-border/60 pt-3 min-w-0">
                <div className="flex items-center gap-2 min-w-0 truncate">
                  <ProductStatusBadge status={p.status} />
                  {isOutOfStock ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-status-critical/10 px-2.5 py-0.5 text-[10px] font-semibold text-status-critical">
                      <AlertTriangle size={11} aria-hidden="true" />
                      Stok Habis
                    </span>
                  ) : isLowStock ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-status-warning/10 px-2.5 py-0.5 text-[10px] font-semibold text-status-warning">
                      <AlertTriangle size={11} aria-hidden="true" />
                      Sisa {p.stock}
                    </span>
                  ) : (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-soft-sand px-2.5 py-0.5 text-[10px] font-medium text-ink">
                      <Package size={11} className="text-muted" aria-hidden="true" />
                      Stok {p.stock}
                    </span>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-sm font-bold tracking-tight text-ink">
                    {formatRupiah(p.price)}
                  </span>
                  <div className="flex size-6 items-center justify-center rounded-full bg-soft-sand text-muted transition-colors group-hover:bg-soft-sage group-hover:text-karyalo-green">
                    <ChevronRight size={14} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Desktop Table View (hidden md:block) */}
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-warm-white shadow-xs md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-soft-sand text-xs font-medium text-muted">
              <tr>
                <th className="px-4 py-3.5">Produk</th>
                <th className="px-4 py-3.5">SKU</th>
                <th className="px-4 py-3.5">Kategori</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Harga</th>
                <th className="px-4 py-3.5 text-right">Stok</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-soft-sand/60">
                  <td className="px-4 py-3.5">
                    <Link href={`/products/${p.id}`} className="flex items-center gap-3">
                      <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-border/80 bg-soft-sand">
                        <Image src={p.image} alt="" fill unoptimized className="object-cover" sizes="40px" />
                      </div>
                      <span className="font-semibold text-ink hover:text-karyalo-green hover:underline">{p.name}</span>
                    </Link>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-muted">{p.sku}</td>
                  <td className="px-4 py-3.5 text-xs text-muted capitalize">{p.categorySlug}</td>
                  <td className="px-4 py-3.5">
                    <ProductStatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3.5 text-right font-bold text-ink">{formatRupiah(p.price)}</td>
                  <td className="px-4 py-3.5 text-right">
                    <span className={p.stock === 0 ? "font-bold text-status-critical" : p.stock <= p.lowStockThreshold ? "font-bold text-status-warning" : "font-semibold text-ink"}>
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
