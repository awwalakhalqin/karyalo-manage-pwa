"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { PRIMARY_NAV, MENU_NAV } from "@/lib/config/navigation";
import { useSession } from "@/lib/auth/session-context";

export function DesktopSideNavigation() {
  const pathname = usePathname();
  const { capabilities, role } = useSession();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleSection = (href: string, defaultOpen: boolean) => {
    setExpanded((prev) => ({
      ...prev,
      [href]: prev[href] !== undefined ? !prev[href] : !defaultOpen,
    }));
  };

  const visiblePrimaryNav = PRIMARY_NAV.filter(
    (item) => !item.capability || (capabilities && capabilities[item.capability])
  );

  const visibleMenuNav = MENU_NAV.filter(
    (item) => !item.capability || (capabilities && capabilities[item.capability])
  );

  const renderNavSection = (items: typeof visiblePrimaryNav) => (
    <nav className="flex flex-col gap-0.5">
      {items.map((item) => {
        const isExactActive = pathname === item.href;
        const isParentOfActive = item.href !== "/" && pathname.startsWith(item.href + "/");
        const isSectionActive = isExactActive || isParentOfActive;

        const visibleChildren = item.children?.filter(
          (child) => !child.capability || (capabilities && capabilities[child.capability])
        );
        const hasChildren = visibleChildren && visibleChildren.length > 0;
        const isExpanded = expanded[item.href] !== undefined ? expanded[item.href] : isSectionActive;

        return (
          <div key={item.href} className="flex flex-col">
            <div
              className={`group flex items-center justify-between rounded-xl px-2.5 py-2 text-[13px] transition-colors ${
                isExactActive
                  ? "bg-deep-pine text-warm-white font-semibold shadow-xs"
                  : isParentOfActive
                  ? "bg-soft-sand/90 text-deep-pine font-semibold"
                  : "text-ink/80 hover:bg-soft-sand hover:text-ink font-medium"
              }`}
            >
              <Link
                href={item.href}
                aria-current={isExactActive ? "page" : undefined}
                className="flex flex-1 items-center gap-2.5 min-w-0"
              >
                <item.icon
                  size={16}
                  className={`shrink-0 ${
                    isExactActive
                      ? "text-warm-white"
                      : isParentOfActive
                      ? "text-karyalo-green"
                      : "text-muted group-hover:text-ink"
                  }`}
                  aria-hidden="true"
                />
                <span className="truncate">{item.label}</span>
              </Link>

              {hasChildren && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSection(item.href, isSectionActive);
                  }}
                  aria-label={`Toggle sub-menu ${item.label}`}
                  className={`ml-1 flex size-6 items-center justify-center rounded-md transition-all ${
                    isExactActive
                      ? "hover:bg-white/10 text-warm-white/80"
                      : "hover:bg-border/60 text-muted group-hover:text-ink"
                  }`}
                >
                  <ChevronRight
                    size={13}
                    className={`transition-transform duration-200 ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>

            {hasChildren && isExpanded && (
              <div className="my-1 ml-4 flex flex-col gap-0.5 border-l border-border/70 pl-2.5">
                {visibleChildren.map((child) => {
                  const isChildActive = pathname === child.href;
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`rounded-lg px-2 py-1.5 text-xs transition-colors ${
                        isChildActive
                          ? "bg-soft-sage text-karyalo-green font-semibold shadow-2xs"
                          : "text-muted hover:bg-soft-sand/70 hover:text-ink font-medium"
                      }`}
                    >
                      {child.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <aside
      aria-label="Navigasi Utama Admin"
      className="desktop-sidebar sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 flex-col justify-between overflow-y-auto border-r border-border bg-warm-white p-3 lg:flex"
    >
      <div className="flex flex-col gap-5">
        {visiblePrimaryNav.length > 0 && (
          <div className="flex flex-col gap-1">
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-muted/70">
              Menu Utama
            </span>
            {renderNavSection(visiblePrimaryNav)}
          </div>
        )}

        {visibleMenuNav.length > 0 && (
          <div className="flex flex-col gap-1 border-t border-border/70 pt-4">
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-muted/70">
              Layanan & Pengaturan
            </span>
            {renderNavSection(visibleMenuNav)}
          </div>
        )}
      </div>

      {role === "Owner" && (
        <div className="mt-6 border-t border-border/70 pt-3">
          <div className="flex items-center justify-between rounded-xl border border-border/80 bg-soft-sand/40 p-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#ee4d2d]/10 text-[#ee4d2d]">
                <ShoppingBag size={14} aria-hidden="true" />
              </span>
              <div className="flex flex-col min-w-0">
                <span className="truncate text-xs font-semibold text-ink">Shopee Store</span>
                <span className="flex items-center gap-1.5 text-[10px] text-muted">
                  <span className="size-1.5 rounded-full bg-status-success inline-block"></span>
                  Terhubung
                </span>
              </div>
            </div>
            <Link
              href="/settings/integrations/shopee"
              className="shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-karyalo-green hover:bg-soft-sage/60 transition-colors"
            >
              Kelola
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
