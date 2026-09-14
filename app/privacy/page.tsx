import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft size={13} aria-hidden="true" />
          <span>Kembali ke Dashboard</span>
        </Link>
      </div>

      {/* Header */}
      <header className="mb-8 border-b border-border/70 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-deep-pine md:text-3xl">
          Kebijakan Privasi
        </h1>
        <p className="mt-1.5 text-xs text-muted">
          Terakhir diperbarui: 31 Agustus 2026 • Berlaku untuk Platform Karyalo Commerce & Integrasi API Marketplace.
        </p>
      </header>

      {/* Konten Kebijakan */}
      <div className="flex flex-col gap-7 text-sm leading-relaxed text-ink">
        {/* Section 1 */}
        <section>
          <h2 className="text-base font-bold text-deep-pine mb-2">1. Komitmen Perlindungan Data</h2>
          <p className="text-muted leading-relaxed">
            Karyalo Manage berkomitmen melindungi privasi pengguna, merchant, dan pembeli sesuai dengan{" "}
            <strong className="text-ink">Undang-Undang No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP)</strong>{" "}
            serta ketentuan perlindungan data pada Shopee Open Platform.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-base font-bold text-deep-pine mb-2">2. Data yang Dikumpulkan Melalui API</h2>
          <p className="text-muted leading-relaxed mb-3">
            Saat toko terhubung dengan Shopee Open Platform API atau Storefront Karyalo, sistem memproses data untuk keperluan operasional pemenuhan pesanan:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-muted">
            <li>
              <strong className="text-ink">Data Pesanan:</strong> Nomor pesanan, rincian SKU varian produk, jumlah item, dan total pembayaran.
            </li>
            <li>
              <strong className="text-ink">Data Pembeli (PII):</strong> Nama penerima, alamat pengiriman, dan nomor telepon yang disamarkan (di-masking) secara otomatis pada antarmuka pengguna.
            </li>
          </ul>
        </section>

        {/* Section 3: Shopee OpenAPI (Explicit Clause) */}
        <section className="rounded-xl border border-border/80 bg-soft-sand/30 p-5">
          <h2 className="text-base font-bold text-deep-pine mb-2">
            3. Integrasi Marketplace Pihak Ketiga (Shopee Open Platform)
          </h2>
          <p className="text-muted leading-relaxed mb-3">
            Untuk sinkronisasi pesanan, stok, dan logistik pengiriman melalui Shopee OpenAPI v2:
          </p>
          <div className="space-y-2.5 text-xs text-muted leading-relaxed">
            <p>
              • <strong className="text-ink">Enkripsi Token (AES-256):</strong> Token otorisasi seller disimpan menggunakan enkripsi standar industri <strong>AES-256</strong> (<em>encryption at rest</em>) pada database yang terisolasi dan tidak pernah disimpan dalam bentuk teks biasa.
            </p>
            <p>
              • <strong className="text-ink">Larangan Jual-Beli Data:</strong> KaryaLo tidak memperjualbelikan, menyewakan, atau membagikan data toko, transaksi, maupun data pribadi pembeli kepada pihak manapun untuk tujuan komersial atau periklanan.
            </p>
            <p>
              • <strong className="text-ink">Kendali Pemutusan Akses:</strong> Seller memiliki hak penuh untuk memutus integrasi (<em>disconnect / revoke token</em>) kapan saja melalui menu pengaturan Karyalo maupun langsung melalui <strong>Shopee Seller Centre</strong>. Saat diputus, akses token dibatalkan seketika.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-base font-bold text-deep-pine mb-2">4. Tujuan Penggunaan Data</h2>
          <p className="text-muted leading-relaxed mb-2">
            Data dari Shopee OpenAPI (v2.order, v2.product, v2.logistics) hanya digunakan untuk:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-muted">
            <li>Memproses dan memperbarui status pesanan toko secara real-time.</li>
            <li>Sinkronisasi pemotongan stok otomatis guna mencegah stok kosong (out-of-stock).</li>
            <li>Menerbitkan nomor resi kurir dan pencetakan label pengiriman.</li>
            <li>Menampilkan rekapitulasi analitik penjualan internal merchant.</li>
          </ol>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-base font-bold text-deep-pine mb-2">5. Standar Keamanan & Enkripsi</h2>
          <p className="text-muted leading-relaxed">
            Seluruh komunikasi data API dan webhook menggunakan protokol <strong>TLS 1.3 / HTTPS</strong> dengan verifikasi tanda tangan <strong>HMAC-SHA256</strong>. Akses internal dibatasi berdasarkan peran (Role-Based Access Control) dengan pencatatan audit log berkala.
          </p>
        </section>

        {/* Section 6 */}
        <section className="border-t border-border/70 pt-5">
          <h2 className="text-base font-bold text-deep-pine mb-2">6. Kontak & Permintaan Hapus Data</h2>
          <p className="text-muted leading-relaxed">
            Untuk permintaan penghapusan data atau pertanyaan terkait kepatuhan privasi, merchant dapat menghubungi tim kami di{" "}
            <a href="mailto:privacy@karyalo.com" className="text-karyalo-green font-medium hover:underline">
              privacy@karyalo.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
