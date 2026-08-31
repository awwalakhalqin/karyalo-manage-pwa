"use client";

import { Check, Shield } from "lucide-react";
import { BASELINE_ROLES, ROLE_LABEL, CAPABILITY_MATRIX, CapabilitySet } from "@/lib/auth/session-context";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

const ROWS: { key: keyof CapabilitySet; label: string; desc: string }[] = [
  { key: "dashboardRead", label: "Lihat Dashboard", desc: "Akses metrik penjualan, grafik, dan ringkasan harian" },
  { key: "cmsWrite", label: "Kelola Storefront CMS", desc: "Edit homepage, banner, halaman statis, dan tema" },
  { key: "catalogWrite", label: "Kelola Produk & Stok", desc: "Input produk baru, update harga, dan penyesuaian stok gudang" },
  { key: "promotionWrite", label: "Kelola Promosi & Voucher", desc: "Buat kupon diskon dan kampanye marketing" },
  { key: "orderRead", label: "Lihat Daftar Pesanan", desc: "Melihat status pesanan Web & Shopee" },
  { key: "orderProcess", label: "Fulfillment & Cetak Resi", desc: "Proses pesanan, packing, dan kirim via kurir" },
  { key: "cancelRefundRequest", label: "Batalkan & Refund Pesanan", desc: "Otorisasi pembatalan atau retur pesanan pelanggan" },
  { key: "customerPii", label: "Akses Data Kontak Pelanggan (PII)", desc: "Melihat nomor telepon dan email tanpa masking" },
  { key: "teamRoleManage", label: "Kelola Tim & Role", desc: "Mengundang staf dan mengatur hak akses akun" },
  { key: "analyticsExport", label: "Ekspor Laporan Keuangan", desc: "Download data penjualan dan analisis bisnis" },
];

/**
 * Matriks Hak Akses Skala UMKM — 3 Role Inti (Owner, Admin Dashboard, Admin Warehouse).
 */
export default function RolesSettingsPage() {
  return (
    <div className="mx-auto max-w-(--container-wide) px-4 py-6 md:px-6 md:py-8">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <Shield size={22} className="text-karyalo-green" aria-hidden="true" />
          <h1 className="text-xl font-bold text-ink md:text-2xl">Hak Akses & Role UMKM</h1>
        </div>
        <p className="mt-1 text-sm text-muted">
          Struktur hak akses ramping disesuaikan untuk operasional toko UMKM (Owner, Admin Toko, dan Staf Gudang).
        </p>
      </div>

      <SampleDataBanner note="Tabel ini mengatur batasan permission secara real-time pada Mode Demo Role Switcher di bilah atas." />

      <div className="overflow-hidden rounded-(--radius-card) border border-border bg-warm-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs">
            <thead className="border-b border-border bg-soft-sand text-muted">
              <tr>
                <th className="w-1/2 px-4 py-3.5 font-semibold text-ink">Fitur & Modul</th>
                {BASELINE_ROLES.map((role) => (
                  <th key={role} className="px-4 py-3.5 text-center font-semibold text-ink">
                    <span className="block text-xs">{ROLE_LABEL[role]}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ROWS.map((row) => (
                <tr key={row.key} className="hover:bg-soft-sand/50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink">{row.label}</p>
                    <p className="text-[11px] text-muted">{row.desc}</p>
                  </td>
                  {BASELINE_ROLES.map((role) => {
                    const hasAccess = CAPABILITY_MATRIX[role][row.key];
                    return (
                      <td key={role} className="px-4 py-3 text-center">
                        {hasAccess ? (
                          <span className="inline-flex size-6 items-center justify-center rounded-full bg-soft-sand text-status-success">
                            <Check size={14} className="stroke-[2.5]" aria-hidden="true" />
                          </span>
                        ) : (
                          <span className="text-border text-sm font-light">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
