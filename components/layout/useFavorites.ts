"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "@/lib/auth/session-context";

const EVENT = "karyalo:favorites-changed";
const keyFor = (role: string) => `karyalo_manage_favorites_${role}`;

function read(role: string): string[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(keyFor(role)) || "[]");
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

/**
 * Favourite pages, per role on this device (each role sees different menus).
 * The tab star and the sidebar list share it, so a change in one shows in the
 * other at once.
 */
export function useFavorites() {
  const { role } = useSession();
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(read(role));
    const sync = () => setFavorites(read(role));
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [role]);

  const toggle = useCallback(
    (href: string) => {
      const current = read(role);
      const next = current.includes(href) ? current.filter((h) => h !== href) : [...current, href];
      try {
        window.localStorage.setItem(keyFor(role), JSON.stringify(next));
      } catch {
        // Storage refused (private mode): the change lasts until reload.
      }
      setFavorites(next);
      window.dispatchEvent(new Event(EVENT));
    },
    [role]
  );

  return { favorites, isFavorite: (href: string) => favorites.includes(href), toggle };
}
