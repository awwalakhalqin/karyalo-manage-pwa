"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth/session-context";
import { ROLE_LABEL } from "@/lib/auth/session-context";

/**
 * Bottom bar (desktop): connection, which role is in use, that the figures are
 * sample data, and the legal pages a marketplace reviewer looks for.
 */
export function StatusBar() {
  const { role, storeName } = useSession();
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  return (
    // Fixed rather than sticky: html/body carry overflow-x:hidden (globals.css),
    // which makes body a scroll container and sticky bottom-0 a no-op.
    <footer className="desktop-sidebar fixed inset-x-0 bottom-0 z-20 hidden h-8 items-center gap-4 border-t border-border bg-warm-white px-4 text-[11px] text-muted lg:flex">
      <span className="inline-flex items-center gap-1.5" role="status">
        <span className={`size-2 rounded-full ${online ? "bg-status-success" : "bg-status-critical"}`} aria-hidden="true" />
        {online ? "Terhubung" : "Offline — perubahan belum terkirim"}
      </span>
      <span>{storeName} · {ROLE_LABEL[role]}</span>
      <span className="rounded-full border border-terracotta-soft bg-terracotta-soft/40 px-2 py-0.5 font-semibold text-terracotta">Data contoh</span>
      <nav aria-label="Tautan legal" className="ml-auto flex items-center gap-4">
        <Link href="/privacy" className="hover:text-ink">Kebijakan Privasi</Link>
        <Link href="/terms" className="hover:text-ink">Ketentuan Layanan</Link>
        <span className="font-mono">v0.1.0</span>
      </nav>
    </footer>
  );
}
