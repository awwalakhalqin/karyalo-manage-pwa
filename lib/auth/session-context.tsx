"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Session & Role Management — Disesuaikan untuk Skala UMKM & Brand Lokal.
 *
 * Menyederhanakan 9 role enterprise menjadi 3 Role Inti UMKM:
 * 1. Owner: Pemilik bisnis dengan akses mutlak (Keuangan, Tim, Pengaturan, Integrasi Marketplace).
 * 2. Admin Dashboard: Pengelola harian toko (Order, Produk/Katalog, CMS Storefront, Promosi, Pelanggan).
 * 3. Admin Warehouse: Staf gudang & fulfillment (Pemrosesan packing pesanan, cetak resi, update stok fisik).
 */

export const BASELINE_ROLES = [
  "Owner",
  "AdminDashboard",
  "AdminWarehouse",
] as const;

export type BaselineRole = (typeof BASELINE_ROLES)[number];

export const ROLE_LABEL: Record<BaselineRole, string> = {
  Owner: "Owner / Pemilik Toko",
  AdminDashboard: "Admin Dashboard / Toko",
  AdminWarehouse: "Admin Warehouse / Gudang",
};

/** Kategori capability permission matrix untuk UMKM */
export interface CapabilitySet {
  dashboardRead: boolean;
  cmsWrite: boolean;
  catalogWrite: boolean;
  promotionWrite: boolean;
  orderRead: boolean;
  orderProcess: boolean;
  cancelRefundRequest: boolean;
  customerPii: boolean;
  teamRoleManage: boolean;
  analyticsExport: boolean;
}

export const CAPABILITY_MATRIX: Record<BaselineRole, CapabilitySet> = {
  Owner: {
    dashboardRead: true,
    cmsWrite: true,
    catalogWrite: true,
    promotionWrite: true,
    orderRead: true,
    orderProcess: true,
    cancelRefundRequest: true,
    customerPii: true,
    teamRoleManage: true,
    analyticsExport: true,
  },
  AdminDashboard: {
    dashboardRead: true,
    cmsWrite: true,
    catalogWrite: true,
    promotionWrite: true,
    orderRead: true,
    orderProcess: true,
    cancelRefundRequest: true,
    customerPii: true,
    teamRoleManage: false, // Hanya Owner yang mengelola tim
    analyticsExport: true,
  },
  AdminWarehouse: {
    dashboardRead: true,
    cmsWrite: false, // Tidak mengedit CMS storefront
    catalogWrite: true, // Akses stok inventori & SKU
    promotionWrite: false, // Tidak mengelola promosi
    orderRead: true,
    orderProcess: true, // Packing, fulfillment, input resi
    cancelRefundRequest: false,
    customerPii: false, // Data alamat dicetak di resi, data kontak sensitif di-mask
    teamRoleManage: false,
    analyticsExport: false,
  },
};

interface SessionState {
  role: BaselineRole;
  userName: string;
  storeName: string;
  hydrated: boolean;
}

interface SessionContextValue extends SessionState {
  capabilities: CapabilitySet;
  setRole: (role: BaselineRole) => void;
}

const STORAGE_KEY = "karyalo-manage.session.v2";

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<BaselineRole>("Owner");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { role?: BaselineRole };
        if (parsed.role && BASELINE_ROLES.includes(parsed.role)) {
          setRoleState(parsed.role);
        }
      }
    } catch {
      // localStorage tidak tersedia (private mode)
    }
    setHydrated(true);
  }, []);

  const setRole = useCallback((next: BaselineRole) => {
    setRoleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ role: next }));
    } catch {
      // no-op
    }
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({
      role,
      userName: "Budi Santoso",
      storeName: "Karyalo Store (Demo)",
      hydrated,
      capabilities: CAPABILITY_MATRIX[role],
      setRole,
    }),
    [role, hydrated, setRole]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession harus dipakai di dalam SessionProvider");
  return ctx;
}
