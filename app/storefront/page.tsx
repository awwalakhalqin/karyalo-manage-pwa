import Link from "next/link";
import {
  LayoutTemplate,
  Image as ImageIcon,
  FileText,
  Compass,
  Camera,
  Palette,
  Search,
  ExternalLink,
  ChevronRight,
  Eye,
} from "lucide-react";
import { getHomepageSections, getBanners, getCmsPages } from "@/lib/data/cms";

const STOREFRONT_MODULES = [
  { href: "/storefront/homepage", label: "Homepage", subtitle: "Susunan section, hero & banner utama", icon: LayoutTemplate },
  { href: "/storefront/banners", label: "Banner Promosi", subtitle: "Carousel slider & promo berjalan", icon: ImageIcon },
  { href: "/storefront/pages", label: "Halaman Konten", subtitle: "Tentang kami, kontak, kebijakan privasi", icon: FileText },
  { href: "/storefront/navigation", label: "Navigasi Menu", subtitle: "Struktur link header dan footer toko", icon: Compass },
  { href: "/storefront/media", label: "Pustaka Media", subtitle: "Aset gambar, ilustrasi & logo brand", icon: Camera },
  { href: "/storefront/theme", label: "Tema & Gaya", subtitle: "Warna brand, tipografi & tata letak", icon: Palette },
  { href: "/storefront/seo", label: "Optimasi SEO", subtitle: "Meta title, deskripsi & Open Graph", icon: Search },
  { href: "/storefront/preview", label: "Pratinjau Live", subtitle: "Lihat simulasi webstore di HP & desktop", icon: ExternalLink },
];

export default async function StorefrontOverviewPage() {
  const [sections, banners, pages] = await Promise.all([getHomepageSections(), getBanners(), getCmsPages()]);
  const publishedCount = [...sections, ...banners, ...pages].filter((x) => x.status === "published").length;

  return (
    <div className="mx-auto max-w-(--container-content) px-3.5 py-5 pb-24 sm:px-6 sm:py-8 sm:pb-12">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <LayoutTemplate size={22} className="text-karyalo-green" aria-hidden="true" />
            <h1 className="text-xl font-bold text-ink sm:text-2xl">Storefront CMS</h1>
          </div>
          <p className="mt-0.5 text-xs text-muted">Kelola konten, halaman, banner promosi, dan tampilan tema web toko.</p>
        </div>

        <Link
          href="/storefront/preview"
          className="inline-flex items-center gap-1.5 self-start rounded-xl bg-deep-pine px-3.5 py-2 text-xs font-semibold text-warm-white hover:bg-karyalo-green transition-colors shadow-2xs sm:self-auto"
        >
          <Eye size={14} aria-hidden="true" />
          <span>Buka Preview</span>
        </Link>
      </div>

      {/* Grid Modul */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {STOREFRONT_MODULES.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between rounded-xl border border-border bg-warm-white p-3.5 shadow-2xs hover:border-karyalo-green hover:shadow-xs transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-soft-sand text-deep-pine group-hover:bg-soft-sage group-hover:text-karyalo-green transition-colors">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="truncate text-xs font-bold text-ink group-hover:text-karyalo-green transition-colors">
                    {item.label}
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
    </div>
  );
}
