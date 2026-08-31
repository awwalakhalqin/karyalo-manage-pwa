"use client";

import { BASELINE_ROLES, ROLE_LABEL, useSession } from "@/lib/auth/session-context";

/**
 * BUKAN dari PRD — utilitas khusus prototype supaya pemilik proyek bisa
 * meninjau perilaku permission-gating (§20) per role tanpa backend auth
 * sungguhan. Ditandai jelas "Mode Demo" supaya tidak disalahartikan
 * sebagai fitur produksi. Akan dibuang begitu autentikasi sungguhan ada.
 */
export function RoleSwitcher() {
  const { role, setRole, hydrated } = useSession();

  return (
    <label className="flex items-center gap-1.5 rounded-full border border-dashed border-accent-cyan bg-soft-sage px-3 py-1.5 text-xs font-medium text-deep-pine">
      <span className="hidden sm:inline">Mode Demo — Role:</span>
      <select
        value={hydrated ? role : ""}
        onChange={(e) => setRole(e.target.value as (typeof BASELINE_ROLES)[number])}
        className="bg-transparent text-xs font-semibold text-deep-pine focus:outline-none"
        aria-label="Ganti role demo untuk meninjau perilaku permission"
      >
        {BASELINE_ROLES.map((r) => (
          <option key={r} value={r}>
            {ROLE_LABEL[r]}
          </option>
        ))}
      </select>
    </label>
  );
}
