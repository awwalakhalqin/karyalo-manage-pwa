"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Star } from "lucide-react";
import { NAV_SECTIONS, sectionForPath, labelForPath, type NavItem } from "@/lib/config/navigation";
import { useSession } from "@/lib/auth/session-context";
import { ORDERS } from "@/lib/data/orders";
import { useFavorites } from "@/components/layout/useFavorites";

/**
 * Desktop navigation in two columns: a rail of work areas and a panel listing
 * the chosen area's menus. The rail follows the open page; picking another rail
 * button previews that area's menus without leaving the page.
 *
 * Still `.desktop-sidebar`, so the installed PWA (standalone) keeps hiding it in
 * favour of the bottom navigation — see globals.css.
 */
export function DesktopSideNavigation() {
  const pathname = usePathname();
  const { capabilities, role } = useSession();
  const { favorites } = useFavorites();
  const [sectionId, setSectionId] = useState(() => sectionForPath(pathname).id);

  useEffect(() => {
    setSectionId(sectionForPath(pathname).id);
  }, [pathname]);

  const allowed = (cap?: string) => !cap || !!(capabilities && capabilities[cap as keyof typeof capabilities]);

  const sections = useMemo(
    () =>
      NAV_SECTIONS.map((s) => ({ ...s, items: s.items.filter((i) => allowed(i.capability)) })).filter(
        (s) => s.items.length > 0
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [capabilities]
  );
  const section = sections.find((s) => s.id === sectionId) ?? sections[0];

  // Orders still waiting on someone; same flag the Orders page filters on.
  const actionCount = ORDERS.filter((o) => o.actionRequired).length;
  const badgeFor = (href: string) => (href === "/orders" && allowed("orderRead") ? actionCount : 0);
  const sectionBadge = (items: NavItem[]) => items.reduce((n, i) => n + badgeFor(i.href), 0);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href);
  const isWithin = (href: string) => href !== "/" && pathname.startsWith(href + "/");

  return (
    <aside
      aria-label="Navigasi Utama Admin"
      className="desktop-sidebar sticky top-14 hidden h-[calc(100vh-3.5rem-2rem)] shrink-0 border-r border-border bg-warm-white lg:flex"
    >
      {/* Rail */}
      <nav aria-label="Bagian kerja" className="flex w-[76px] shrink-0 flex-col items-center gap-1 border-r border-border py-3">
        {sections.map((s) => {
          const Icon = s.icon;
          const selected = s.id === section?.id;
          const count = sectionBadge(s.items);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSectionId(s.id)}
              aria-pressed={selected}
              title={s.label}
              className={`relative flex w-16 flex-col items-center gap-1 rounded-xl px-0.5 py-2 text-[10.5px] font-semibold transition-colors ${
                selected ? "bg-soft-sage text-karyalo-green" : "text-muted hover:bg-soft-sand hover:text-ink"
              }`}
            >
              {selected && <span aria-hidden="true" className="absolute -left-1.5 top-2 bottom-2 w-1 rounded-r-full bg-karyalo-green" />}
              <Icon size={19} aria-hidden="true" />
              <span className="w-full truncate text-center leading-tight">{s.label}</span>
              {count > 0 && (
                <span className="absolute right-2 top-1.5 size-2 rounded-full bg-status-critical ring-2 ring-warm-white" aria-label={`${count} perlu tindakan`} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Section panel */}
      <div className="flex w-56 flex-col overflow-y-auto">
        <div className="px-4 pb-2 pt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-karyalo-green">Bagian</div>
          <div className="text-[15px] font-bold text-ink">{section?.label}</div>
        </div>

        <nav aria-label={`Menu ${section?.label ?? ""}`} className="flex flex-col gap-3 px-2.5 pb-4">
          {section?.items.map((item) => {
            const children = (item.children ?? []).filter((c) => allowed(c.capability));
            const Icon = item.icon;
            if (children.length === 0) {
              const active = isActive(item.href) || isWithin(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors ${
                    active ? "bg-soft-sage font-semibold text-ink" : "font-medium text-ink/80 hover:bg-soft-sand"
                  }`}
                >
                  <Icon size={15} aria-hidden="true" className={active ? "text-karyalo-green" : "text-muted"} />
                  <span className="flex-1 truncate">{item.label}</span>
                  {badgeFor(item.href) > 0 && <CountBadge count={badgeFor(item.href)} />}
                </Link>
              );
            }
            return (
              <div key={item.href} className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2 px-2.5 pb-0.5 text-[11px] font-bold uppercase tracking-wider text-muted">
                  <Icon size={13} aria-hidden="true" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {badgeFor(item.href) > 0 && <CountBadge count={badgeFor(item.href)} />}
                </div>
                {children.map((child) => {
                  const active = pathname === child.href;
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-lg px-2.5 py-1.5 text-[13px] transition-colors ${
                        active ? "bg-soft-sage font-semibold text-ink" : "font-medium text-ink/75 hover:bg-soft-sand hover:text-ink"
                      }`}
                    >
                      {child.label}
                    </Link>
                  );
                })}
              </div>
            );
          })}

          <div className="border-t border-border/70 pt-3">
            <div className="flex items-center gap-1.5 px-2.5 pb-1 text-[11px] font-bold uppercase tracking-wider text-muted">
              <Star size={12} aria-hidden="true" className="fill-accent-cyan text-accent-cyan" /> Favorit
            </div>
            {favorites.length === 0 ? (
              <p className="px-2.5 text-xs leading-relaxed text-muted">
                Klik bintang di samping tab halaman untuk menyimpan halaman yang sering dibuka.
              </p>
            ) : (
              favorites.map((href) => {
                const { label, icon: Icon } = labelForPath(href);
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] transition-colors ${
                      active ? "bg-soft-sage font-semibold text-ink" : "font-medium text-ink/75 hover:bg-soft-sand"
                    }`}
                  >
                    <Icon size={14} aria-hidden="true" className="text-muted" />
                    <span className="truncate">{label}</span>
                  </Link>
                );
              })
            )}
          </div>
        </nav>

        {role === "Owner" && (
          <div className="mt-auto border-t border-border/70 p-2.5">
            <div className="flex items-center justify-between rounded-xl border border-border/80 bg-soft-sand/40 p-2.5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#ee4d2d]/10 text-[#ee4d2d]">
                  <ShoppingBag size={14} aria-hidden="true" />
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-xs font-semibold text-ink">Shopee Store</span>
                  <span className="flex items-center gap-1.5 text-[10px] text-muted">
                    <span className="inline-block size-1.5 rounded-full bg-status-success" />
                    Terhubung
                  </span>
                </div>
              </div>
              <Link href="/settings/integrations/shopee" className="shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-karyalo-green hover:bg-soft-sage/60">
                Kelola
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

function CountBadge({ count }: { count: number }) {
  return (
    <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-status-critical px-1.5 text-[10px] font-bold leading-5 text-warm-white tabular-nums">
      {count > 99 ? "99+" : count}
    </span>
  );
}
