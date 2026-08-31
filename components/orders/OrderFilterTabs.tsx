"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/orders", label: "Semua" },
  { href: "/orders/shopee", label: "🛒 Shopee" },
  { href: "/orders/action-required", label: "Perlu Tindakan" },
  { href: "/orders/payment-issues", label: "Masalah Pembayaran" },
  { href: "/orders/fulfillment", label: "Fulfillment" },
  { href: "/orders/returns", label: "Retur / Refund" },
];

export function OrderFilterTabs() {
  const pathname = usePathname();
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {TABS.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              isActive
                ? "bg-deep-pine text-warm-white shadow-xs"
                : "bg-soft-sand text-ink hover:bg-soft-sage"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
