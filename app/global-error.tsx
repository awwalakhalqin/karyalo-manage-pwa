"use client";

/**
 * Next.js mewajibkan file terpisah untuk error di root layout itu sendiri
 * — lihat catatan identik di Karyalo_Storefront_PWA/app/global-error.tsx.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body>
        <div style={{ padding: "4rem 1.5rem", maxWidth: 640, margin: "0 auto" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            Ada yang tidak beres
          </h1>
          <p style={{ color: "#5B6472", marginTop: "0.5rem" }}>
            Aplikasi gagal dimuat. Coba muat ulang halaman ini.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: "1rem",
              borderRadius: 9999,
              background: "#1E5AA8",
              color: "#FCFBF7",
              padding: "0.625rem 1.25rem",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            Coba Lagi
          </button>
        </div>
      </body>
    </html>
  );
}
