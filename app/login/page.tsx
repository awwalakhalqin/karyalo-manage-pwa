"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShieldCheck, ShoppingBag, ArrowRight, Lock, Mail } from "lucide-react";
import { useSession } from "@/lib/auth/session-context";

/**
 * Halaman Login Karyalo Manage PWA
 * Mendukung autentikasi demo dan akun uji coba Shopee Open Platform Reviewer.
 */
export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useSession();
  const [email, setEmail] = useState("shopee.reviewer@karyalo.id");
  const [password, setPassword] = useState("ShopeeKaryalo2026!");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRole("Owner"); // Default to Owner role for full audit access
    setTimeout(() => {
      router.push("/");
    }, 400);
  };

  const handleQuickLogin = (roleName: "Owner" | "AdminDashboard" | "AdminWarehouse") => {
    setIsLoading(true);
    setRole(roleName);
    setTimeout(() => {
      router.push("/");
    }, 300);
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
          <div>Username: <strong>shopee.reviewer@karyalo.id</strong></div>
          <div>Password: <strong>ShopeeKaryalo2026!</strong></div>
        </div>
      </div>

      {/* Form Login */}
      <form onSubmit={handleLogin} className="flex w-full flex-col gap-3.5">
        <div>
          <label className="mb-1 block text-xs font-medium text-ink">Email / Username</label>
          <div className="relative flex items-center">
            <Mail size={15} className="absolute left-3 text-muted" aria-hidden="true" />
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="shopee.reviewer@karyalo.id"
              className="w-full rounded-xl border border-border bg-warm-white py-2.5 pl-9 pr-3 text-xs text-ink placeholder:text-muted focus:border-karyalo-green focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-ink">Kata Sandi</label>
          <div className="relative flex items-center">
            <Lock size={15} className="absolute left-3 text-muted" aria-hidden="true" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-border bg-warm-white py-2.5 pl-9 pr-3 text-xs text-ink placeholder:text-muted focus:border-karyalo-green focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="tap-target mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-deep-pine py-3 text-xs font-bold text-warm-white shadow-xs hover:bg-karyalo-green transition-colors disabled:opacity-50"
        >
          <span>{isLoading ? "Memproses Masuk..." : "Masuk ke Dashboard"}</span>
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </form>

      {/* Quick Role Tester */}
      <div className="w-full border-t border-border pt-4">
        <span className="block text-center text-xs text-muted mb-2.5">
          Atau langsung masuk cepat sebagai:
        </span>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleQuickLogin("Owner")}
            className="tap-target rounded-xl border border-border bg-soft-sand px-2 py-2 text-center text-xs font-semibold text-ink hover:border-karyalo-green hover:bg-soft-sage"
          >
            👑 Owner (Full)
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin("AdminDashboard")}
            className="tap-target rounded-xl border border-border bg-soft-sand px-2 py-2 text-center text-xs font-semibold text-ink hover:border-karyalo-green hover:bg-soft-sage"
          >
            💻 Admin Toko
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin("AdminWarehouse")}
            className="tap-target rounded-xl border border-border bg-soft-sand px-2 py-2 text-center text-xs font-semibold text-ink hover:border-karyalo-green hover:bg-soft-sage"
          >
            📦 Gudang
          </button>
        </div>
      </div>
    </div>
  );
}
