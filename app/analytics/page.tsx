import { BarChart3, TrendingUp, Users, ShoppingCart, Repeat, ShoppingBag, Globe } from "lucide-react";
import { formatRupiah } from "@/lib/utils/currency";

const KEY_METRICS = [
  {
    label: "Total Pengunjung",
    value: "4.820",
    change: "+12.4%",
    positive: true,
    icon: Users,
  },
  {
    label: "Tingkat Konversi",
    value: "3.4%",
    change: "+0.6%",
    positive: true,
    icon: TrendingUp,
  },
  {
    label: "Rata-rata Order (AOV)",
    value: formatRupiah(175000),
    change: "+4.2%",
    positive: true,
    icon: ShoppingCart,
  },
  {
    label: "Pelanggan Berulang",
    value: "28.5%",
    change: "+2.1%",
    positive: true,
    icon: Repeat,
  },
];

const TOP_PRODUCTS = [
  { rank: 1, name: "Kopi Arabika Gayo 250g", units: 142, revenue: 12070000, channel: "Shopee" },
  { rank: 2, name: "Keripik Singkong Balado 200g", units: 98, revenue: 2450000, channel: "Shopee" },
  { rank: 3, name: "Batik Tulis Tulis Cap Halus", units: 34, revenue: 11900000, channel: "Webstore" },
  { rank: 4, name: "Sambal Bawang Bu Rudy 150g", units: 88, revenue: 3080000, channel: "Shopee" },
  { rank: 5, name: "Madu Hutan Sumbawa 500ml", units: 26, revenue: 3900000, channel: "Webstore" },
];

export default function AnalyticsPage() {
  return (
    <div className="mx-auto w-full max-w-(--container-wide) px-3.5 py-5 sm:px-6 sm:py-8">
      {/* Header & Filter */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 size={22} className="text-karyalo-green" aria-hidden="true" />
            <h1 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">Performa & Analytics</h1>
          </div>
          <p className="mt-0.5 text-xs text-muted">Ringkasan performa penjualan dan traffic toko 30 hari terakhir.</p>
        </div>

        <div className="flex items-center gap-1.5 self-start rounded-xl border border-border bg-warm-white p-1 shadow-2xs sm:self-auto">
          <button
            type="button"
            className="rounded-lg bg-deep-pine px-3 py-1.5 text-xs font-semibold text-warm-white shadow-xs"
          >
            30 Hari
          </button>
          <button
            type="button"
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted hover:text-ink hover:bg-soft-sand transition-colors"
          >
            7 Hari
          </button>
          <button
            type="button"
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted hover:text-ink hover:bg-soft-sand transition-colors"
          >
            Bulan Ini
          </button>
        </div>
      </div>

      {/* 4 Kartu Metrik Utama */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {KEY_METRICS.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="flex flex-col justify-between rounded-2xl border border-border bg-warm-white p-4 shadow-2xs"
            >
              <div className="flex items-center justify-between text-muted">
                <span className="text-xs font-medium">{m.label}</span>
                <span className="flex size-7 items-center justify-center rounded-lg bg-soft-sand text-deep-pine">
                  <Icon size={14} aria-hidden="true" />
                </span>
              </div>
              <div className="mt-2">
                <p className="text-xl font-bold tracking-tight text-ink sm:text-2xl">{m.value}</p>
                <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-status-success">
                  <span>{m.change}</span>
                  <span className="text-muted font-normal">vs bulan lalu</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Performa: Kanal Penjualan & Produk Terlaris */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Distribusi Kanal */}
        <div className="flex flex-col rounded-2xl border border-border bg-warm-white p-5 shadow-2xs">
          <h2 className="text-sm font-bold text-ink">Distribusi Penjualan per Kanal</h2>
          <p className="mt-0.5 text-xs text-muted">Kontribusi omset marketplace vs webstore mandiri</p>

          <div className="mt-6 flex flex-col gap-4">
            {/* Shopee */}
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-ink">
                  <ShoppingBag size={14} className="text-[#ee4d2d]" aria-hidden="true" />
                  Shopee
                </span>
                <span className="font-bold text-ink">64% (Rp 42.5 jt)</span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-soft-sand">
                <div className="h-full rounded-full bg-[#ee4d2d]" style={{ width: "64%" }} />
              </div>
            </div>

            {/* Webstore */}
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-ink">
                  <Globe size={14} className="text-karyalo-green" aria-hidden="true" />
                  Web Storefront
                </span>
                <span className="font-bold text-ink">36% (Rp 23.9 jt)</span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-soft-sand">
                <div className="h-full rounded-full bg-karyalo-green" style={{ width: "36%" }} />
              </div>
            </div>
          </div>

          <div className="mt-auto border-t border-border/70 pt-4 mt-6">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted">Total Omset Tergabung</span>
              <span className="text-sm font-bold text-karyalo-green">Rp 66.400.000</span>
            </div>
          </div>
        </div>

        {/* Top 5 Produk */}
        <div className="flex flex-col rounded-2xl border border-border bg-warm-white p-5 shadow-2xs lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-ink">5 Produk Terlaris</h2>
              <p className="mt-0.5 text-xs text-muted">Berdasarkan kuantitas unit terjual</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border/80 bg-soft-sand/50 text-muted">
                <tr>
                  <th className="py-2.5 px-3 font-semibold text-ink">#</th>
                  <th className="py-2.5 px-3 font-semibold text-ink">Produk</th>
                  <th className="py-2.5 px-3 font-semibold text-ink">Kanal Utama</th>
                  <th className="py-2.5 px-3 text-right font-semibold text-ink">Terjual</th>
                  <th className="py-2.5 px-3 text-right font-semibold text-ink">Total Omset</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {TOP_PRODUCTS.map((p) => (
                  <tr key={p.rank} className="hover:bg-soft-sand/40 transition-colors">
                    <td className="py-3 px-3 font-bold text-muted">{p.rank}</td>
                    <td className="py-3 px-3 font-semibold text-ink">{p.name}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                          p.channel === "Shopee"
                            ? "bg-[#ee4d2d]/10 text-[#ee4d2d]"
                            : "bg-soft-sage text-karyalo-green"
                        }`}
                      >
                        {p.channel}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-ink">{p.units} pcs</td>
                    <td className="py-3 px-3 text-right font-bold text-ink">{formatRupiah(p.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
