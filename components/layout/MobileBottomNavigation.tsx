"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu as MenuIcon } from "lucide-react";
import { PRIMARY_NAV } from "@/lib/config/navigation";

/**
 * PRD §8.2 Mobile Navigation — 5 item P0: Home, Orders, Products,
 * Storefront, Menu. `Menu` di sini navigasi ke /menu (sheet sederhana
 * berisi Marketing/Customers/Analytics/Notifications/Settings), bukan
 * modal — supaya deep-link-able dan konsisten dengan pola routing lain.
 */
export function MobileBottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-warm-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {PRIMARY_NAV.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`tap-target flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium ${
              active ? "text-karyalo-green" : "text-muted"
            }`}
          >
            <item.icon size={20} aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
      <Link
        href="/menu"
        aria-current={pathname.startsWith("/menu") ? "page" : undefined}
        className={`tap-target flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium ${
          pathname.startsWith("/menu") ? "text-karyalo-green" : "text-muted"
        }`}
      >
        <MenuIcon size={20} aria-hidden="true" />
        Menu
      </Link>
    </nav>
  );
}
