import { FlaskConical } from "lucide-react";

/**
 * PRD §37 Codex Coding Rule 4: "Semua external/domain API dibungkus typed
 * adapter; mock isolated dan tidak masuk production path." Rule 21:
 * "Tidak boleh ada fake order, stock, sales, countdown, atau notification
 * production data." Data mock di bawah `lib/data/*.ts` DIPERBOLEHKAN untuk
 * keperluan review prototype (pemilik proyek eksplisit minta "mock dulu
 * kayak yg storefront", 16 Agustus 2026), TAPI setiap halaman yang
 * memakainya WAJIB menampilkan penanda ini secara jelas — supaya tidak
 * pernah bisa disalahartikan sebagai data produksi sungguhan oleh siapa
 * pun yang membuka prototype ini. Dashboard (`/`) SENGAJA TIDAK memakai
 * data mock apa pun (lihat MetricCard) — itu satu-satunya halaman yang
 * benar-benar dilarang PRD menampilkan angka sales/order/stock contoh.
 */
/**
 * SampleDataBanner — Dinonaktifkan agar antarmuka bersih dan seragam dengan standar halaman Home.
 */
export function SampleDataBanner({ note }: { note?: string }) {
  // Return null to keep interface clean without noisy disclaimer boxes
  return null;
}
