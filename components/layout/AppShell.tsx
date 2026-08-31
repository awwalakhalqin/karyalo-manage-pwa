"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth/session-context";
import { TopBar } from "@/components/layout/TopBar";
import { DesktopSideNavigation } from "@/components/layout/DesktopSideNavigation";
import { MobileBottomNavigation } from "@/components/layout/MobileBottomNavigation";
import { ConnectivityBanner } from "@/components/layout/ConnectivityBanner";
import { ServiceWorkerRegister } from "@/components/system/ServiceWorkerRegister";
import { Loader2 } from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, hydrated } = useSession();

  const isLoginPage = pathname === "/login";

  useEffect(() => {
    if (!hydrated) return;
    // Jika belum login dan bukan di halaman login -> arahkan ke /login
    if (!isAuthenticated && !isLoginPage) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoginPage, hydrated, router]);

  // Halaman Login: Render penuh tanpa sidebar & navigasi admin
  if (isLoginPage) {
    return (
      <main id="main-content" className="min-h-screen w-full bg-soft-sand/30">
        {children}
        <ServiceWorkerRegister />
      </main>
    );
  }

  // Jika belum ter-hidrasi atau belum autentikasi saat mengakses halaman terproteksi
  if (!hydrated || !isAuthenticated) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3 bg-soft-sand/30 p-6 text-center">
        <Loader2 size={28} className="animate-spin text-deep-pine" aria-hidden="true" />
        <p className="text-xs font-medium text-muted">Memverifikasi sesi login...</p>
      </div>
    );
  }

  // Dashboard & Modul Terproteksi
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-deep-pine focus:px-4 focus:py-2 focus:text-warm-white"
      >
        Lompat ke konten utama
      </a>
      <TopBar />
      <ConnectivityBanner />
      <div className="flex w-full min-w-0 max-w-full overflow-x-hidden">
        <DesktopSideNavigation />
        <main
          id="main-content"
          className="min-h-[calc(100vh-3.5rem)] w-full min-w-0 max-w-full flex-1 overflow-x-hidden pb-20 md:pb-0"
        >
          {children}
        </main>
      </div>
      <MobileBottomNavigation />
      <ServiceWorkerRegister />
    </>
  );
}
