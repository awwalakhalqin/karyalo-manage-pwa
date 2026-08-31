"use client";

import { ReactNode, useMemo } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

/**
 * BARU 16 Agustus 2026, dipicu pertanyaan pemilik proyek soal push
 * notification order baru (PRD §16.3/16.4). `karyalo-manage-pwa` TIDAK
 * punya backend Convex sendiri (arsitektur backend Manage belum
 * diputuskan — lihat PROTOTYPE_MANAGE_PWA_README.md), tapi untuk fitur
 * ini SENGAJA disambungkan ke deployment Convex YANG SAMA dengan
 * `Karyalo_Storefront_PWA` (di mana tabel `orders`/`pushSubscriptions`
 * hidup), lewat `NEXT_PUBLIC_CONVEX_URL` yang harus diisi sama persis di
 * kedua project. Ini keputusan implementasi untuk membuat progres cepat
 * pada satu fitur konkret, BUKAN keputusan final arsitektur backend
 * Manage — lihat CONVEX_SETUP.md (di folder storefront) bagian "Kenapa
 * satu backend Convex dipakai berdua".
 *
 * Karena project ini tidak menjalankan `npx convex dev` sendiri (tidak
 * ada `convex/` folder function source di sini), tidak ada
 * `convex/_generated/api` untuk di-import. Pemanggil (PushSubscribeButton,
 * halaman order live) memakai `anyApi` dari `convex/server` — referensi
 * fungsi tanpa codegen, lihat `lib/convex/anyApi.ts`.
 *
 * Sama seperti storefront: kalau `NEXT_PUBLIC_CONVEX_URL` kosong,
 * provider ini TIDAK membungkus `<ConvexProvider>` — halaman lain tetap
 * jalan (data mock), cuma fitur push yang tidak aktif.
 */
let hasWarnedMissingConvexUrl = false;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  const client = useMemo(() => {
    if (!convexUrl) {
      if (
        process.env.NODE_ENV !== "production" &&
        typeof window !== "undefined" &&
        !hasWarnedMissingConvexUrl
      ) {
        hasWarnedMissingConvexUrl = true;
        // eslint-disable-next-line no-console
        console.warn(
          "[Karyalo Manage] NEXT_PUBLIC_CONVEX_URL belum diisi — push notification order " +
            "baru tidak akan aktif (isi sama dengan NEXT_PUBLIC_CONVEX_URL milik " +
            "Karyalo_Storefront_PWA). Lihat CONVEX_SETUP.md di folder storefront."
        );
      }
      return null;
    }
    return new ConvexReactClient(convexUrl);
  }, [convexUrl]);

  if (!client) {
    return <>{children}</>;
  }

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
