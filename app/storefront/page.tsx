import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getHomepageSections, getBanners, getCmsPages } from "@/lib/data/cms";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

const LINKS = [
  { href: "/storefront/homepage", label: "Homepage" },
  { href: "/storefront/banners", label: "Banner" },
  { href: "/storefront/pages", label: "Halaman" },
  { href: "/storefront/navigation", label: "Navigasi" },
  { href: "/storefront/media", label: "Media" },
  { href: "/storefront/theme", label: "Tema" },
  { href: "/storefront/seo", label: "SEO" },
  { href: "/storefront/preview", label: "Preview" },
];

/** PRD §11 Storefront CMS — ringkasan status konten. */
export default async function StorefrontOverviewPage() {
  const [sections, banners, pages] = await Promise.all([getHomepageSections(), getBanners(), getCmsPages()]);
  const draftCount = [...sections, ...banners, ...pages].filter((x) => x.status !== "published").length;

  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-1 text-xl font-semibold text-ink md:text-2xl">Storefront</h1>
      <p className="mb-4 text-sm text-muted">
        Konten yang tampil di <code>karyalo-storefront-pwa</code>. {draftCount} item belum published.
      </p>
      <SampleDataBanner />
      <div className="flex flex-col divide-y divide-border rounded-(--radius-card) border border-border bg-warm-white">
        {LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="tap-target flex items-center justify-between px-5 py-4 text-sm text-ink hover:bg-soft-sand"
          >
            {item.label}
            <ChevronRight size={16} className="text-muted" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}
