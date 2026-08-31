"use client";

import { Store, ChevronDown } from "lucide-react";
import { useSession } from "@/lib/auth/session-context";

/**
 * PRD §8.4 / §39 `TenantStoreSwitcher` — "jika user memiliki akses >1
 * store". Prototype ini hanya 1 store mock, jadi switcher ditampilkan
 * non-interaktif (bukan dropdown kosong yang menyesatkan) — §22
 * Multi-Tenant Isolation belum relevan sampai ada >1 tenant sungguhan.
 */
export function TenantStoreSwitcher() {
  const { storeName, hydrated } = useSession();

  return (
    <div
      className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-ink"
      title="Hanya satu store pada prototype ini — switcher multi-store belum relevan"
    >
      <Store size={14} aria-hidden="true" />
      <span className="max-w-[9rem] truncate">{hydrated ? storeName : "—"}</span>
      <ChevronDown size={12} className="text-muted" aria-hidden="true" />
    </div>
  );
}
