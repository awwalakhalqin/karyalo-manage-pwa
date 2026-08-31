"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, ShoppingBag } from "lucide-react";
import { ALL_NAV } from "@/lib/config/navigation";
import { useSession } from "@/lib/auth/session-context";

export function MobileDrawerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { role, storeName, capabilities } = useSession();

  // Filter menu items berdasarkan permission role aktif
  const visibleNav = ALL_NAV.filter(
    (item) => !item.capability || (capabilities && capabilities[item.capability])
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Buka Semua Menu"
        className="tap-target flex size-9 items-center justify-center rounded-xl border border-border bg-soft-sand text-ink hover:bg-soft-sage hover:text-karyalo-green md:hidden"
      >
        <Menu size={18} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative flex h-full w-[82%] max-w-sm flex-col bg-warm-white shadow-2xl">
            {/* Drawer Header */}
            <div className="flex h-14 items-center justify-between border-b border-border bg-soft-sand px-4">
              <div className="flex flex-col">
                <span className="font-bold text-xs text-ink">{storeName}</span>
                <span className="text-xs text-karyalo-green font-semibold">Role: {role}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="tap-target rounded-full p-1.5 text-muted hover:bg-border hover:text-ink"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Nav Items List */}
            <div className="flex-1 overflow-y-auto px-3 py-4">
              <span className="mb-2 block px-2 text-xs font-bold uppercase tracking-wider text-muted">
                Menu & Modul Fitur ({visibleNav.length} Modul)
              </span>

              <div className="flex flex-col gap-1">
                {visibleNav.map((item) => {
                  const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  const visibleChildren = item.children?.filter(
                    (child) => !child.capability || (capabilities && capabilities[child.capability])
                  );

                  return (
                    <div key={item.href} className="flex flex-col">
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`tap-target flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors ${
                          active
                            ? "bg-deep-pine text-warm-white shadow-xs"
                            : "text-ink hover:bg-soft-sand"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <item.icon size={16} aria-hidden="true" />
                          <span>{item.label}</span>
                        </div>
                        {visibleChildren && visibleChildren.length > 0 && (
                          <ChevronRight size={13} className="opacity-70" aria-hidden="true" />
                        )}
                      </Link>

                      {/* Submenu items */}
                      {visibleChildren && visibleChildren.length > 0 && (
                        <div className="my-1 ml-6 flex flex-col gap-0.5 border-l border-border/80 pl-3">
                          {visibleChildren.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className={`tap-target rounded-lg px-2 py-1.5 text-xs transition-colors ${
                                pathname === child.href
                                  ? "font-bold text-karyalo-green bg-soft-sage/40"
                                  : "text-muted hover:text-ink"
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Drawer Footer */}
            {role === "Owner" && (
              <div className="border-t border-border bg-soft-sand p-3 text-center">
                <Link
                  href="/settings/integrations/shopee"
                  onClick={() => setIsOpen(false)}
                  className="tap-target inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#ee4d2d]/30 bg-[#ee4d2d]/10 px-3 py-2 text-xs font-semibold text-[#ee4d2d]"
                >
                  <ShoppingBag size={14} aria-hidden="true" />
                  <span>Shopee Open Platform Hub</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
