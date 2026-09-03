import { NextRequest, NextResponse } from "next/server";

/**
 * OAuth 2.0 Authorization Callback Handler untuk Shopee OpenAPI v2
 * Dipanggil saat Seller menyelesaikan proses otorisasi di Shopee Seller Center.
 *
 * Query params yang dikirim Shopee:
 * - code: Authorization code untuk ditukar dengan access_token
 * - shop_id: ID toko Shopee
 * - main_account_id: ID akun utama (jika menggunakan merchant account)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const shopId = searchParams.get("shop_id");
  const mainAccountId = searchParams.get("main_account_id");
  const error = searchParams.get("error");
  const message = searchParams.get("message");

  const baseUrl = request.nextUrl.origin;

  if (error) {
    console.error(`[Shopee OAuth Callback] Otorisasi gagal: ${error} - ${message}`);
    return NextResponse.redirect(
      new URL(
        `/settings/integrations/shopee?auth_error=${encodeURIComponent(error)}&message=${encodeURIComponent(
          message || ""
        )}`,
        baseUrl
      )
    );
  }

  if (!code && !shopId) {
    return NextResponse.redirect(
      new URL(`/settings/integrations/shopee?auth_error=missing_params`, baseUrl)
    );
  }

  console.log(
    `[Shopee OAuth Callback] Berhasil menerima Authorization Code: ${code?.substring(
      0,
      6
    )}... untuk Shop ID: ${shopId || mainAccountId}`
  );

  // Redirect kembali ke halaman konfigurasi integrasi dengan pesan sukses
  return NextResponse.redirect(
    new URL(
      `/settings/integrations/shopee?auth_success=true&shop_id=${shopId || mainAccountId || ""}`,
      baseUrl
    )
  );
}
