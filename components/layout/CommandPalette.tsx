"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CornerDownLeft, Package, Search, ShoppingBag, type LucideIcon } from "lucide-react";
import { ALL_NAV } from "@/lib/config/navigation";
import { useSession } from "@/lib/auth/session-context";
import { ORDERS, ORDER_STATUS_LABEL, ORDER_CHANNEL_LABEL } from "@/lib/data/orders";
import { PRODUCTS } from "@/lib/data/catalog";
import { OPEN_SEARCH_EVENT } from "@/components/layout/PageTabs";

interface Entry {
  id: string;
  group: "Menu" | "Pesanan" | "Produk" | "Cari";
  title: string;
  hint?: string;
  icon: LucideIcon;
  href: string;
}

const norm = (v: unknown) => String(v ?? "").toLowerCase();

/** "Budi Santoso" -> "B*** S******" for roles without customer PII access. */
const maskName = (name: string) => name.split(" ").map((w) => (w ? w[0] + "*".repeat(Math.max(1, w.length - 1)) : w)).join(" ");

/**
 * Ctrl/⌘K search: menus, orders (number, marketplace number, buyer) and
 * products (name, SKU). Results respect the role — no menu the role cannot
 * open, and buyer names stay masked without `customerPii`.
 */
export function CommandPalette() {
  const router = useRouter();
  const { capabilities } = useSession();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_SEARCH_EVENT, onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
  }, [open]);

  const can = (cap?: string) => !cap || !!(capabilities && capabilities[cap as keyof typeof capabilities]);
  const seePii = can("customerPii");

  const entries = useMemo<Entry[]>(() => {
    const q = norm(query).trim();
    const menu: Entry[] = ALL_NAV.filter((i) => can(i.capability)).flatMap((item): Entry[] => [
      { id: `m-${item.href}`, group: "Menu", title: item.label, icon: item.icon, href: item.href },
      ...(item.children ?? [])
        .filter((c) => can(c.capability) && c.href !== item.href)
        .map((c): Entry => ({ id: `m-${c.href}`, group: "Menu", title: c.label, hint: item.label, icon: item.icon, href: c.href })),
    ]).filter((e) => !q || norm(e.title).includes(q) || norm(e.hint).includes(q));

    const records: Entry[] = q.length < 2 ? [] : [
      ...(can("orderRead")
        ? ORDERS.filter((o) =>
            [o.orderNumber, o.channelOrderNumber, seePii ? o.customerName : "", o.city].some((v) => norm(v).includes(q))
          ).slice(0, 6).map((o) => ({
            id: `o-${o.id}`,
            group: "Pesanan" as const,
            title: `${o.orderNumber} · ${seePii ? o.customerName : maskName(o.customerName)}`,
            hint: `${ORDER_CHANNEL_LABEL[o.channel]} · ${ORDER_STATUS_LABEL[o.status]}`,
            icon: ShoppingBag,
            href: `/orders/${o.id}`,
          }))
        : []),
      ...(can("catalogWrite")
        ? PRODUCTS.filter((p) => [p.name, p.sku].some((v) => norm(v).includes(q))).slice(0, 6).map((p) => ({
            id: `p-${p.id}`,
            group: "Produk" as const,
            title: p.name,
            hint: `${p.sku} · stok ${p.stock}`,
            icon: Package,
            href: `/products/${p.id}`,
          }))
        : []),
      { id: "search-all", group: "Cari" as const, title: `Cari semua untuk “${query.trim()}”`, icon: Search, href: `/search?q=${encodeURIComponent(query.trim())}` },
    ];
    return [...menu.slice(0, q ? 8 : 12), ...records];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, capabilities]);

  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const go = (entry?: Entry) => {
    if (!entry) return;
    setOpen(false);
    router.push(entry.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(entries.length - 1, a + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === "Enter") { e.preventDefault(); go(entries[active]); }
  };

  let lastGroup = "";
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-ink/40 px-3 pt-[12vh]" onMouseDown={() => setOpen(false)}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cari di Karyalo Manage"
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-warm-white shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search size={17} className="shrink-0 text-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Cari menu, nomor order, produk, SKU…"
            aria-label="Kata kunci"
            aria-controls="palette-list"
            className="h-14 w-full bg-transparent text-[15px] text-ink placeholder:text-muted focus:outline-none"
          />
          <kbd className="hidden shrink-0 rounded-md border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted sm:block">Esc</kbd>
        </div>
        <ul id="palette-list" ref={listRef} role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
          {entries.map((entry, index) => {
            const header = entry.group !== lastGroup ? entry.group : null;
            lastGroup = entry.group;
            const Icon = entry.icon;
            const isActive = index === active;
            return (
              <li key={entry.id} role="presentation">
                {header && <div className="px-3 pb-1 pt-3 text-[11px] font-bold uppercase tracking-wider text-karyalo-green first:pt-1">{header}</div>}
                <div
                  role="option"
                  aria-selected={isActive}
                  data-index={index}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => go(entry)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${isActive ? "bg-soft-sage text-ink" : "text-ink/85"}`}
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-warm-white text-muted">
                    <Icon size={15} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{entry.title}</span>
                    {entry.hint && <span className="block truncate text-xs text-muted">{entry.hint}</span>}
                  </span>
                  {isActive ? <CornerDownLeft size={14} className="shrink-0 text-karyalo-green" /> : <ArrowRight size={14} className="shrink-0 text-border" />}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-4 border-t border-border bg-soft-sand/50 px-4 py-2 text-[11px] text-muted">
          <span><kbd className="font-mono">↑↓</kbd> pilih</span>
          <span><kbd className="font-mono">Enter</kbd> buka</span>
          <span className="ml-auto">Ketik 2 huruf atau lebih untuk mencari order & produk</span>
        </div>
      </div>
    </div>
  );
}
