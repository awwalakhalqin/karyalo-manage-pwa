"use client";

import { useCallback, useEffect, useState } from "react";
import { useAction, useMutation, useQuery } from "convex/react";
import { BellRing, BellOff, Loader2 } from "lucide-react";
import { anyApi } from "@/lib/convex/anyApi";
import { useSession, ROLE_LABEL } from "@/lib/auth/session-context";

/**
 * BARU 16 Agustus 2026 — jawaban dari pertanyaan pemilik proyek: "kalau
 * ada pemesanan di storefront, apakah Manage dapat push notifikasi?".
 * Tombol ini yang membuat jawabannya "iya" jadi nyata: memicu native
 * browser permission prompt (PRD §16.5 — TIDAK diminta saat first paint,
 * baru saat user klik tombol ini secara eksplisit), lalu mendaftarkan
 * device ke Web Push lewat Convex `notifications.subscribe`
 * (`Karyalo_Storefront_PWA/convex/notifications.ts` — backend yang sama
 * dengan storefront, lihat catatan di `ConvexClientProvider.tsx`).
 *
 * Rules of Hooks: sama seperti /wishlist dan /checkout di storefront —
 * `useMutation`/`useQuery`/`useAction` tidak boleh dipanggil kondisional,
 * jadi dipecah jadi komponen terpisah dipilih SEKALI lewat
 * `CONVEX_CONFIGURED` (konstan sepanjang sesi browser), bukan cabang di
 * dalam satu komponen.
 */
const CONVEX_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL);
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const output = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) output[i] = rawData.charCodeAt(i);
  return output;
}

function isIos(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    // Safari lama expose ini di navigator, bukan standar — cek defensif.
    (navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

export function PushSubscribeButton() {
  if (!CONVEX_CONFIGURED) {
    return (
      <p className="text-xs text-muted">
        Convex belum disambungkan (<code>NEXT_PUBLIC_CONVEX_URL</code> kosong di{" "}
        <code>.env.local</code>) — push notification belum bisa aktif. Lihat{" "}
        <code>CONVEX_SETUP.md</code> di folder <code>Karyalo_Storefront_PWA</code>.
      </p>
    );
  }
  return <PushSubscribeButtonConvex />;
}

function PushSubscribeButtonConvex() {
  const { userName, role, hydrated } = useSession();
  const subscribeMutation = useMutation(anyApi.notifications.subscribe);
  const unsubscribeMutation = useMutation(anyApi.notifications.unsubscribe);
  const sendTest = useAction(anyApi.notificationActions.sendTestPushNotification);
  const deviceCount = useQuery(anyApi.notifications.countSubscriptions) as number | undefined;

  const [supported, setSupported] = useState<boolean | null>(null);
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const [endpoint, setEndpoint] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testSent, setTestSent] = useState(false);

  useEffect(() => {
    const ok =
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      "Notification" in window;
    setSupported(ok);
    if (!ok) return;

    setPermission(Notification.permission);
    navigator.serviceWorker.ready
      .then((registration) => registration.pushManager.getSubscription())
      .then((sub) => setEndpoint(sub?.endpoint ?? null))
      .catch(() => {
        // Service worker belum ready (mis. dev mode — SW sengaja hanya aktif
        // production, lihat ServiceWorkerRegister.tsx) — anggap belum subscribe.
      });
  }, []);

  const handleSubscribe = useCallback(async () => {
    setError(null);
    if (!VAPID_PUBLIC_KEY) {
      setError(
        "NEXT_PUBLIC_VAPID_PUBLIC_KEY belum diisi di .env.local — lihat CONVEX_SETUP.md bagian Setup Web Push."
      );
      return;
    }
    setBusy(true);
    try {
      const permissionResult = await Notification.requestPermission();
      setPermission(permissionResult);
      if (permissionResult !== "granted") {
        setError(
          permissionResult === "denied"
            ? "Izin notifikasi ditolak. Aktifkan lagi lewat pengaturan browser/OS untuk situs ini."
            : "Izin notifikasi belum diberikan."
        );
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as unknown as BufferSource,
      });

      const json = subscription.toJSON();
      await subscribeMutation({
        endpoint: json.endpoint!,
        keys: { p256dh: json.keys!.p256dh!, auth: json.keys!.auth! },
        label: hydrated ? `${userName} (${ROLE_LABEL[role]})` : undefined,
      });
      setEndpoint(json.endpoint ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal subscribe push notification.");
    } finally {
      setBusy(false);
    }
  }, [subscribeMutation, userName, role, hydrated]);

  const handleUnsubscribe = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await unsubscribeMutation({ endpoint: subscription.endpoint });
        await subscription.unsubscribe();
      }
      setEndpoint(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal matikan notifikasi.");
    } finally {
      setBusy(false);
    }
  }, [unsubscribeMutation]);

  const handleTestNotification = useCallback(async () => {
    if (!endpoint) return;
    setBusy(true);
    setError(null);
    setTestSent(false);
    try {
      await sendTest({ endpoint });
      setTestSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal kirim tes notifikasi.");
    } finally {
      setBusy(false);
    }
  }, [endpoint, sendTest]);

  if (supported === false) {
    return (
      <p className="text-xs text-muted">
        Browser/device ini tidak mendukung Web Push. Kalau ini iPhone/iPad, pastikan sudah
        "Add to Home Screen" (Safari push hanya jalan untuk PWA yang ter-install, iOS 16.4+).
      </p>
    );
  }

  if (supported === null) {
    return null; // belum selesai deteksi di client — hindari flash konten salah
  }

  return (
    <div className="flex flex-col gap-3 rounded-(--radius-card) border border-border bg-warm-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-ink">Push notification pesanan baru</p>
          <p className="mt-0.5 text-xs text-muted">
            {endpoint
              ? "Aktif di device ini — kamu akan dapat notifikasi begitu ada pesanan baru dari storefront, walau app ini tertutup."
              : "Belum aktif di device ini. Klik tombol untuk mengizinkan notifikasi."}
          </p>
        </div>
        {endpoint ? (
          <BellRing size={20} className="mt-0.5 shrink-0 text-status-success" aria-hidden="true" />
        ) : (
          <BellOff size={20} className="mt-0.5 shrink-0 text-muted" aria-hidden="true" />
        )}
      </div>

      {isIos() && !isStandalone() && (
        <p className="rounded-lg bg-soft-sand px-3 py-2 text-xs text-ink">
          Terdeteksi iPhone/iPad yang belum di-"Add to Home Screen". Di iOS, push notification
          HANYA jalan untuk PWA yang sudah ter-install (iOS 16.4+), tidak jalan dari tab Safari
          biasa — install dulu, baru tombol di bawah akan berfungsi.
        </p>
      )}

      {error && <p className="text-xs text-status-critical">{error}</p>}
      {testSent && <p className="text-xs text-status-success">Tes notifikasi dikirim — cek notifikasi device kamu.</p>}

      <div className="flex flex-wrap gap-2">
        {!endpoint ? (
          <button
            type="button"
            onClick={handleSubscribe}
            disabled={busy}
            className="tap-target inline-flex items-center gap-1.5 rounded-full bg-karyalo-green px-4 py-2 text-xs font-medium text-warm-white hover:opacity-90 disabled:opacity-60"
          >
            {busy && <Loader2 size={14} className="animate-spin" aria-hidden="true" />}
            Aktifkan Notifikasi
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleTestNotification}
              disabled={busy}
              className="tap-target inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-ink hover:bg-soft-sand disabled:opacity-60"
            >
              {busy && <Loader2 size={14} className="animate-spin" aria-hidden="true" />}
              Kirim Tes Notifikasi
            </button>
            <button
              type="button"
              onClick={handleUnsubscribe}
              disabled={busy}
              className="tap-target inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted hover:bg-soft-sand disabled:opacity-60"
            >
              Matikan
            </button>
          </>
        )}
      </div>

      <p className="text-xs text-muted">
        {deviceCount === undefined
          ? "Memuat jumlah device terdaftar…"
          : `${deviceCount} device admin terdaftar untuk notifikasi ini (data sungguhan dari Convex, bukan contoh).`}
      </p>
    </div>
  );
}
