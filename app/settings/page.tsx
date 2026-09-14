"use client";

import Link from "next/link";
import {
  Settings as SettingsIcon,
  User,
  Store,
  Truck,
  CreditCard,
  Bell,
  Users,
  Shield,
  FileText,
  Plug,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useSession, CapabilitySet } from "@/lib/auth/session-context";

interface SettingModule {
  href: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  restrictedToOwner?: boolean;
  capability?: keyof CapabilitySet;
  category: "Akun & Profil" | "Operasional Toko" | "Tim & Keamanan" | "Sistem & Integrasi";
}

const ALL_SETTINGS: SettingModule[] = [
  {
    href: "/settings/profile",
    title: "Profil Akun",
    subtitle: "Data penanggung jawab & kontak",
    icon: User,
    category: "Akun & Profil",
  },
  {
    href: "/settings/store",
    title: "Informasi Toko",
    subtitle: "Nama toko, mata uang, zona waktu",
    icon: Store,
    category: "Operasional Toko",
  },
  {
    href: "/settings/shipping",
    title: "Jasa Kirim & Ekspedisi",
    subtitle: "Kurir SPX, J&T, SiCepat & tarif",
    icon: Truck,
    category: "Operasional Toko",
  },
  {
    href: "/settings/notifications",
    title: "Notifikasi Otomatis",
    subtitle: "Pesanan baru, stok menipis & alerts",
    icon: Bell,
    category: "Operasional Toko",
  },
  {
    href: "/settings/team",
    title: "Tim & Staf",
    subtitle: "Daftar staf aktif & wewenang",
    icon: Users,
    restrictedToOwner: true,
    capability: "teamRoleManage",
    category: "Tim & Keamanan",
  },
  {
    href: "/settings/roles",
    title: "Role & Izin Akses",
    subtitle: "Matriks hak akses operasional",
    icon: Shield,
    restrictedToOwner: true,
    capability: "teamRoleManage",
    category: "Tim & Keamanan",
  },
  {
    href: "/settings/payments",
    title: "Rekening Pembayaran",
    subtitle: "Pencairan dana & gateway",
    icon: CreditCard,
    restrictedToOwner: true,
    capability: "teamRoleManage",
    category: "Tim & Keamanan",
  },
  {
    href: "/settings/integrations",
    title: "Integrasi Shopee & Sistem",
    subtitle: "Koneksi Shopee OpenAPI & webhook",
    icon: Plug,
    restrictedToOwner: true,
    capability: "teamRoleManage",
    category: "Sistem & Integrasi",
  },
  {
    href: "/settings/audit-log",
    title: "Audit Log Aktivitas",
    subtitle: "Riwayat perubahan data toko",
    icon: FileText,
    category: "Sistem & Integrasi",
  },
];

export default function SettingsHubPage() {
  const { userName, userEmail, role, storeName, capabilities } = useSession();

  const visibleSettings = ALL_SETTINGS.filter(
    (item) => !item.capability || (capabilities && capabilities[item.capability])
  );

  const categories: ("Akun & Profil" | "Operasional Toko" | "Tim & Keamanan" | "Sistem & Integrasi")[] = [
    "Akun & Profil",
    "Operasional Toko",
    "Tim & Keamanan",
    "Sistem & Integrasi",
  ];

  return (
    <div className="mx-auto max-w-(--container-content) px-3.5 py-5 pb-24 sm:px-6 sm:py-8 sm:pb-12">
      {/* Header Pengaturan */}
      <div className="mb-6 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <SettingsIcon size={22} className="text-karyalo-green" aria-hidden="true" />
          <h1 className="text-xl font-bold text-ink sm:text-2xl">Pusat Pengaturan</h1>
        </div>
        <p className="text-xs text-muted">Kelola akun, konfigurasi toko, wewenang tim, dan integrasi marketplace.</p>
      </div>

      {/* Kartu Profil Ringkas Pengguna */}
      <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-border bg-warm-white p-4 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-soft-sand text-sm font-bold text-deep-pine border border-border">
            {role === "Owner" ? "👑" : role === "AdminDashboard" ? "💻" : "📦"}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-bold text-ink">{userName}</span>
              <span className="rounded-md bg-soft-sand px-2 py-0.5 text-[11px] font-semibold text-deep-pine">
                {role}
              </span>
            </div>
            <p className="truncate text-xs text-muted font-mono">{userEmail} • {storeName}</p>
          </div>
        </div>

        <Link
          href="/settings/profile"
          className="shrink-0 self-start rounded-xl border border-border bg-soft-sand px-3 py-1.5 text-xs font-semibold text-ink hover:bg-soft-sage hover:border-karyalo-green transition-colors sm:self-auto"
        >
          Lihat Profil
        </Link>
      </div>

      {/* Grid Pengaturan Berdasarkan Kategori */}
      <div className="flex flex-col gap-6">
        {categories.map((cat) => {
          const items = visibleSettings.filter((s) => s.category === cat);
          if (items.length === 0) return null;

          return (
            <section key={cat} aria-label={cat} className="flex flex-col gap-2.5">
              <h2 className="px-1 text-[11px] font-bold uppercase tracking-wider text-muted/70">
                {cat}
              </h2>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-center justify-between rounded-xl border border-border bg-warm-white p-3.5 shadow-2xs hover:border-karyalo-green hover:shadow-xs transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-soft-sand text-deep-pine group-hover:bg-soft-sage group-hover:text-karyalo-green transition-colors">
                          <Icon size={16} aria-hidden="true" />
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="truncate text-xs font-bold text-ink group-hover:text-karyalo-green transition-colors">
                            {item.title}
                          </span>
                          <span className="truncate text-[11px] text-muted">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>

                      <ChevronRight size={15} className="shrink-0 text-muted/60 group-hover:text-karyalo-green group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
