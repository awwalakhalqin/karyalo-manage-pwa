"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

/**
 * PRD §28.1 Authentication and Session. BELUM ada autentikasi sungguhan
 * pada prototype ini (sama seperti /login /register di
 * Karyalo_Storefront_PWA) — form ini visual-only, submit langsung masuk
 * ke Home tanpa validasi kredensial. Role/permission demo diatur lewat
 * "Mode Demo" role switcher di top bar (lib/auth/session-context.tsx),
 * BUKAN dari login ini. TODO integrasi: ganti dengan session sungguhan
 * (SSO/credential) begitu Admin BFF ada.
 */
export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col items-center justify-center gap-6 px-4 py-16">
      <Image src="/logo.png" alt="Karyalo" width={48} height={48} className="rounded-lg" />
      <div className="text-center">
        <h1 className="text-xl font-semibold text-ink">Masuk ke Karyalo Manage</h1>
        <p className="mt-1 text-sm text-muted">
          Prototype — belum ada autentikasi sungguhan.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/");
        }}
        className="flex w-full flex-col gap-3"
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-lg border border-border bg-warm-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted"
        />
        <input
          type="password"
          placeholder="Kata sandi"
          className="w-full rounded-lg border border-border bg-warm-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted"
        />
        <button
          type="submit"
          className="tap-target rounded-full bg-karyalo-green px-5 py-2.5 text-sm font-medium text-warm-white hover:opacity-90"
        >
          Masuk (demo)
        </button>
      </form>
      <p className="text-center text-xs text-muted">
        Untuk meninjau tampilan per role, gunakan{" "}
        <Link href="/" className="font-medium text-karyalo-green">
          selector &ldquo;Mode Demo&rdquo;
        </Link>{" "}
        di pojok kanan atas setelah masuk.
      </p>
    </div>
  );
}
