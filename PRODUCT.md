# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary Users (Skala UMKM & Brand Lokal):**
  - **Owner (Pemilik Toko):** Memiliki kendali penuh atas performa bisnis, omzet, analitik toko, pengaturan tim, dan integrasi kanal penjualan (Shopee & Storefront).
  - **Admin Dashboard (Admin Toko / Operator CMS):** Mengelola operasional harian, mencakup pembuatan katalog (Product/Listing Management), desain storefront toko online (Web Builder), promosi, dan pemantauan order masuk.
  - **Admin Warehouse (Admin Gudang / Logistik):** Berfokus pada fulfillment, verifikasi stok fisik, pemrosesan pesanan, dan pencetakan label resi pengiriman (AWB).
- **Secondary / Review Users:**
  - **Shopee Open Platform Approver / Review Team:** Memeriksa kesesuaian integrasi API, alur otorisasi OAuth 2.0, kepatuhan perlindungan data (PII masking), serta fungsionalitas modul Product Management, Web Builder, dan Data Analytics.
- **Operating Context:** Tim UMKM ramping (1–5 orang) yang mengoperasikan toko dari perangkat smartphone/tablet (PWA) saat bepergian dan desktop/laptop di meja operasional/kasir.

## Product Purpose

Karyalo Manage PWA adalah sistem manajemen toko dan omnichannel admin terpadu yang dirancang untuk memberdayakan **UMKM dan Brand Lokal Indonesia**. Produk ini mengintegrasikan tiga layanan utama:
1. **Product/Listing Management:** Manajemen katalog terpusat dan sinkronisasi inventori dua arah dengan marketplace (Shopee).
2. **Web Builder (Storefront CMS):** Pembuat dan pengelola tampilan toko online mandiri berbasis web PWA tanpa perlu keahlian koding.
3. **Data Analytics:** Dasbor wawasan penjualan real-time, performa produk, dan rekapitulasi pesanan lintas kanal.

## Positioning

Platform e-commerce admin & PWA multi-channel yang ringan, cepat, dan ramah UMKM. Menyatukan otomatisasi pesanan Shopee OpenAPI v2 dan Web Storefront dalam satu kendali, didukung kontrol hak akses ramping (**3 Role Inti: Owner, Admin Dashboard, Admin Warehouse**) tanpa kerumitan sistem enterprise.

## Operating Context

- **Workflows:**
  - *Order & Fulfillment:* Pesanan masuk dari Shopee / Web -> Notifikasi instan -> Admin Gudang periksa stok & siapkan packing -> Cetak resi ekspedisi (v2.logistics) -> Status otomatis terbarui ke pembeli.
  - *Listing & Sync:* Admin Dashboard input/edit produk -> Stok otomatis tersinkronisasi dua arah ke Shopee Seller Center (v2.product.update_stock) dan Storefront PWA.
  - *Storefront Builder:* Desain dan modifikasi tata letak storefront web secara visual langsung dari admin panel.
  - *Analytics & Review:* Owner memantau metriks penjualan, pergerakan produk terlaris, dan tren pesanan.
- **Environment:** PWA responsif (Desktop, Tablet, Mobile) dengan dukungan Web Push Notification dan penanganan mode offline terintegrasi.

## Capabilities and Constraints

- **Layanan Resmi Terdaftar (Shopee Partner Capabilities):**
  - `Product/Listing Management`: Pengelolaan katalog produk, SKU, varian, dan pembaruan stok real-time.
  - `Web Builder`: Pengelolaan konten visual, banner promosi, dan modul toko online storefront.
  - `Data Analytics`: Laporan statistik penjualan, analitik produk, dan performa pesanan.
- **Integrasi Multi-Channel:**
  - **Shopee Open Platform API v2:** `v2.order`, `v2.product`, `v2.logistics`, OAuth 2.0 flow, dan Push Mechanism Webhook.
  - **Karyalo Storefront PWA:** Sinkronisasi katalog, checkout, dan status pesanan internal.
- **Dukungan Skala Seller:**
  - Ditargetkan untuk kohort awal 1–50 seller / UMKM aktif binaan.
- **Akses Pengujian & Review (Trial / Test Account):**
  - Menyediakan akun demo/trial terisolasi untuk proses verifikasi dan audit oleh Shopee App Review Team (`/login` demo access).
- **Perlindungan Data & Privasi:**
  - Kepatuhan terhadap **UU Perlindungan Data Pribadi (UU PDP No. 27/2022)** dan **Shopee Open Platform Data Protection Policy**.
  - Enkripsi transit (TLS 1.3), masking PII pembeli secara otomatis pada antarmuka, dan pelarangan injeksi data fiktif pada metrik produksi.

## Brand Commitments

- **Brand:** Karyalo — Simpel, Cepat, Andal, Ramah UMKM.
- **Design Tokens:** Konsisten dengan ekosistem visual Karyalo Storefront (`globals.css`), menggunakan palet earthy modern (*karyalo-green*, *deep-pine*, *soft-sand*, *warm-white*).
- **Live URL:** `https://karyalo-manage-pwa.vercel.app/`

## Evidence on Hand

- **Live Production / Prototype URL:** `https://karyalo-manage-pwa.vercel.app/`
- **Codebase Repository:** Next.js 16 + Tailwind CSS v4 di `D:/KaryaLo/Projects/Internal/Karyalo_Product_Prototype/karyalo-manage-pwa`.
- **Shopee Integration Hub:** Halaman konfigurasi OpenAPI di `/settings/integrations/shopee`.
- **Legal & Compliance:** Dokumen Kebijakan Privasi di `/privacy` dan Ketentuan Layanan di `/terms`.
- **Demo Access / Role Simulation:** Selector "Mode Demo" terpasang pada topbar untuk pengujian role Owner, Admin Dashboard, dan Admin Warehouse.

## Product Principles

1. **UMKM Simplicity:** Antarmuka ringkas tanpa beban kognitif; alur operasional selesai dalam 1–2 ketukan.
2. **Lean Team Alignment:** Pemisahan wewenang yang tegas antara Toko (Admin Dashboard) dan Gudang (Admin Warehouse) di bawah supervisi Owner.
3. **Real-time Omnichannel Agility:** Sinkronisasi instan pesanan dan stok multi-channel untuk mencegah *overselling* dan mempercepat fulfillment.
4. **Data Privacy by Design:** Menjaga kerahasiaan data pembeli dengan masking PII dan penegakan standar keamanan Shopee Open Platform.

## Accessibility & Inclusion

- Target sentuh mobile ≥ 44x44px untuk kenyamanan penggunaan di smartphone.
- Rasio kontras warna standar WCAG AA di seluruh komponen teks dan tombol aksi.
- Navigasi keyboard terstruktur dengan focus indicator yang jelas.
