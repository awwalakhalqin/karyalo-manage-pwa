"use client";

import { ReactNode } from "react";
import { ShieldAlert } from "lucide-react";
import { useSession, CapabilitySet } from "@/lib/auth/session-context";

/**
 * PRD §39 Suggested Components — `PermissionGate`. §20.3: "UI hiding
 * bukan security boundary" — komponen ini HANYA menyembunyikan/memberi
 * tahu di sisi tampilan untuk demo perilaku per role; enforcement
 * sungguhan wajib di server/BFF begitu backend ada (belum ada di Fase 1).
 */
export function PermissionGate({
  capability,
  fallback = null,
  showDenied = false,
  children,
}: {
  capability: keyof CapabilitySet;
  fallback?: ReactNode;
  showDenied?: boolean;
  children: ReactNode;
}) {
  const { capabilities, hydrated } = useSession();

  if (!hydrated) return null;
  if (capabilities[capability]) return <>{children}</>;
  if (showDenied) {
    return (
      <div className="flex items-center gap-2 rounded-(--radius-card) border border-border bg-warm-white px-4 py-3 text-sm text-muted">
        <ShieldAlert size={16} className="shrink-0 text-terracotta" aria-hidden="true" />
        Role Anda saat ini tidak memiliki akses ke bagian ini.
      </div>
    );
  }
  return <>{fallback}</>;
}
