import Link from "next/link";
import { getTeamMembers } from "@/lib/data/team";
import { ROLE_LABEL, BaselineRole, CAPABILITY_MATRIX } from "@/lib/auth/session-context";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";
import { PermissionGate } from "@/components/system/PermissionGate";
import { Shield, Check, X, Users, ArrowRight, UserCheck, ShieldCheck, Mail } from "lucide-react";

/**
 * Tanggung jawab dan izin ringkas per role staf
 */
const ROLE_PERMISSIONS: Record<
  BaselineRole,
  {
    icon: string;
    description: string;
    allowed: string[];
    restricted: string[];
  }
> = {
  Owner: {
    icon: "👑",
    description: "Pemilik bisnis dengan wewenang mutlak atas seluruh operasional, tim, dan finansial.",
    allowed: [
      "Akses penuh ke seluruh 9 modul toko",
      "Kelola tim staf & ubah wewenang role",
      "Pengaturan rekening bank & pembayaran",
      "Integrasi Shopee OpenAPI v2 Hub",
      "Ekspor laporan omzet & analitik bisnis",
    ],
    restricted: [],
  },
  AdminDashboard: {
    icon: "💻",
    description: "Pengelola operasional toko harian, pemasaran, dan katalog produk.",
    allowed: [
      "Manajemen pesanan Webstore & Shopee (OMS)",
      "Kelola katalog produk, varian & harga",
      "Kustomisasi tampilan Storefront CMS & tema",
      "Buat kupon diskon & kampanye promosi",
      "Database pelanggan & pelacakan order",
    ],
    restricted: [
      "Tidak dapat menambah / menghapus akun staf",
      "Tidak dapat mengubah rekening penarikan dana",
    ],
  },
  AdminWarehouse: {
    icon: "📦",
    description: "Staf logistik & gudang yang fokus pada pemrosesan packing dan stok fisik.",
    allowed: [
      "Pemrosesan pesanan & antrean packing",
      "Input & cetak label resi ekspedisi (SPX, J&T)",
      "Pembaruan stok fisik gudang & SKU",
      "Akses daftar pesanan siap kirim",
    ],
    restricted: [
      "Dibatasi dari CMS Storefront & tema web",
      "Dibatasi dari pembuatan promo & voucher",
      "Data kontak sensitif pelanggan (PII) disamarkan",
      "Dibatasi dari pengaturan tim staf & keuangan",
    ],
  },
};

export default async function TeamSettingsPage() {
  const members = await getTeamMembers();

  return (
    <div className="mx-auto max-w-(--container-content) px-3.5 py-5 sm:px-6 sm:py-8">
      {/* Header Halaman */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Users size={22} className="text-karyalo-green" aria-hidden="true" />
            <h1 className="text-lg font-bold text-ink sm:text-2xl">Tim & Hak Akses Staf</h1>
          </div>
          <p className="mt-0.5 text-xs text-muted sm:text-sm">
            Daftar staf aktif dan rincian izin akses operasional toko per individu.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/settings/roles"
            className="tap-target inline-flex items-center gap-1.5 rounded-xl border border-border bg-soft-sand px-3 py-2 text-xs font-semibold text-ink hover:bg-soft-sage hover:border-karyalo-green transition-colors"
          >
            <Shield size={14} aria-hidden="true" />
            <span>Matriks Role</span>
          </Link>

          <PermissionGate capability="teamRoleManage">
            <button className="tap-target rounded-xl bg-karyalo-green px-3.5 py-2 text-xs font-semibold text-warm-white hover:opacity-90 transition-colors shadow-2xs">
              + Undang Staf Baru
            </button>
          </PermissionGate>
        </div>
      </div>

      <PermissionGate
        capability="teamRoleManage"
        showDenied
        deniedMessage="Hanya Owner / Pemilik Toko yang memiliki wewenang untuk mengundang anggota tim baru atau mengubah peran staf."
      >
        <></>
      </PermissionGate>

      <div className="my-4">
        <SampleDataBanner />
      </div>

      {/* Rincian Hak Akses Tiap User — Tampilan Kartu Komprehensif */}
      <div className="flex flex-col gap-4">
        {members.map((m) => {
          const perm = ROLE_PERMISSIONS[m.role];

          return (
            <div
              key={m.id}
              className="flex flex-col rounded-2xl border border-border bg-warm-white p-4 shadow-2xs transition-all hover:border-karyalo-green/30 sm:p-5"
            >
              {/* Info Profil User & Badge Role */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between border-b border-border/70 pb-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-soft-sand text-deep-pine font-bold text-base border border-border">
                    {perm.icon}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-bold text-ink sm:text-base">{m.name}</h2>
                      <span className="inline-flex items-center gap-1 rounded-md bg-soft-sage px-2 py-0.5 text-xs font-bold text-deep-pine">
                        {ROLE_LABEL[m.role]}
                      </span>
                      <span className="inline-flex items-center rounded-md bg-soft-sand px-2 py-0.5 text-xs font-medium text-status-success">
                        <span className="mr-1 size-1.5 rounded-full bg-status-success" />
                        {m.status === "active" ? "Aktif" : "Diundang"}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                      <Mail size={12} className="text-muted" aria-hidden="true" />
                      <span>{m.maskedEmail}</span>
                    </div>

                    <p className="mt-1.5 text-xs text-muted leading-relaxed max-w-xl">
                      {perm.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 self-start sm:self-auto">
                  <span className="text-xs font-mono text-muted bg-soft-sand/80 px-2.5 py-1 rounded-lg border border-border">
                    ID: {m.id}
                  </span>
                </div>
              </div>

              {/* Rincian Hak Akses & Fitur yang Diizinkan / Dibatasi */}
              <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {/* Fitur Diizinkan */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-status-success flex items-center gap-1">
                    <Check size={14} className="stroke-[3]" aria-hidden="true" />
                    <span>Fitur & Tindakan yang Diizinkan:</span>
                  </span>
                  <ul className="flex flex-col gap-1 pl-1 text-xs text-ink">
                    {perm.allowed.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check size={12} className="text-status-success shrink-0 stroke-[3] mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fitur Dibatasi */}
                {perm.restricted.length > 0 ? (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-status-warning flex items-center gap-1">
                      <X size={14} className="stroke-[2.5]" aria-hidden="true" />
                      <span>Batasan Akses untuk Pengguna Ini:</span>
                    </span>
                    <ul className="flex flex-col gap-1 pl-1 text-xs text-muted">
                      {perm.restricted.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <X size={12} className="text-status-warning shrink-0 stroke-[2.5] mt-0.5" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-deep-pine flex items-center gap-1">
                      <ShieldCheck size={14} aria-hidden="true" />
                      <span>Status Otorisasi:</span>
                    </span>
                    <p className="text-xs text-muted leading-relaxed">
                      Pengguna ini memiliki hak akses administratif mutlak (*Super Admin / Owner*) tanpa batasan fitur di seluruh sistem.
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
