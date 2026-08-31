# Karyalo Commerce Manage (PWA)

> **E-Commerce Admin, Multi-Channel OMS & CMS Progressive Web App** untuk brand lokal dan UMKM Indonesia.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.10-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-orange)](https://web.dev/progressive-web-apps/)

---

## 🌟 Fitur Utama

- 📱 **Progressive Web App (PWA) Responsif:** Navigasi adaptif desktop (*Sidebar Navigation*) dan mobile (*Bottom Navigation*) dengan dukungan Web Push Notification saat pesanan masuk.
- 🛒 **Multi-Channel Order Management:** Integrasi penuh ke **Shopee Open Platform API (OpenAPI v2)** dan Web Storefront.
- 👥 **Struktur Hak Akses Ramping UMKM (3 Role Inti):**
  - **Owner (Pemilik Toko):** Akses penuh ke seluruh modul, keuangan, dan pengaturan tim.
  - **Admin Dashboard (Admin Toko):** Pengelolaan pesanan, katalog produk, promosi, dan CMS storefront visual.
  - **Admin Warehouse (Staf Gudang):** Fokus khusus pemrosesan fulfillment, packing, cetak resi kurir, dan inventori fisik.
- 🚚 **Logistik & Resi Otomatis:** Dukungan kurir ekspedisi (Shopee Xpress, J&T Express, SiCepat, JNE).
- 🛡️ **Kepatuhan Privasi Data (UU PDP No. 27/2022 & Shopee PII):** Enkripsi TLS 1.3 dan masking data sensitif pembeli secara otomatis.
- 🎨 **Storefront CMS:** Pengaturan section homepage, banner promosi, dan navigasi storefront dengan live preview.

---

## 🚀 Panduan Memulai

### Prasyarat
- **Node.js ≥ 18.18**
- **npm ≥ 9**

### Instalasi & Menjalankan

```bash
# 1. Clone repository
git clone https://github.com/awwalakhalqin/karyalo-manage-pwa.git
cd karyalo-manage-pwa

# 2. Instal dependensi
npm install

# 3. Jalankan server development (Port 3001)
npm run dev

# Atau jalankan mode production server (Direkomendasikan, sangat ringan)
npm run build
npm start
```

Buka [http://localhost:3001](http://localhost:3001) di browser Anda.

---

## 📁 Struktur Direktori

```text
karyalo-manage-pwa/
├── app/                        # Next.js App Router
│   ├── analytics/              # Laporan & Analisis Penjualan
│   ├── customers/              # Pelanggan & Masking Data PII
│   ├── marketing/              # Promosi & Kampanye
│   ├── menu/                   # Menu Navigasi Mobile
│   ├── notifications/          # Inbox & Web Push Notification
│   ├── orders/                 # Manajemen Pesanan & Filter Shopee
│   ├── privacy/                # Kebijakan Privasi (Privacy Policy)
│   ├── products/               # Katalog & Inventori SKU
│   ├── settings/               # Pengaturan Toko, Tim, Role, & Integrasi
│   │   └── integrations/
│   │       └── shopee/         # Konsol Shopee Open Platform API
│   ├── storefront/             # CMS Storefront & Live Preview
│   └── terms/                  # Ketentuan Layanan (Terms of Service)
├── components/                 # Komponen UI Modular
│   ├── dashboard/              # MetricCard, ActionRequiredCard, QuickActions
│   ├── layout/                 # TopBar, DesktopSidebar, MobileBottomNav, RoleSwitcher
│   ├── orders/                 # OrderList, ChannelBadge, OrderStatusBadge
│   └── system/                 # PermissionGate, SampleDataBanner
├── lib/
│   ├── auth/                   # Session Context & Role Matrix
│   ├── config/                 # Navigation & Route Registry
│   └── data/                   # Mock Data Adapter (Orders, Catalog, Team)
└── public/                     # Aset PWA, Icons, & Service Worker
```

---

## 🔒 Kepatuhan & Keamanan
Sistem dirancang memenuhi standar verifikasi **Shopee Open Platform Partner API** dan regulasi perlindungan data pribadi konsumen.

Lisensi: Private / Proprietary — Karyalo Commerce.
