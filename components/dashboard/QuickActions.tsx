import Link from "next/link";
import { PackagePlus, Megaphone, LayoutTemplate, ShoppingBag, ImagePlus, ArrowUpRight } from "lucide-react";
import { PermissionGate } from "@/components/system/PermissionGate";

/**
 * PRD §10.3 Quick Actions — Pintasan Cepat Aksi Harian.
 */
const ACTIONS = [
  {
    href: "/products/new",
    label: "Tambah Produk",
    description: "Input produk baru & SKU",
    icon: PackagePlus,
    capability: "catalogWrite" as const,
  },
  {
    href: "/marketing/promotions",
    label: "Buat Promosi",
    description: "Atur diskon & voucher",
    icon: Megaphone,
    capability: "promotionWrite" as const,
  },
  {
    href: "/storefront/homepage",
    label: "Edit Homepage",
    description: "Kelola section storefront",
    icon: LayoutTemplate,
    capability: "cmsWrite" as const,
  },
  {
    href: "/orders",
    label: "Lihat Pesanan",
    description: "Monitor & fulfillment",
    icon: ShoppingBag,
    capability: "orderRead" as const,
  },
  {
    href: "/storefront/media",
    label: "Upload Media",
    description: "Kelola aset gambar",
    icon: ImagePlus,
    capability: "cmsWrite" as const,
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {ACTIONS.map((action) => (
        <PermissionGate key={action.href} capability={action.capability}>
          <Link
            href={action.href}
            className="group tap-target flex min-w-0 flex-col justify-between rounded-2xl border border-border bg-warm-white p-4 shadow-xs transition-all duration-150 motion-reduce:transition-none hover:border-karyalo-green/40 hover:bg-soft-sage/20 hover:shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-karyalo-green focus-visible:ring-offset-2 active:scale-[0.98]"
            aria-label={`Pintasan Cepat: ${action.label} — ${action.description}`}
          >
            <div className="flex items-center justify-between">
              <div
                className="flex size-9 items-center justify-center rounded-xl bg-soft-sand text-karyalo-green transition-colors group-hover:bg-karyalo-green group-hover:text-warm-white"
                aria-hidden="true"
              >
                <action.icon size={18} />
              </div>
              <ArrowUpRight
                size={14}
                className="text-muted/40 transition-colors group-hover:text-karyalo-green"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 min-w-0 text-left">
              <span className="block truncate text-xs font-bold text-ink transition-colors group-hover:text-karyalo-green">
                {action.label}
              </span>
              <span className="mt-0.5 block truncate text-[11px] text-muted">
                {action.description}
              </span>
            </div>
          </Link>
        </PermissionGate>
      ))}
    </div>
  );
}
