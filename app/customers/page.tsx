import Link from "next/link";
import { getCustomers } from "@/lib/data/customers";
import { Users, User, ChevronRight, MapPin } from "lucide-react";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="mx-auto w-full max-w-(--container-wide) px-3.5 py-5 sm:px-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Users size={22} className="text-karyalo-green" aria-hidden="true" />
          <h1 className="text-xl font-bold text-ink sm:text-2xl">Daftar Pelanggan</h1>
        </div>
        <p className="text-xs text-muted">{customers.length} kontak pelanggan terdaftar dari transaksi Webstore dan Shopee.</p>
      </div>

      {/* Tabel Pelanggan */}
      <div className="overflow-hidden rounded-2xl border border-border bg-warm-white shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border bg-soft-sand/70 text-muted">
            <tr>
              <th className="px-4 py-3.5 font-semibold text-ink">Nama Pelanggan</th>
              <th className="hidden px-4 py-3.5 font-semibold text-ink sm:table-cell">Kota & Wilayah</th>
              <th className="px-4 py-3.5 font-semibold text-ink">Segmen</th>
              <th className="px-4 py-3.5 text-right font-semibold text-ink">Total Order</th>
              <th className="px-4 py-3.5 text-right font-semibold text-ink">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-soft-sand/40 transition-colors">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-7 items-center justify-center rounded-full bg-soft-sand text-deep-pine">
                      <User size={13} aria-hidden="true" />
                    </span>
                    <Link href={`/customers/${c.id}`} className="font-bold text-ink hover:text-karyalo-green">
                      {c.name}
                    </Link>
                  </div>
                </td>
                <td className="hidden px-4 py-3.5 text-muted sm:table-cell">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-muted/60" aria-hidden="true" />
                    <span>{c.city}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="rounded-md bg-soft-sand px-2 py-0.5 text-[11px] font-semibold text-deep-pine">
                    {c.segment}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right font-bold text-ink">{c.totalOrders} pesanan</td>
                <td className="px-4 py-3.5 text-right">
                  <Link
                    href={`/customers/${c.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-karyalo-green hover:underline"
                  >
                    <span>Detail</span>
                    <ChevronRight size={13} aria-hidden="true" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
