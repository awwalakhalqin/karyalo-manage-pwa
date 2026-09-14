import Link from "next/link";
import { ArrowRight, CheckCircle2, ShoppingBag, CreditCard, Truck, Mail, Database, Plug } from "lucide-react";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";

interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  status: string;
  connected: boolean;
  href?: string;
  icon: typeof ShoppingBag;
  highlight?: boolean;
}

const INTEGRATIONS: IntegrationItem[] = [
  {
    id: "shopee",
    name: "Shopee Open Platform",
    category: "Marketplace API",
    subtitle: "Sinkronisasi katalog, pesanan multi-channel & resi kurir",
    status: "Terhubung (Shop ID: 918230114)",
    connected: true,
    href: "/settings/integrations/shopee",
    icon: ShoppingBag,
    highlight: true,
  },
  {
    id: "biteship",
    name: "Biteship Logistics",
    category: "Pengiriman",
    subtitle: "Cek ongkir multi-ekspedisi & penjemputan paket",
    status: "Tersedia",
    connected: false,
    icon: Truck,
  },
  {
    id: "doku",
    name: "DOKU Payment Gateway",
    category: "Pembayaran Online",
    subtitle: "Virtual account bank, QRIS & e-wallet",
    status: "Tersedia",
    connected: false,
    icon: CreditCard,
  },
  {
    id: "resend",
    name: "Resend Email",
    category: "Email Transaksional",
    subtitle: "Pengiriman invoice & notifikasi akun pelanggan",
    status: "Belum Terhubung",
    connected: false,
    icon: Mail,
  },
  {
    id: "convex",
    name: "Convex Cloud",
    category: "Infrastruktur",
    subtitle: "Penyimpanan database & event real-time",
    status: "Tersambung",
    connected: true,
    icon: Database,
  },
];

export default function IntegrationsSettingsPage() {
  return (
    <div className="mx-auto max-w-(--container-wide) px-3.5 py-5 pb-24 sm:px-6 sm:py-8 sm:pb-12">
      <SettingsSubNav />

      <div className="mb-6 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Plug size={22} className="text-karyalo-green" aria-hidden="true" />
          <h1 className="text-xl font-bold text-ink sm:text-2xl">Integrasi Platform</h1>
        </div>
        <p className="text-xs text-muted">Koneksi marketplace, logistik pengiriman, pembayaran, dan infrastruktur.</p>
      </div>

      <div className="flex flex-col gap-3">
        {INTEGRATIONS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`flex flex-col justify-between gap-3.5 rounded-2xl border p-4 transition-all sm:flex-row sm:items-center ${
                item.highlight
                  ? "border-[#ee4d2d]/30 bg-warm-white shadow-xs"
                  : "border-border bg-warm-white"
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                    item.highlight
                      ? "bg-[#ee4d2d]/10 text-[#ee4d2d]"
                      : "bg-soft-sand text-deep-pine"
                  }`}
                >
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-ink">{item.name}</span>
                    <span className="rounded-md bg-soft-sand px-2 py-0.5 text-[11px] font-medium text-muted">
                      {item.category}
                    </span>
                    {item.connected ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-soft-sand px-2 py-0.5 text-[11px] font-semibold text-status-success">
                        <CheckCircle2 size={11} className="text-status-success" aria-hidden="true" />
                        {item.status}
                      </span>
                    ) : (
                      <span className="rounded-full bg-soft-sand px-2 py-0.5 text-[11px] font-medium text-muted">
                        {item.status}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-muted mt-0.5">{item.subtitle}</p>
                </div>
              </div>

              <div className="shrink-0 self-end sm:self-center">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-deep-pine px-4 py-2 text-xs font-semibold text-warm-white hover:bg-karyalo-green transition-colors shadow-2xs"
                  >
                    <span>Kelola</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="cursor-not-allowed rounded-xl border border-border bg-soft-sand px-3 py-1.5 text-xs font-medium text-muted/70"
                  >
                    Tersedia
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
