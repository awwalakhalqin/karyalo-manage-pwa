"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ALL_NAV } from "@/lib/config/navigation";
import { PermissionGate } from "@/components/system/PermissionGate";

/**
 * PRD §8.3 Desktop Navigation — "collapsible side navigation... konten dan
 * permission sama dengan mobile". Collapse-to-icons belum diimplementasi
 * (P1-ish detail, bukan blocker Foundation) — sidebar fixed-width untuk
 * Fase 1, dicatat di README sebagai simplifikasi.
 */
export function DesktopSideNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigasi utama"
      className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-(--sidebar-width) shrink-0 flex-col gap-1 overflow-y-auto border-r border-border bg-warm-white px-3 py-4 md:flex"
    >
      {ALL_NAV.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        const content = (
          <div className="flex flex-col gap-0.5">
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`tap-target flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-soft-sage text-deep-pine"
                  : "text-ink hover:bg-soft-sand"
              }`}
            >
              <item.icon size={18} aria-hidden="true" />
              {item.label}
            </Link>
            {active && item.children && item.children.length > 0 && (
              <div className="ml-9 flex flex-col gap-0.5 border-l border-border pl-3">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`rounded-md px-2 py-1.5 text-xs ${
                      pathname === child.href
                        ? "font-semibold text-karyalo-green"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );

        return item.capability ? (
          <PermissionGate key={item.href} capability={item.capability}>
            {content}
          </PermissionGate>
        ) : (
          <div key={item.href}>{content}</div>
        );
      })}
    </nav>
  );
}
