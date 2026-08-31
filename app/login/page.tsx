"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowRight, Lock, Mail, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useSession, BaselineRole } from "@/lib/auth/session-context";

/**
 * Daftar Akun Uji Coba Terverifikasi
 */
const VALID_ACCOUNTS: {
  emails: string[];
  passwords: string[];
  role: BaselineRole;
  displayName: string;
}[] = [
  {
    emails: [
      "shopee.reviewer@karyalo.com",
      "shopee.reviewer@karyalo.id",
      "shopee.reviewer",
      "reviewer@karyalo.com",
    ],
    passwords: ["ShopeeKaryalo2026!"],
    role: "Owner",
    displayName: "Shopee Reviewer (Owner)",
  },
  {
    emails: ["budi@karyalo.com", "budi@karyalo.id", "budi.santoso@karyalo.com", "owner@karyalo.com"],
    passwords: ["Owner123!", "ShopeeKaryalo2026!"],
    role: "Owner",
    displayName: "Budi Santoso (Owner)",
  },
  {
    emails: ["admin@karyalo.com", "admin@karyalo.id", "siti@karyalo.com", "siti.admin@karyalo.com"],
    passwords: ["Admin123!", "ShopeeKaryalo2026!"],
    role: "AdminDashboard",
    displayName: "Siti Admin (Admin Toko)",
  },
  {
    emails: ["gudang@karyalo.com", "gudang@karyalo.id", "joko@karyalo.com", "joko.gudang@karyalo.com"],
    passwords: ["Gudang123!", "ShopeeKaryalo2026!"],
    role: "AdminWarehouse",
    displayName: "Joko Gudang (Gudang)",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useSession();
  const [email, setEmail] = useState("shopee.reviewer@karyalo.com");
  const [password, setPassword] = useState("ShopeeKaryalo2026!");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Validasi kredensial
    const matchedAccount = VALID_ACCOUNTS.find(
      (acc) =>
        acc.emails.some((em) => em.toLowerCase() === cleanEmail) &&
        acc.passwords.includes(cleanPassword)
    );

    if (!matchedAccount) {
      setTimeout(() => {
        setIsLoading(false);
        setErrorMessage(
          "Email / username atau kata sandi salah. Silakan periksa kembali atau gunakan akun uji coba Shopee Partner yang tertera pada banner di atas."
        );
      }, 350);
      return;
    }

    // Kredensial valid -> catat login
    login(matchedAccount.role, email.trim());
    setTimeout(() => {
      router.push("/");
    }, 300);
  };

  const handleQuickLogin = (roleName: BaselineRole) => {
    setErrorMessage(null);
    setIsLoading(true);

    if (roleName === "Owner") {
      setEmail("shopee.reviewer@karyalo.com");
      setPassword("ShopeeKaryalo2026!");
      login("Owner", "shopee.reviewer@karyalo.com");
    } else if (roleName === "AdminDashboard") {
      setEmail("admin@karyalo.com");
      setPassword("Admin123!");
      login("AdminDashboard", "admin@karyalo.com");
    } else {
      setEmail("gudang@karyalo.com");
      setPassword("Gudang123!");
      login("AdminWarehouse", "gudang@karyalo.com");
    }

    setTimeout(() => {
      router.push("/");
    }, 250);
  };

  return (
    <div className="mx-auto flex min-h-[85vh] max-w-md flex-col items-center justify-center gap-6 px-4 py-12">
      <div className="flex flex-col items-center text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-warm-white p-2 shadow-xs border border-border">
          <Image src="/logo.png" alt="Karyalo" width={36} height={36} className="rounded-md" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-ink">Masuk ke Karyalo Manage</h1>
        <p className="mt-1 text-xs text-muted">
          Platform Operasional Toko & Integrasi Shopee OpenAPI v2
        </p>
      </div>

      {/* Shopee Reviewer Test Account Banner */}
      <div className="w-full rounded-2xl border border-[#ee4d2d]/30 bg-[#ee4d2d]/10 p-4 text-xs text-[#ee4d2d] shadow-2xs">
        <div className="flex items-center gap-2 font-bold">
          <ShoppingBag size={16} aria-hidden="true" />
          <span>Shopee Open Platform Test Account</span>
        </div>
        <p className="mt-1 text-xs text-[#ee4d2d]/80 leading-relaxed">
          Akun uji coba untuk tim audit Shopee Partner. Kredensial telah terisi otomatis di bawah.
        </p>
        <div className="mt-2.5 rounded-xl bg-warm-white/90 p-2.5 font-mono text-xs text-ink border border-[#ee4d2d]/20 space-y-1">
          <div>Username: <strong>shopee.reviewer@karyalo.com</strong></div>
          <div>Password: <strong>ShopeeKaryalo2026!</strong></div>
        </div>
      </div>

      {/* Error Alert Banner */}
      {errorMessage && (
        <div
          role="alert"
          className="flex w-full items-start gap-2.5 rounded-2xl border border-status-critical/40 bg-terracotta-soft/60 p-3.5 text-xs text-status-critical shadow-2xs animate-in fade-in"
        >
          <AlertCircle size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1">
            <span className="font-bold block">Gagal Masuk:</span>
            <span className="mt-0.5 block leading-relaxed">{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Form Login */}
      <form onSubmit={handleLogin} className="flex w-full flex-col gap-3.5">
        <div>
          <label htmlFor="login-email" className="mb-1 block text-xs font-semibold text-ink">
            Email / Username
          </label>
          <div className="relative flex items-center">
            <Mail size={15} className="absolute left-3 text-muted" aria-hidden="true" />
            <input
              id="login-email"
              type="text"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="shopee.reviewer@karyalo.com"
              className={`w-full rounded-xl border bg-warm-white py-2.5 pl-9 pr-3 text-xs text-ink placeholder:text-muted transition-colors focus:outline-hidden focus-visible:ring-1 ${
                errorMessage
                  ? "border-status-critical focus:border-status-critical focus-visible:ring-status-critical"
                  : "border-border focus:border-karyalo-green focus-visible:ring-karyalo-green"
              }`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="login-password" className="mb-1 block text-xs font-semibold text-ink">
            Kata Sandi
          </label>
          <div className="relative flex items-center">
            <Lock size={15} className="absolute left-3 text-muted" aria-hidden="true" />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="••••••••"
              className={`w-full rounded-xl border bg-warm-white py-2.5 pl-9 pr-10 text-xs text-ink placeholder:text-muted transition-colors focus:outline-hidden focus-visible:ring-1 ${
                errorMessage
                  ? "border-status-critical focus:border-status-critical focus-visible:ring-status-critical"
                  : "border-border focus:border-karyalo-green focus-visible:ring-karyalo-green"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              className="tap-target absolute right-2 text-muted hover:text-ink p-1"
            >
              {showPassword ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="tap-target mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-deep-pine py-3 text-xs font-bold text-warm-white shadow-xs hover:bg-karyalo-green transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-karyalo-green disabled:opacity-50"
        >
          <span>{isLoading ? "Memverifikasi Kredensial..." : "Masuk ke Dashboard"}</span>
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </form>

      {/* Quick Role Tester */}
      <div className="w-full border-t border-border pt-4">
        <span className="block text-center text-xs text-muted mb-2.5">
          Atau isi otomatis & masuk cepat sebagai:
        </span>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleQuickLogin("Owner")}
            aria-label="Masuk cepat sebagai Owner"
            className="tap-target rounded-xl border border-border bg-soft-sand px-2 py-2 text-center text-xs font-semibold text-ink hover:border-karyalo-green hover:bg-soft-sage transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-karyalo-green"
          >
            👑 Owner (Full)
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin("AdminDashboard")}
            aria-label="Masuk cepat sebagai Admin Toko"
            className="tap-target rounded-xl border border-border bg-soft-sand px-2 py-2 text-center text-xs font-semibold text-ink hover:border-karyalo-green hover:bg-soft-sage transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-karyalo-green"
          >
            💻 Admin Toko
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin("AdminWarehouse")}
            aria-label="Masuk cepat sebagai Gudang"
            className="tap-target rounded-xl border border-border bg-soft-sand px-2 py-2 text-center text-xs font-semibold text-ink hover:border-karyalo-green hover:bg-soft-sage transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-karyalo-green"
          >
            📦 Gudang
          </button>
        </div>
      </div>
    </div>
  );
}
