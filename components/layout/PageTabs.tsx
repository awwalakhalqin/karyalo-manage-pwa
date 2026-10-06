"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Plus, Star, X } from "lucide-react";
import { labelForPath } from "@/lib/config/navigation";
import { useFavorites } from "@/components/layout/useFavorites";

const STORAGE_KEY = "karyalo_manage_open_tabs";
const MAX_TABS = 8;
export const OPEN_SEARCH_EVENT = "karyalo:open-search";

function readTabs(): string[] {
  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

/**
 * Pages open in this browser tab, one click apart — an order, its product, the
 * Shopee settings. Home is permanent so there is always somewhere to land.
 * Desktop only; phones keep the bottom navigation.
 */
export function PageTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const { isFavorite, toggle } = useFavorites();
  const [tabs, setTabs] = useState<string[]>(["/"]);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTabs((current) => {
      const base = current.length > 1 ? current : ["/", ...readTabs().filter((t) => t !== "/")];
      if (base.includes(pathname)) return base;
      const next = [...base, pathname];
      while (next.length > MAX_TABS) next.splice(1, 1);
      return next;
    });
  }, [pathname]);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tabs));
    } catch {
      // Only the restore-after-reload is lost.
    }
    stripRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [tabs, pathname]);

  const close = (href: string) => {
    const index = tabs.indexOf(href);
    const next = tabs.filter((t) => t !== href);
    setTabs(next.length ? next : ["/"]);
    if (href === pathname) router.push(next[Math.max(0, index - 1)] ?? "/");
  };

  const current = labelForPath(pathname);
  const fav = isFavorite(pathname);

  return (
    <div className="desktop-sidebar sticky top-14 z-20 hidden h-11 shrink-0 items-center gap-1 border-b border-border bg-warm-white px-3 lg:flex">
      <button
        type="button"
        onClick={() => toggle(pathname)}
        aria-pressed={fav}
        aria-label={fav ? `Hapus ${current.label} dari favorit` : `Tambahkan ${current.label} ke favorit`}
        title={fav ? "Hapus dari favorit" : "Tambahkan ke favorit"}
        className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-soft-sand"
      >
        <Star size={16} className={fav ? "fill-accent-cyan text-accent-cyan" : ""} />
      </button>

      <div ref={stripRef} role="tablist" aria-label="Halaman terbuka" className="flex min-w-0 flex-1 items-stretch gap-0.5 self-stretch overflow-x-auto [scrollbar-width:none]">
        {tabs.map((href) => {
          const { label, icon: Icon } = labelForPath(href);
          const active = href === pathname;
          const closable = href !== "/";
          return (
            <div key={href} className={`group flex shrink-0 items-center border-b-2 ${active ? "border-karyalo-green" : "border-transparent"}`}>
              <Link
                href={href}
                role="tab"
                aria-selected={active}
                className={`flex h-full items-center gap-2 pl-3 text-[13px] ${closable ? "pr-1.5" : "pr-3"} ${
                  active ? "font-semibold text-ink" : "font-medium text-muted hover:text-ink"
                }`}
              >
                <Icon size={14} aria-hidden="true" className={active ? "text-karyalo-green" : ""} />
                <span className="max-w-[170px] truncate">{label}</span>
              </Link>
              {closable && (
                <button
                  type="button"
                  onClick={() => close(href)}
                  aria-label={`Tutup tab ${label}`}
                  className={`mr-1 flex size-6 items-center justify-center rounded-md text-muted hover:bg-soft-sand hover:text-ink ${
                    active ? "" : "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                  }`}
                >
                  <X size={12} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT))}
        className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-semibold text-muted hover:border-karyalo-green/50 hover:text-ink"
      >
        <Plus size={13} aria-hidden="true" /> Tab baru
      </button>
    </div>
  );
}
