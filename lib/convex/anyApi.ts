/**
 * `karyalo-manage-pwa` TIDAK menjalankan `npx convex dev` sendiri (tidak
 * ada function source Convex di project ini — backend yang dipakai untuk
 * push notification adalah milik `Karyalo_Storefront_PWA`, lihat
 * `ConvexClientProvider.tsx`). Karena itu tidak ada `convex/_generated/api`
 * hasil codegen untuk di-import di sini seperti biasa (`import { api } from
 * "@/convex/_generated/api"`).
 *
 * `anyApi` dari `convex/server` adalah cara resmi Convex memanggil fungsi
 * di deployment TANPA codegen lokal — referensi fungsi dibuat dari nama
 * path (`anyApi.notifications.subscribe` == fungsi `subscribe` di
 * `convex/notifications.ts` pada deployment manapun yang dituju
 * `NEXT_PUBLIC_CONVEX_URL`), di-resolve saat runtime oleh Convex, bukan
 * dicek tipenya saat compile. Konsekuensinya: TIDAK ada type-safety/
 * autocomplete untuk argumen (beda dari `api.*` biasa) — trade-off yang
 * diterima supaya dua project Next.js terpisah bisa berbagi satu backend
 * tanpa duplikasi source Convex atau harus copy-paste `_generated`
 * manual tiap kali storefront redeploy.
 *
 * **Belum tervalidasi jalan** (sandbox saya tidak bisa `npm install`
 * Convex — lihat PROTOTYPE_MANAGE_PWA_README.md). Kalau import `anyApi`
 * dari "convex/server" error di versi Convex yang ter-install, alternatif
 * cadangan: copy folder `convex/_generated` dari `Karyalo_Storefront_PWA`
 * ke `karyalo-manage-pwa/convex/_generated` setiap kali storefront
 * redeploy fungsi baru, lalu ganti import di bawah dengan
 * `import { api } from "@/convex/_generated/api"` di setiap pemakai.
 */
export { anyApi } from "convex/server";
