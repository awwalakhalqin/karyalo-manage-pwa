"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { OPEN_SEARCH_EVENT } from "@/components/layout/PageTabs";

/**
 * PRD §8.4 Global Controls — global search for order number, product name/SKU
 * and permitted customer identity. Opens the Ctrl/⌘K palette
 * (CommandPalette); the full results page stays at /search?q=.
 */
export function GlobalAdminSearch() {
  const [isMac, setIsMac] = useState(false);
  useEffect(() => setIsMac(/Mac|iPhone|iPad/.test(navigator.platform)), []);
  const open = () => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Cari order, produk, atau menu"
        className="ml-2 hidden h-9 w-full max-w-sm flex-1 items-center gap-2 rounded-full border border-border bg-soft-sand pl-3 pr-2 text-left text-sm text-muted transition-colors hover:border-karyalo-green/50 hover:bg-warm-white md:flex"
      >
        <Search size={15} aria-hidden="true" className="shrink-0" />
        <span className="flex-1 truncate">Cari order, produk, atau menu…</span>
        <kbd className="shrink-0 rounded-md border border-border bg-warm-white px-1.5 py-0.5 font-mono text-[11px]">{isMac ? "⌘" : "Ctrl"} K</kbd>
      </button>
      <button
        type="button"
        onClick={open}
        aria-label="Cari"
        className="tap-target flex size-8 items-center justify-center rounded-full text-muted hover:bg-soft-sand md:hidden"
      >
        <Search size={17} aria-hidden="true" />
      </button>
    </>
  );
}
