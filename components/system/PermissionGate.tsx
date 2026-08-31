"use client";

import { ReactNode } from "react";
import { ShieldAlert } from "lucide-react";
import { useSession, CapabilitySet } from "@/lib/auth/session-context";

/**
 * PermissionGate — Mengontrol akses fitur berdasarkan capability role aktif
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
  const { capabilities } = useSession();

  // Aman di SSR dan Client tanpa menghasilkan hydration mismatch
  if (capabilities && capabilities[capability]) {
    return <>{children}</>;
  }

  if (showDenied) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-warm-white px-4 py-3 text-xs text-muted">
        <ShieldAlert size={16} className="shrink-0 text-status-warning" aria-hidden="true" />
        <span>Role Anda saat ini tidak memiliki akses ke bagian ini.</span>
      </div>
    );
  }
  return <>{fallback}</>;
}
