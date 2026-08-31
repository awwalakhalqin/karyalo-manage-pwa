"use client";

import { BASELINE_ROLES, ROLE_LABEL, useSession } from "@/lib/auth/session-context";

const SHORT_ROLE_LABEL: Record<(typeof BASELINE_ROLES)[number], string> = {
  Owner: "👑 Owner",
  AdminDashboard: "💻 Admin Toko",
  AdminWarehouse: "📦 Gudang",
};

/**
 * Role Switcher Responsif (Desktop & Mobile Friendly).
 */
export function RoleSwitcher() {
  const { role, setRole, hydrated } = useSession();

  return (
    <label className="flex items-center gap-1 rounded-full border border-dashed border-accent-cyan bg-soft-sage px-2 py-1 text-xs font-medium text-deep-pine sm:gap-1.5 sm:px-3 sm:py-1.5">
      <span className="hidden lg:inline text-muted/80">Role:</span>
      <select
        value={hydrated ? role : ""}
        onChange={(e) => setRole(e.target.value as (typeof BASELINE_ROLES)[number])}
        className="cursor-pointer bg-transparent text-[11px] font-semibold text-deep-pine focus:outline-none sm:text-xs"
        aria-label="Ganti role demo untuk meninjau perilaku permission"
      >
        {BASELINE_ROLES.map((r) => (
          <option key={r} value={r}>
            {/* Teks ringkas di mobile, nama lengkap di desktop */}
            {hydrated ? ROLE_LABEL[r] : r}
          </option>
        ))}
      </select>
    </label>
  );
}
