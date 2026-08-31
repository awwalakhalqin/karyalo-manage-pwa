# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary Users (Skala UMKM):**
  - **Owner (Pemilik Toko):** Memiliki akses penuh ke seluruh modul bisnis (penjualan, omzet, pengaturan toko, integrasi marketplace, manajemen tim, dan CMS).
  - **Admin Dashboard (Admin Toko):** Mengelola operasional harian toko (input produk/katalog, proses pesanan, promosi/diskon, CMS visual storefront, dan layanan pelanggan).
  - **Admin Warehouse (Admin Gudang / Fulfillment):** Fokus pada manajemen stok inventori fisik, pemrosesan packing pesanan, dan pencetakan nomor resi/label logistik pengiriman.
- **Operating Context:** Tim UMKM ramping (1-5 orang) yang membutuhkan antarmuka ringkas tanpa birokrasi role yang rumit, dapat diakses dari smartphone/tablet (PWA) maupun laptop toko.

## Product Purpose

Karyalo Manage PWA adalah sistem manajemen toko terpadu (Admin / CMS / Inventory) yang dirancang khusus untuk skala **UMKM dan Brand Lokal Indonesia**. Produk ini menyederhanakan pengelolaan pesanan multi-channel (Web Store & Shopee), pemantauan stok real-time, dan pembaruan konten storefront visual tanpa kompleksitas enterprise yang membebani.

## Positioning

Platform e-commerce admin & order management PWA yang ringan, cepat, dan terfokus untuk UMKM, menyatukan notifikasi pesanan masuk real-time, sinkronisasi stok multi-channel Shopee OpenAPI v2, dan kontrol hak akses ramping (**3 Role Inti: Owner, Admin Dashboard, Admin Warehouse**).

## Operating Context

- **Workflow:** Terima notifikasi pesanan (Web/Shopee) -> Admin Gudang cek stok & packing -> Cetak resi ekspedisi -> Admin Dashboard update promo/banner -> Owner pantau omzet.
- **Environment:** PWA responsif di smartphone admin/owner (Web Push Notification) dan desktop PC di gudang/meja kasir.

## Capabilities and Constraints

- **Simplified UMKM Roles:**
  - `Owner`: Akses 100% ke seluruh fitur dan pengaturan keuangan/tim.
  - `Admin Dashboard`: Akses ke Order, Katalog, Storefront CMS, Promosi, Pelanggan, dan Laporan.
  - `Admin Warehouse`: Akses khusus ke Order Fulfillment dan Inventori Stok Gudang.
- **Multi-channel Sync:** Integrasi Shopee Open Platform API (v2.order, v2.product, v2.logistics) & Storefront PWA.
- **Operational Truth:** Penanda data transparan (`SampleDataBanner`) pada masa prototype dan larangan angka fiktif di metrik utama.

## Brand Commitments

- **Brand:** Karyalo — Simpel, Cepat, Andal, Ramah UMKM.
- **Design Tokens:** Konsisten dengan ekosistem Karyalo Storefront (`globals.css`).

## Evidence on Hand

- Prototype Next.js 16 + Tailwind CSS v4 di `D:/KaryaLo/Projects/Internal/Karyalo_Product_Prototype/karyalo-manage-pwa`.
- Modul Integrasi Shopee Open Platform API di `/settings/integrations/shopee`.
- Kebijakan Privasi & Ketentuan Layanan di `/privacy` & `/terms`.

## Product Principles

1. **UMKM Simplicity:** Buang kerumitan enterprise; buat setiap menu dan aksi selesai dalam 1–2 klik.
2. **Lean Team Alignment:** Pisahkan tanggung jawab secara jelas antara Toko (Admin Dashboard) dan Gudang (Admin Warehouse) di bawah kendali penuh Owner.
3. **Real-time Agility:** Notifikasi instan saat ada pesanan baru untuk respon fulfillment yang cepat.
4. **Data Privacy by Default:** Perlindungan data pembeli dan masking PII otomatis.

## Accessibility & Inclusion

- Target sentuh mobile ≥ 44x44px.
- Kontras warna WCAG AA.
- Navigasi keyboard yang jelas dan intuitif.
