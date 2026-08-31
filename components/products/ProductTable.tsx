import Link from "next/link";
import Image from "next/image";
import { AdminProduct } from "@/lib/data/catalog";
import { ProductStatusBadge } from "./ProductStatusBadge";
import { formatRupiah } from "@/lib/utils/currency";

/** PRD §12.1 Product List. */
export function ProductTable({ products }: { products: AdminProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-(--radius-card) border border-dashed border-border bg-soft-sand p-8 text-center text-sm text-muted">
        Tidak ada produk pada tampilan ini.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-(--radius-card) border border-border bg-warm-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-soft-sand text-xs text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">Produk</th>
            <th className="hidden px-4 py-3 font-medium sm:table-cell">SKU</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Harga</th>
            <th className="px-4 py-3 text-right font-medium">Stok</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-soft-sand">
              <td className="px-4 py-3">
                <Link href={`/products/${p.id}`} className="flex items-center gap-3">
                  <Image src={p.image} alt="" width={32} height={32} className="rounded-md bg-soft-sage" />
                  <span className="font-medium text-karyalo-green hover:underline">{p.name}</span>
                </Link>
                <p className="text-xs text-muted sm:hidden">{p.sku}</p>
              </td>
              <td className="hidden px-4 py-3 text-xs text-muted sm:table-cell">{p.sku}</td>
              <td className="px-4 py-3">
                <ProductStatusBadge status={p.status} />
              </td>
              <td className="px-4 py-3 text-right text-ink">{formatRupiah(p.price)}</td>
              <td className="px-4 py-3 text-right">
                <span className={p.stock === 0 ? "font-medium text-status-critical" : p.stock <= p.lowStockThreshold ? "font-medium text-status-warning" : "text-ink"}>
                  {p.stock}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
