import Link from "next/link";
import { getNotifications, NOTIFICATION_TYPE_LABEL } from "@/lib/data/notifications";
import { Bell, Circle, CheckCheck, Settings } from "lucide-react";

export default async function NotificationsPage() {
  const notifications = await getNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="mx-auto max-w-(--container-content) px-3.5 py-5 pb-24 sm:px-6 sm:py-8 sm:pb-12">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Bell size={22} className="text-karyalo-green" aria-hidden="true" />
            <h1 className="text-xl font-bold text-ink sm:text-2xl">Pusat Notifikasi</h1>
            {unreadCount > 0 && (
              <span className="rounded-full bg-status-critical/10 px-2 py-0.5 text-[11px] font-bold text-status-critical">
                {unreadCount} baru
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-muted">Pemberitahuan transaksi pesanan baru, status pengiriman, dan stok produk.</p>
        </div>

        <Link
          href="/settings/notifications"
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-warm-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-soft-sand transition-colors shadow-2xs"
        >
          <Settings size={14} aria-hidden="true" />
          <span className="hidden sm:inline">Pengaturan</span>
        </Link>
      </div>

      {/* List Notifikasi */}
      <div className="flex flex-col divide-y divide-border/70 rounded-2xl border border-border bg-warm-white shadow-2xs">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-3.5 p-4 transition-colors ${
              !n.read ? "bg-soft-sage/20" : "hover:bg-soft-sand/40"
            }`}
          >
            <span className="mt-1 flex size-2 shrink-0 items-center justify-center">
              {!n.read ? (
                <Circle size={8} className="fill-karyalo-green text-karyalo-green" aria-hidden="true" />
              ) : (
                <span className="size-1.5 rounded-full bg-muted/30" />
              )}
            </span>

            <div className="flex flex-1 flex-col gap-0.5 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-soft-sand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                  {NOTIFICATION_TYPE_LABEL[n.type]}
                </span>
                <span className="shrink-0 text-[11px] text-muted">{n.createdAtLabel}</span>
              </div>
              <p className="mt-1 text-xs font-bold text-ink">{n.title}</p>
              <p className="text-xs text-muted leading-relaxed">{n.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
