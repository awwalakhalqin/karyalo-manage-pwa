"use client";

import { useEffect } from "react";

/**
 * Sama persis polanya dengan Karyalo_Storefront_PWA — SW HANYA
 * didaftarkan di production. Di development, SW aktif (dari sesi lama
 * ataupun baru) di-unregister otomatis + cache dibersihkan, supaya tidak
 * terjadi bug refresh-loop yang sama seperti yang pernah dilaporkan di
 * storefront (stale-while-revalidate `_next/static/` bentrok dengan Fast
 * Refresh saat `next dev`).
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) => Promise.all(regs.map((r) => r.unregister())))
        .catch(() => {});
      if (typeof caches !== "undefined") {
        caches
          .keys()
          .then((keys) =>
            Promise.all(
              keys
                .filter((k) => k.startsWith("karyalo-manage-shell-"))
                .map((k) => caches.delete(k))
            )
          )
          .catch(() => {});
      }
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch((err) => {
      // eslint-disable-next-line no-console
      console.warn("[Karyalo Manage] Service worker registration gagal:", err);
    });
  }, []);

  return null;
}
