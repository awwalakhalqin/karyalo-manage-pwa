import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware Autentikasi Karyalo Manage PWA
 * Mengharuskan pengguna login terlebih dahulu sebelum dapat mengakses dashboard & fitur admin.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lewati file statis, aset gambar, ikon, manifest, dan Next.js internal
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icons") ||
    pathname === "/favicon.ico" ||
    pathname === "/manifest.json" ||
    pathname === "/logo.png" ||
    pathname === "/login"
  ) {
    return NextResponse.next();
  }

  // Periksa cookie sesi autentikasi
  const authCookie = request.cookies.get("karyalo_auth");

  // Jika belum login, redirect langsung ke /login
  if (!authCookie || authCookie.value !== "true") {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
