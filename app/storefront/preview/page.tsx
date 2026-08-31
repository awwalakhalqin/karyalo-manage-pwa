"use client";

import { useState } from "react";
import { Smartphone, Monitor } from "lucide-react";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

/**
 * PRD §11.8 Preview, §39 `DevicePreviewSwitcher` + `StorefrontPreviewFrame`.
 * Karena `karyalo-storefront-pwa` adalah project TERPISAH yang jalan di
 * port sendiri (3000), preview di sini adalah iframe ke situ — bukan
 * simulasi statis. Hanya berfungsi kalau `karyalo-storefront-pwa` juga
 * sedang `npm run dev` di komputer Anda.
 */
export default function PreviewPage() {
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");

  return (
    <div className="mx-auto flex max-w-(--container-wide) flex-col gap-4 px-4 py-6 md:px-6 md:py-8">
      <h1 className="text-xl font-semibold text-ink md:text-2xl">Preview Storefront</h1>
      <SampleDataBanner note="Iframe ke localhost:3000 — pastikan karyalo-storefront-pwa juga sedang npm run dev." />
      <div className="flex gap-2">
        <button
          onClick={() => setDevice("mobile")}
          className={`tap-target flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium ${
            device === "mobile" ? "bg-deep-pine text-warm-white" : "bg-soft-sand text-ink"
          }`}
        >
          <Smartphone size={14} aria-hidden="true" />
          Mobile
        </button>
        <button
          onClick={() => setDevice("desktop")}
          className={`tap-target flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium ${
            device === "desktop" ? "bg-deep-pine text-warm-white" : "bg-soft-sand text-ink"
          }`}
        >
          <Monitor size={14} aria-hidden="true" />
          Desktop
        </button>
      </div>
      <div className="flex justify-center rounded-(--radius-card) border border-border bg-soft-sand p-4">
        <iframe
          src="http://localhost:3000"
          title="Preview Storefront"
          className={`rounded-lg border border-border bg-warm-white ${
            device === "mobile" ? "h-[700px] w-[375px]" : "h-[700px] w-full"
          }`}
        />
      </div>
    </div>
  );
}
