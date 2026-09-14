import Link from "next/link";
import { Megaphone, Tag, ChevronRight, Plus } from "lucide-react";
import { getPromotions, getCampaigns } from "@/lib/data/marketing";

export default async function MarketingOverviewPage() {
  const [promotions, campaigns] = await Promise.all([getPromotions(), getCampaigns()]);
  const activePromoCount = promotions.filter((p) => p.status === "active").length;
  const activeCampaignCount = campaigns.filter((c) => c.status === "active").length;

  return (
    <div className="mx-auto max-w-(--container-content) px-3.5 py-5 pb-24 sm:px-6 sm:py-8 sm:pb-12">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Megaphone size={22} className="text-karyalo-green" aria-hidden="true" />
          <h1 className="text-xl font-bold text-ink sm:text-2xl">Marketing & Promosi</h1>
        </div>
        <p className="text-xs text-muted">Tingkatkan penjualan dengan kupon diskon, flash sale, dan kampanye musiman.</p>
      </div>

      {/* Modul Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          href="/marketing/promotions"
          className="group flex items-center justify-between rounded-2xl border border-border bg-warm-white p-4 shadow-2xs hover:border-karyalo-green hover:shadow-xs transition-all"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-soft-sand text-deep-pine group-hover:bg-soft-sage group-hover:text-karyalo-green transition-colors">
              <Tag size={20} aria-hidden="true" />
            </span>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-ink group-hover:text-karyalo-green transition-colors">
                  Kupon & Diskon
                </span>
                <span className="rounded-full bg-soft-sage px-2 py-0.5 text-[11px] font-semibold text-karyalo-green">
                  {activePromoCount} aktif
                </span>
              </div>
              <span className="truncate text-xs text-muted mt-0.5">
                Voucher potongan harga, gratis ongkir & cashback
              </span>
            </div>
          </div>
          <ChevronRight size={16} className="shrink-0 text-muted/60 group-hover:text-karyalo-green group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
        </Link>

        <Link
          href="/marketing/campaigns"
          className="group flex items-center justify-between rounded-2xl border border-border bg-warm-white p-4 shadow-2xs hover:border-karyalo-green hover:shadow-xs transition-all"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-soft-sand text-deep-pine group-hover:bg-soft-sage group-hover:text-karyalo-green transition-colors">
              <Megaphone size={20} aria-hidden="true" />
            </span>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-ink group-hover:text-karyalo-green transition-colors">
                  Kampanye Penjualan
                </span>
                <span className="rounded-full bg-soft-sand px-2 py-0.5 text-[11px] font-semibold text-muted">
                  {campaigns.length} terdaftar
                </span>
              </div>
              <span className="truncate text-xs text-muted mt-0.5">
                Event belanja tanggal kembar, gajian & musiman
              </span>
            </div>
          </div>
          <ChevronRight size={16} className="shrink-0 text-muted/60 group-hover:text-karyalo-green group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
