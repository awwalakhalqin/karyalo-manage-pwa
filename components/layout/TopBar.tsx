"use client";

import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { GlobalAdminSearch } from "./GlobalAdminSearch";
import { NotificationBell } from "./NotificationBell";
import { TenantStoreSwitcher } from "./TenantStoreSwitcher";
import { RoleSwitcher } from "./RoleSwitcher";
import { useSession } from "@/lib/auth/session-context";

/**
 * PRD §9.1 Shell Responsibilities — search, notification entry point,
 * tenant/store switcher, account/profile (§8.4 Global Controls) disatukan
 * di satu top bar, dipakai desktop maupun mobile (search disembunyikan di
 * mobile lewat GlobalAdminSearch sendiri, digantikan ikon di /menu nanti).
 */
export function TopBar() {
  const { userName, hydrated } = useSession();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-warm-white px-4 md:px-6">
      <Link href="/" className="flex shrink-0 items-center gap-2">
        <Image src="/logo.png" alt="Karyalo" width={28} height={28} className="rounded-md" />
        <span className="hidden text-sm font-semibold text-ink sm:inline">Karyalo Manage</span>
      </Link>

      <GlobalAdminSearch />

      <div className="ml-auto flex items-center gap-2">
        <RoleSwitcher />
        <TenantStoreSwitcher />
        <NotificationBell />
        <Link
          href="/settings/team"
          aria-label="Akun"
          className="tap-target flex items-center gap-2 rounded-full pl-1 pr-2 text-ink hover:bg-soft-sand"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-soft-sage text-deep-pine">
            <User size={15} aria-hidden="true" />
          </span>
          <span className="hidden max-w-[8rem] truncate text-xs font-medium md:inline">
            {hydrated ? userName : "—"}
          </span>
        </Link>
      </div>
    </header>
  );
}
