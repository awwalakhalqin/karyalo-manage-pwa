import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ConvexClientProvider } from "@/lib/convex/ConvexClientProvider";
import { SessionProvider } from "@/lib/auth/session-context";
import { TopBar } from "@/components/layout/TopBar";
import { DesktopSideNavigation } from "@/components/layout/DesktopSideNavigation";
import { MobileBottomNavigation } from "@/components/layout/MobileBottomNavigation";
import { ConnectivityBanner } from "@/components/layout/ConnectivityBanner";
import { ServiceWorkerRegister } from "@/components/system/ServiceWorkerRegister";

// Font sama dengan Karyalo_Storefront_PWA (Inter Variable, Design System
// §3) — konsistensi lintas produk, keputusan sudah dicatat di sana.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Karyalo Manage",
    template: "%s — Karyalo Manage",
  },
  description:
    "Karyalo Commerce Admin — kelola order, produk, storefront, dan promosi. Prototype Fase 1.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1E2F5C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={inter.variable}>
      <body>
        <ConvexClientProvider>
          <SessionProvider>
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
              <main id="main-content" className="min-h-[calc(100vh-3.5rem)] w-full min-w-0 max-w-full flex-1 overflow-x-hidden pb-20 md:pb-0">
                {children}
              </main>
            </div>
            <MobileBottomNavigation />
            <ServiceWorkerRegister />
          </SessionProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
