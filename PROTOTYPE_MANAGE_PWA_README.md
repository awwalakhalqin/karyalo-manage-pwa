# Karyalo Manage PWA

Prototype **Karyalo Commerce Admin / CMS**, dibangun 16 Agustus 2026 sesuai
`Karyalo_Commerce_Admin_CMS_PRD_v1.0.md` (candidate PRD-02, status "Development
Baseline" — belum diratifikasi formal sebagai PRD-02 kanonik, lihat
`01_PROJECT_INDEX.md` §17 CONFLICT DETECTED).

## Keputusan 16 Agustus 2026 — dibangun baru dari nol, bukan fork Alina

Sama seperti `Karyalo_Storefront_PWA`, pemilik proyek ditanya (AskUserQuestion)
apakah `Karyalo_Store_Manage/admin_dashboard` (fork Alina yang masih 100%
identitas Alina — belum digeneralisasi sama sekali) mau digeneralisasi
(rebrand) atau dibangun ulang dari nol. **Jawaban: bangun baru dari nol**,
konsisten dengan pendekatan storefront. Project ini (`karyalo-manage-pwa`)
adalah implementasi Next.js/React baru, TIDAK menyalin kode dari
`admin_dashboard` Alina. `Karyalo_Store_Manage/admin_dashboard` tetap ada
sebagai referensi/fallback, bukan jalur aktif — sama posisinya dengan
`Karyalo_Store_Manage/storefront` vs `Karyalo_Storefront_PWA`.

## ⚠️ Catatan penting — belum tervalidasi

Kode ditulis di sandbox tanpa akses ke registry npm — `npm install`/
`npm run build` **belum bisa dijalankan/divalidasi dari sisi saya**. Sudah
dicek manual: kurung `{}`/`()` seimbang di semua file, dan setiap import
`@/...` mengarah ke file yang benar-benar ada (dicek terprogram). Ini bukan
pengganti compile sungguhan — pemilik proyek perlu `npm install` &
`npm run dev` sendiri dan melaporkan error bila ada.

## Cara menjalankan

```
cd karyalo-manage-pwa
npm install
npm run dev
```

Jalan di **port 3001** (bukan 3000) supaya bisa dijalankan bersamaan dengan
`karyalo-storefront-pwa` (port 3000) tanpa bentrok — keduanya independen,
tidak saling import kode.

## Apa yang sudah dibangun (Fase 1 — Foundation, sesuai PRD §36)

Mengikuti persis lingkup Fase 1 di PRD: *"Admin shell, auth/session,
tenant/store switcher. Responsive navigation, route guards, error boundary.
API client/adapters... PWA manifest/service worker/offline banner/update
flow."* — **bukan** fitur CMS/Catalog/OMS/dst. sungguhan (itu Fase 2-7).

- **Admin shell responsif** — `TopBar` (logo, global search, notification
  bell, tenant/store switcher, akun) + `DesktopSideNavigation` (sidebar
  penuh sesuai §8.1 Global IA, desktop ≥ md) + `MobileBottomNavigation`
  (5 item P0 sesuai §8.2: Home/Orders/Products/Storefront/Menu).
- **Session & role mock** (`lib/auth/session-context.tsx`) — belum ada
  autentikasi sungguhan (`/login` visual-only, sama pola dengan storefront),
  TAPI ada **"Mode Demo" role switcher** fungsional di top bar (dropdown 9
  baseline role dari PRD §7.2) yang benar-benar mengubah nav/quick-action
  yang tampil, memakai capability matrix yang disalin literal dari **PRD
  §20.2 Baseline Matrix** (SOURCE-DERIVED — lihat komentar di
  `session-context.tsx` untuk detail penyederhanaan "policy"/"optional"/
  "limited" jadi boolean). Ini fitur tambahan di luar scope minimal Fase 1,
  supaya perilaku permission-gating (§20) benar-benar bisa ditinjau, bukan
  cuma dideskripsikan. **UI hiding bukan security boundary** (§20.3) — kalau
  backend sungguhan datang, otorisasi WAJIB divalidasi ulang di server.
- **Route guards visual** — `PermissionGate` menyembunyikan item nav/quick
  action sesuai capability role aktif.
- **Dashboard (`/`) sungguhan, bukan stub** — §10 Today Summary (10 kartu
  P0), Action Required, Quick Actions diimplementasi nyata, TAPI semua
  metrik menampilkan status **"Data belum tersedia"**, bukan angka contoh —
  §10.4 Dashboard Rules eksplisit "Jangan menampilkan 0 jika data gagal,
  gunakan unavailable/error state", dan §37 Coding Rule 21 melarang keras
  fake order/stock/sales data. Fase 1 tidak punya Admin BFF/OMS/Catalog/CMS
  read model sama sekali, jadi kondisi "belum tersedia" ini jujur, bukan
  bug.
- **34 rute lain terdaftar sesuai §38 Suggested Routes + §8.1 IA** sebagai
  `RouteStub` berlabel fase (Fase 2-7) dan deskripsi singkat dari PRD —
  bukan halaman kosong tanpa konteks.
- **Global search** — input & navigasi ke `/search?q=...` sudah jalan;
  halaman hasilnya jujur bilang index pencarian belum ada (Fase 3-5).
- **`/menu`** — halaman nyata (bukan stub) untuk item ke-5 bottom nav
  mobile, berisi navigasi ke Marketing/Customers/Analytics/Notifications/
  Settings (§8.2).
- **Connectivity banner** — mendeteksi `navigator.onLine`, tampil saat
  offline (§9.1, §27.4 "no silent critical sync").
- **PWA baseline** — manifest, service worker (pola identik dengan
  storefront: SW hanya aktif di production, disabled+dibersihkan otomatis
  di dev supaya tidak mengulang bug refresh-loop yang pernah terjadi di
  storefront), halaman `/offline`, ikon & logo asli (disalin dari
  `Karyalo_Storefront_PWA/public`, brand yang sama).
- **Error boundary** — `app/error.tsx` (per-halaman) dan
  `app/global-error.tsx` (root layout).
- **Design tokens** — token warna/font IDENTIK dengan
  `Karyalo_Storefront_PWA` (`app/globals.css`), demi konsistensi visual
  lintas produk (§5 Product Principles G-05 "Unified experience"). Dua
  tambahan token baru khusus admin: status severity (`status-critical/
  warning/info/success`, dibutuhkan Action Required §10.2 yang tidak ada
  padanannya di storefront) dan `--container-wide` (1440px, untuk layar
  dashboard/tabel yang butuh lebih lebar dari container storefront
  1240px) — keduanya **INFERENCE**, bukan dari Design System sumber yang
  tidak membahas admin secara spesifik.

## Keputusan yang diambil untuk membuat progres (dicatat, bukan spesifikasi PRD)

- **Tidak memakai prefix `/admin` literal.** §38 Suggested Routes PRD
  memakai path `/admin/orders`, dst. — kemungkinan diasumsikan mount di
  bawah domain yang sama dengan storefront. Karena project ini adalah app
  Next.js standalone terpisah (port sendiri), prefix `/admin` diulang di
  dalam app yang sudah "admin" akan janggal (`/admin/admin/orders` kalau
  di-reverse-proxy). Rute dipetakan tanpa prefix (`/orders`, dst.) — PRD
  sendiri mengizinkan ini ("Route exact boleh mengikuti framework").
  Kalau nanti storefront+admin digabung di satu domain via reverse proxy/
  path routing, prefix bisa ditambahkan di layer infra, bukan di kode app.
- Rute `/products/inventory`, `/storefront` (ringkasan), `/marketing`
  (ringkasan) ditambahkan dari §8.1 Global IA meski tidak eksplisit di
  daftar §38 — supaya struktur nav (yang punya parent+children) tidak
  mengarah ke link mati.
- `/login` dibuat visual-only (submit langsung masuk, tanpa validasi)
  sama persis pola `Karyalo_Storefront_PWA/app/login` — autentikasi
  sungguhan tetap Fase 6+ / Admin BFF, di luar scope Fase 1.
- Sidebar desktop TIDAK collapsible ke ikon-saja pada Fase 1 (§8.3 hanya
  bilang "collapsible", tidak wajib P0) — simplifikasi, dicatat sebagai
  potensi peningkatan P1.

## Update 16 Agustus 2026 (lanjutan) — semua rute jadi halaman fungsional dengan data contoh

Atas permintaan pemilik proyek ("iya mock dulu kayak yg storefront"), seluruh
rute yang sebelumnya `RouteStub` sekarang halaman fungsional berbasis data
contoh (bukan lagi placeholder) — pola sama seperti update serupa di
`Karyalo_Storefront_PWA`. **`RouteStub.tsx` sendiri sekarang tidak dipakai di
manapun** (tidak dihapus, tidak mengganggu).

**Perbedaan penting dari pendekatan storefront — PRD Admin ini punya §37
Coding Rule 21: "Tidak boleh ada fake order, stock, sales, countdown, atau
notification production data."** Ini lebih ketat dari storefront (yang tidak
punya aturan setara). Cara mematuhinya:

- **Setiap halaman yang memakai data contoh memasang `SampleDataBanner`** —
  penanda visual permanen "Data contoh (demo)", bukan cuma di komentar kode.
  Dasar hukumnya §37 Coding Rule 4: "isolated typed fake adapter hanya untuk
  development/tests" — data ini ditandai jelas, bukan dipoles seolah nyata.
- **Dashboard (`/`) dan Analytics (`/analytics`) SENGAJA TIDAK diberi angka
  contoh sama sekali** — keduanya tetap menampilkan status kosong/"belum
  tersedia" seperti sebelumnya. Rule 21 secara eksplisit menyebut sales/
  order/stock/notification — dua halaman ini adalah tempat metrik agregat
  semacam itu paling mungkin disalahartikan sebagai data bisnis sungguhan,
  jadi keduanya diperlakukan lebih ketat daripada modul lain (Orders,
  Products, dst. menampilkan data contoh individual seperti daftar order/
  produk, yang risikonya lebih rendah karena jelas berupa record, bukan
  klaim performa toko).
- Command bar order (`OrderCommandBar`) dan form produk
  (`ProductEditorForm`) TIDAK PERNAH menampilkan "berhasil" saat submit —
  §37 Coding Rule 9 mewajibkan mutation kritis punya idempotency key +
  state pending/success/error sungguhan, yang belum ada infrastrukturnya.
  Tombol memicu catatan "aksi ini disimulasikan", bukan pura-pura berhasil.

**Data contoh yang dipakai** (`lib/data/*.ts`, semua fungsi `async`): 18
produk katalog (nama/SKU/harga IDENTIK dengan `Karyalo_Storefront_PWA` —
dua prototype ini mensimulasikan toko yang sama), 5 kategori, 4 koleksi, 11
order lintas status, 6 promosi + 2 kampanye, 6 pelanggan (PII sudah
di-mask di level data, bukan cuma UI), 8 section homepage + 3 banner + 5
halaman CMS + navigation tree + 5 aset media, 5 notifikasi, 5 anggota tim,
5 entri audit log.

**Modul yang kini fungsional (baca-saja, mutation disimulasikan):**
Orders (list + 4 filter view + detail dengan timeline fulfillment §15 +
command bar), Products (list + kategori + koleksi + ringkasan inventori +
form tambah/edit produk), Storefront CMS (ringkasan + homepage section
list + banner + halaman CMS + editor halaman + navigation tree + media
library + tema (menampilkan token Design System §11 aktif) + SEO form +
**preview iframe sungguhan ke `localhost:3000`**, hanya berfungsi kalau
`karyalo-storefront-pwa` juga sedang `npm run dev`), Marketing (promosi +
detail + kampanye), Customers (list + profil dengan `PIIMaskedField`
fungsional berbasis permission `customerPii`), Notifications (inbox), dan
Settings (toko, pengiriman, pembayaran — TANPA field kredensial sama
sekali sesuai §5 Non-Goals, notifikasi, tim, **Role & Permission — tabel
yang sama persis dipakai role switcher "Mode Demo"**, audit log,
integrations — status dikutip dari `04_PROJECT_CHANGELOG.md`, bukan
tebakan).

## Update 16 Agustus 2026 (lanjutan lagi) — push notification order baru SUNGGUHAN

Dipicu pertanyaan pemilik proyek: *"kalau ada pemesanan di storefront,
apakah Manage dapat push notifikasi? admin tidak mungkin 24 jam standby."*
Jawabannya sekarang **iya, dan ini sudah nyata** — bukan simulasi seperti
modul lain di prototype ini:

- **`/settings/notifications`** punya kontrol baru (`PushSubscribeButton`)
  di bagian paling atas — klik "Aktifkan Notifikasi" memicu izin browser
  native (PRD §16.5: tidak diminta saat first paint, baru saat user klik
  eksplisit), lalu device terdaftar ke Web Push lewat Convex.
- Saat ada order baru dari checkout `Karyalo_Storefront_PWA` (lihat update
  terbaru README storefront), backend Convex **yang sama** (bukan backend
  Manage terpisah — lihat catatan arsitektur di bawah) mengirim Web Push
  ke semua admin yang subscribe. Notifikasi muncul walau app Manage
  tertutup total (selama SW pernah teregistrasi — di Android/desktop
  Chrome ini otomatis; **di iPhone/iPad WAJIB sudah "Add to Home Screen"
  dulu, iOS 16.4+**, tidak jalan dari tab Safari biasa).
- Tap notifikasi membuka `/orders/live/[orderId]` — halaman BARU yang
  membaca order ASLI langsung dari Convex (ditandai `LiveDataBanner`,
  kebalikan `SampleDataBanner`), bukan data contoh dari `lib/data/orders.ts`.
  Sengaja halaman terpisah/minimal, BUKAN seluruh modul Orders yang
  disambungkan Convex — lihat alasan lengkap di komentar file itu.
- Ada tombol "Kirim Tes Notifikasi" untuk verifikasi setup tanpa perlu
  checkout sungguhan dulu — payload-nya jelas berlabel "tes", bukan
  berpura-pura jadi order asli (§37 Coding Rule 21 tetap dipatuhi).

**Setup WAJIB sebelum fitur ini aktif** (tidak otomatis jalan hanya
dengan `npm install`): isi `.env.local` (salin dari `.env.local.example`)
dengan `NEXT_PUBLIC_CONVEX_URL` yang SAMA dengan punya storefront, dan
`NEXT_PUBLIC_VAPID_PUBLIC_KEY`. Langkah lengkap (generate VAPID key, set
Convex env, dst.) ada di `CONVEX_SETUP.md` folder `Karyalo_Storefront_PWA`
bagian "Setup Web Push" — WAJIB dibaca di sana, bukan diulang di sini
supaya tidak ada dua sumber kebenaran yang bisa beda.

**Catatan arsitektur penting — BACA supaya tidak salah paham:**
`karyalo-manage-pwa` MASIH TIDAK punya backend Convex sendiri. Fitur ini
sengaja disambungkan ke deployment Convex milik storefront (satu-satunya
backend yang sudah ada), karena trigger-nya (order baru) memang hidup di
sana. Ini keputusan implementasi untuk membuat satu fitur konkret jalan
cepat, **BUKAN** keputusan final "Manage pakai backend storefront" — begitu
arsitektur backend Manage sesungguhnya didiskusikan (Admin BFF + owning
service per domain sesuai PRD §1/§23), tabel `orders`/`pushSubscriptions`
kemungkinan besar dipindah/dibentuk ulang.

## Yang TIDAK ada di prototype ini (sengaja)

- Backend Convex/Admin BFF milik Manage sendiri — **masih belum dibuat**.
  Satu-satunya koneksi backend yang ada (push notification order baru,
  lihat update di atas) sengaja numpang ke backend storefront, bukan
  backend Manage yang sesungguhnya. Semua "data contoh" modul LAIN (Orders
  list, Products, CMS, dst.) TETAP array statis di `lib/data/*.ts`, BUKAN
  dibaca dari database apa pun. Arsitektur backend Manage yang
  sesungguhnya perlu didiskusikan terpisah sebelum dibangun — PRD ini
  menyiratkan banyak owning service terpisah (CMS/Catalog/Promotion/OMS/
  Inventory/CRM/Notification/Analytics), bukan satu backend monolitik
  seperti storefront.
- Mutation sungguhan lain — proses order, simpan produk, publish CMS,
  buat promosi, undang anggota tim, semuanya masih visual/simulasi. Push
  notification order baru (lihat update di atas) adalah SATU-SATUNYA
  bagian prototype ini yang sudah tersambung backend sungguhan.
- Autentikasi sungguhan, multi-tenant isolation sungguhan (§22 — baru
  relevan begitu ada >1 tenant).
- In-app Notification Center yang durable (§16.2 — daftar riwayat semua
  notifikasi tersimpan di database) — push OS sudah jalan, tapi belum
  tercatat sebagai baris di `/notifications`, itu masih data contoh.
- Rich text editor sungguhan untuk halaman CMS (§37 Coding Rule 13
  sanitasi konten — belum relevan tanpa editor sungguhan).
- Angka Dashboard dan Analytics — tetap "belum tersedia", lihat penjelasan
  rule 21 di atas.
- `npm install`/build belum divalidasi dari sisi saya (sandbox tanpa akses
  npm registry, sama seperti sebelumnya) — TERMASUK alur push notification
  di atas (subscribe → checkout → notifikasi muncul), itu baru teori
  sampai dicoba langsung.

## Rencana berikutnya

(a) Pemilik proyek `npm install` ulang (dependency `convex` sudah ada
sejak Fase 1, tidak ada dependency baru di sisi Manage) + isi
`.env.local` sesuai `CONVEX_SETUP.md` + coba alur push notification
end-to-end (subscribe di `/settings/notifications` → checkout produk apa
pun di storefront → cek notifikasi muncul), laporkan errornya kalau ada.
(b) Diskusi arsitektur backend Manage sesungguhnya (Admin BFF + berapa
banyak service terpisah, atau pendekatan lebih sederhana untuk prototype)
— push notification di atas SENGAJA numpang backend storefront sementara,
bukan preseden bahwa Manage akan selalu begitu.
