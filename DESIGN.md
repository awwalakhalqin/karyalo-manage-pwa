---
name: Karyalo Manage PWA
description: Sistem manajemen toko & omnichannel e-commerce admin terpadu untuk UMKM dan Brand Lokal
colors:
  primary: "#1e5aa8"
  primary-deep: "#1e2f5c"
  accent-cyan: "#2fc1d6"
  neutral-ink: "#1c2430"
  neutral-muted: "#5b6472"
  neutral-bg: "#fcfbf7"
  canvas-bg: "#f4f1ea"
  surface-sage: "#e8f1fa"
  border: "#dce2ea"
  status-critical: "#b3261e"
  status-warning: "#a5482d"
  status-success: "#1c7a4d"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 4vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  card: "18px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
  button-secondary:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  card-standard:
    backgroundColor: "{colors.neutral-bg}"
    rounded: "{rounded.card}"
    padding: "16px 20px"
---

# Design System: Karyalo Manage PWA

## Overview

**Creative North Star: "The Focused Merchant Cockpit"**

Karyalo Manage PWA dirancang sebagai pusat kendali operasional toko yang tenang, presisi, dan bebas friksi bagi pengusaha UMKM dan brand lokal Indonesia. Antarmuka mengutamakan kejelasan hierarki data, kemudahan pemindaian informasi pesanan secara cepat (*high scanability*), dan keterbacaan tinggi di berbagai kondisi kerja—mulai dari layar smartphone saat mobilitas tinggi hingga monitor komputer di meja fulfillment.

Arah estetika mengusung pendekatan *warm utilitarian minimalism*: memadukan palet warna bumi modern (*Warm White* dan *Soft Sand*) dengan aksen *Brand Royal Blue* dan *Deep Pine* untuk menegaskan profesionalisme tanpa kesan korporat yang kaku. Kontras warna tinggi dan ruang bernapas yang lega (*generous whitespace*) memastikan setiap kartu metrik dan baris tabel mudah dipahami dalam 1-2 detik tanpa membebani fokus pengguna.

**Key Characteristics:**
- **Tenang & Bertujuan:** Menghindari elemen visual dekoratif berlebihan; setiap warna dan batas memiliki arti fungsional.
- **Tinggi Keterbacaan:** Menggunakan tipografi *Inter* dengan skala ritme matematis dan rasio kontras WCAG AA (minimal 4.5:1 untuk teks biasa, >12:1 untuk heading).
- **Adaptif Antar-Perangkat:** Tata letak responsif mulus dari smartphone (360px) dengan target sentuh ≥44px hingga desktop ultrawide (1440px+).

## Colors

Palet warna Karyalo mengusung kontras bersih dengan nuansa alami hangat dan aksen biru maritim yang mencerminkan ketegasan serta keandalan omnichannel.

### Primary
- **Brand Royal Blue / Karyalo Green** (#1e5aa8): Warna aksi primer untuk tombol Call-to-Action, link interaktif, indikator fokus aktif, dan status tab aktif.
- **Deep Pine / Brand Navy** (#1e2f5c): Digunakan untuk header, sidebar desktop, dan tipografi judul utama (heading) dengan rasio kontras 12.55:1 terhadap latar belakang.

### Secondary (Optional)
- **Accent Cyan** (#2fc1d6): Aksen terang dari logo; digunakan secara selektif untuk elemen visual dekoratif, badge status khusus, dan highlight ikon. Dilarang digunakan sebagai warna teks di atas latar terang.

### Tertiary (Optional)
- **Terracotta** (#a5482d): Warna aksen peringatan untuk menandai stok menipis, pesanan yang mendekati batas waktu fulfillment, dan badge perhatian.

### Neutral
- **Body Ink** (#1c2430): Warna teks utama untuk paragraf dan nilai data pada latar terang (rasio kontras 15.09:1).
- **Muted Slate** (#5b6472): Warna teks sekunder untuk label input, hint penjelasan, dan timestamp metadata.
- **Warm White** (#fcfbf7): Warna permukaan kartu (*card surface*), modal, dan kontainer konten utama.
- **Soft Sand** (#f4f1ea): Warna latar belakang kanvas aplikasi (*page canvas background*) dan section selang-seling.
- **Soft Sage / Ice Blue Tint** (#e8f1fa): Permukaan kartu aksen, baris tabel saat di-hover, dan latar belakang avatar role.
- **Border Gray** (#dce2ea): Garis batas pemisah halus (*hairline border*) untuk kartu, divider, dan input field.

### Status & Severity
- **Status Critical** (#b3261e): Error pembayaran, kehabisan stok fisik (*out of stock*), dan aksi berisiko.
- **Status Warning** (#a5482d): Stok menipis (*low stock*), pesanan butuh perhatian mendesak.
- **Status Info** (#1e5aa8): Notifikasi pesanan baru masuk dan informasi sinkronisasi.
- **Status Success** (#1c7a4d): Pesanan selesai dikirim, sinkronisasi API Shopee terhubung, dan perubahan tersimpan.

### Named Rules
**The Single Focus Accent Rule.** Warna *Brand Royal Blue* (#1e5aa8) hanya boleh menjadi fokus utama pada satu aksi terpenting per layar/viewport. Jangan membuat banyak tombol primer yang saling bersaing.

**The No-Pure-Black Rule.** Dilarang menggunakan hitam murni (#000000) untuk teks atau latar belakang. Gunakan *Body Ink* (#1c2430) dan *Deep Pine* (#1e2f5c) untuk menjaga kelembutan visual.

## Typography

**Display Font:** Inter, system-ui, -apple-system, sans-serif  
**Body Font:** Inter, system-ui, -apple-system, sans-serif  
**Label/Mono Font:** ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace  

**Character:** Tipografi dirancang untuk kecepatan scan data operasional: proporsional, netral, memiliki angka tabular yang rapi, dan legibilitas tajam di layar resolusi rendah.

### Hierarchy
- **Display** (Bold 700, clamp(1.5rem, 4vw, 2rem), line-height 1.2, letter-spacing -0.02em): Angka metrik omzet utama pada kartu ringkasan dashboard.
- **Headline** (Bold 700, 1.5rem / 24px, line-height 1.3, letter-spacing -0.01em): Judul halaman modul utama (misal: "Shopee Open Platform API", "Daftar Pesanan").
- **Title** (SemiBold 600, 0.9375rem / 15px, line-height 1.4): Judul kartu metrik, header tabel, dan section form.
- **Body** (Regular 400, 0.9375rem / 15px, line-height 1.55): Teks konten, deskripsi pengaturan, dan catatan pesanan (maksimal 75 karakter per baris).
- **Label** (SemiBold 600, 0.75rem / 12px, line-height 1.3): Badge status pesanan, channel marketplace, dan counter karakter.

### Named Rules
**The Tabular Number Rule.** Seluruh angka nominal uang (Rp), jumlah stok, dan nomor resi kurir wajib menggunakan angka seragam (*tabular figures / mono-spaced font*) agar mudah disejajarkan secara vertikal.

## Layout

Tata letak Karyalo Manage PWA menggunakan sistem modular berbasis grid dan kontainer responsif berorientasi alur kerja:

- **Canvas & Surface Rhythm:** Halaman menggunakan latar belakang *Soft Sand* (#f4f1ea), sedangkan seluruh grup konten dan kartu data menggunakan kontainer *Warm White* (#fcfbf7) dengan batas hairline 1px (#dce2ea).
- **Container Scales:**
  - `container-wide` (1440px): Digunakan untuk Dashboard, Tabel Pesanan, dan Katalog Produk agar kolom data tampil lega tanpa horizontal scroll berlebihan.
  - `container-content` (1240px): Digunakan untuk Form Pengaturan, Integrasi API, dan Detail Pesanan agar fokus input tetap terpusat.
- **Responsive Breakpoints:**
  - Mobile (<768px): Tampilan satu kolom, navigasi bawah mengambang (*Mobile Bottom Navigation* 5 tab), padding horizontal 14px–16px.
  - Desktop (≥768px): Navigasi samping tetap (*Desktop Side Navigation* 264px), topbar sticky dengan quick role selector, padding horizontal 24px.

## Elevation & Depth

Sistem Karyalo mengusung filosofi **Flat-with-Tactile-Borders**: kedalaman antarmuka dibangun melalui pelapisan nada warna (*tonal layering*) dan garis batas hairline bersih, bukan melalui bayangan gelap bertumpuk.

### Shadow Vocabulary
- **Card Ambient** (`box-shadow: 0 1px 2px 0 rgba(28, 36, 48, 0.05)`): Bayangan sangat halus pada kartu metrik dan kontainer form untuk membedakannya dari kanvas dasar.
- **Floating Overlay** (`box-shadow: 0 4px 16px -2px rgba(28, 36, 48, 0.10)`): Digunakan untuk dropdown menu, modal popup, dan dialog konfirmasi.

### Named Rules
**The Border-First Elevation Rule.** Jangan gunakan drop shadow tebal untuk membedakan kartu. Gunakan border 1px *Border Gray* (#dce2ea) dan perubahan warna permukaan saat hover (*Soft Sage* #e8f1fa).

## Shapes

Form language Karyalo memadukan sudut membulat modern yang ramah dan ergonomis dengan ketegasan struktural:

- **Cards & Outer Containers:** Radius 18px (`--radius-card`) menciptakan siluet kartu dashboard yang modern dan bersahabat.
- **Buttons & Form Inputs:** Radius 8px (`rounded-md` / `rounded-lg`) memberikan ketegasan tactile pada elemen interaktif.
- **Badges & Micro Indicators:** Radius 6px (`rounded-sm` / `rounded-md`) untuk badge status dan tag channel.
- **Pills & Avatars:** Radius 9999px (`rounded-full`) khusus untuk tombol filter tab, role switcher, dan avatar profil.

## Components

### Buttons
- **Shape:** Sudut membulat tegas (8px radius)
- **Primary:** Latar belakang *Brand Royal Blue* (#1e5aa8), teks *Warm White* (#fcfbf7), padding 8px 16px, font-weight 600.
- **Hover / Focus:** Hover beralih ke *Deep Pine* (#1e2f5c), focus ring 2px dengan offset 2px.
- **Secondary / Ghost:** Latar belakang *Warm White*, border 1px (#dce2ea), teks *Body Ink* (#1c2430).

### Chips
- **Style:** Latar belakang *Soft Sand* (#f4f1ea) atau aksen channel transparan 10%, teks semibold 11px.
- **State:** Channel Shopee (#ee4d2d), Web Store (#1e5aa8), POS/Manual (#5b6472).

### Cards / Containers
- **Corner Style:** Radius lembut 18px (`--radius-card`)
- **Background:** *Warm White* (#fcfbf7) di atas kanvas *Soft Sand* (#f4f1ea)
- **Shadow Strategy:** Flat dengan hairline border 1px (#dce2ea) dan ambient shadow halus (0 1px 2px rgba(28,36,48,0.05))
- **Border:** 1px solid #dce2ea
- **Internal Padding:** 16px (mobile) hingga 20px (desktop)

### Inputs / Fields
- **Style:** Latar *Warm White*, border 1px (#dce2ea), radius 8px, padding 10px 14px, teks 14px.
- **Focus:** Outline ring 2px *Brand Royal Blue* (#1e5aa8), border shift to primary.
- **Error / Disabled:** Border *Status Critical* (#b3261e) dengan pesan keterangan di bawah field.

### Navigation
- **Desktop Sidebar:** 264px lebar, latar *Warm White*, item aktif menggunakan latar *Soft Sage* (#e8f1fa) dengan ikon & teks *Brand Royal Blue*.
- **Mobile Bottom Bar:** 56px tinggi, fixed di dasar layar, 5 tab P0 dengan touch target minimal 44px.

### Signature Component
**PIIMaskedField:** Komponen pelindung privasi data pembeli Shopee/Storefront yang menampilkan masking titik pelindung secara default dengan tombol toggle-reveal kondisional berbasis hak akses pengguna.

## Do's and Don'ts

### Do:
- **Do** pertahankan target sentuh minimal 44x44px di seluruh komponen interaktif mobile.
- **Do** gunakan token warna semantik (`var(--color-...)`) dan hindari hardcoded arbitrary color class.
- **Do** tampilkan status *"Data belum tersedia"* atau *"—"* secara transparan bila data belum aktif, bukan angka fiktif 0 atau data palsu.
- **Do** gunakan *PIIMaskedField* untuk menjaga privasi data pelanggan Shopee dan Storefront sesuai UU PDP.
- **Do** berikan transisi interaktif lembut (150ms) dengan menghormati preferensi `motion-reduce`.

### Don't:
- **Don't** gunakan warna hitam murni (#000000) atau bayangan drop shadow gelap yang pekat.
- **Don't** gunakan warna *Accent Cyan* (#2fc1d6) sebagai warna teks biasa di atas latar belakang putih/terang karena kontrasnya tidak memenuhi syarat WCAG AA.
- **Don't** buat form dengan lebih dari satu tombol aksi primer dalam satu viewport yang sama.
- **Don't** sembunyikan informasi status koneksi sinkronisasi API Shopee atau webhook error dari pandangan admin.
