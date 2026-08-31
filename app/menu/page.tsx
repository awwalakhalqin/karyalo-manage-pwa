import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MENU_NAV } from "@/lib/config/navigation";

/**
 * PRD §8.2 Mobile Navigation — item ke-5 bottom nav ("Menu") membuka
 * Marketing/Customers/Analytics/Notifications/Settings. Ini halaman
 * sungguhan (bukan RouteStub) karena isinya murni navigasi, fungsional
 * sejak Fase 1 — halaman TUJUANnya (Marketing, dst.) yang masih stub.
 * Di desktop, kelima ini sudah muncul langsung di sidebar (§8.3), jadi
 * halaman ini praktis mobile-only meski tetap dapat diakses di desktop.
 */
export default function MenuPage() {
  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-6 text-xl font-semibold text-ink">Menu</h1>
      <div className="flex flex-col divide-y divide-border rounded-(--radius-card) border border-border bg-warm-white">
        {MENU_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="tap-target flex items-center justify-between px-5 py-4 text-sm text-ink hover:bg-soft-sand"
          >
            <span className="flex items-center gap-3">
              <item.icon size={18} className="text-deep-pine" aria-hidden="true" />
              {item.label}
            </span>
            <ChevronRight size={16} className="text-muted" aria-hidden="true" />
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-2 rounded-(--radius-card) border border-border bg-warm-white p-4">
        <span className="text-xs font-semibold text-muted">Legalitas & Kepatuhan Platform</span>
        <div className="flex items-center gap-4 text-xs">
          <Link href="/privacy" className="font-medium text-karyalo-green hover:underline">
            Kebijakan Privasi (Privacy Policy)
          </Link>
          <span className="text-border">•</span>
          <Link href="/terms" className="font-medium text-karyalo-green hover:underline">
            Ketentuan Layanan (Terms)
          </Link>
        </div>
      </div>
    </div>
  );
}
