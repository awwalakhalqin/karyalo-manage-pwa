"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Check, ChevronRight, Minus, Package, ShoppingBag, ShoppingCart, TrendingDown, TrendingUp, Wallet,
} from "lucide-react";
import { useSession } from "@/lib/auth/session-context";
import { formatRupiah } from "@/lib/utils/currency";
import { ORDER_CHANNEL_LABEL, ORDER_STATUS_LABEL } from "@/lib/data/orders";
import {
  attentionItems, DATA_ANCHOR, pipeline, recentOrders, summarize, topProducts,
  type ChannelFilter, type PeriodDays,
} from "@/lib/dashboard/metrics";
import { Sparkline, TrendChart } from "@/components/dashboard/charts";
import { QuickActions } from "@/components/dashboard/QuickActions";

const compactRupiah = (v: number) => {
  if (v >= 1e9) return `Rp ${(v / 1e9).toLocaleString("id-ID", { maximumFractionDigits: 1 })} M`;
  if (v >= 1e6) return `Rp ${(v / 1e6).toLocaleString("id-ID", { maximumFractionDigits: 1 })} jt`;
  if (v >= 1e3) return `Rp ${(v / 1e3).toLocaleString("id-ID", { maximumFractionDigits: 0 })} rb`;
  return `Rp ${v.toLocaleString("id-ID")}`;
};

const maskName = (name: string) => name.split(" ").map((w) => (w ? w[0] + "*".repeat(Math.max(1, w.length - 1)) : w)).join(" ");

function greeting() {
  const h = new Date().getHours();
  if (h < 11) return "Selamat pagi";
  if (h < 15) return "Selamat siang";
  if (h < 18) return "Selamat sore";
  return "Selamat malam";
}

function Delta({ pct }: { pct: number | null }) {
  if (pct === null) return <span className="text-[11px] text-muted">belum ada pembanding</span>;
  const r = Math.round(pct);
  const Icon = r === 0 ? Minus : r > 0 ? TrendingUp : TrendingDown;
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-bold tabular-nums ${r === 0 ? "text-muted" : r > 0 ? "text-status-success" : "text-status-critical"}`}>
      <Icon size={13} aria-hidden="true" />
      {r > 0 ? "+" : ""}{r}%<span className="font-medium text-muted">vs periode lalu</span>
    </span>
  );
}

function Kpi({ label, value, title, delta, trend, trendLabel, icon: Icon, href }: {
  label: string; value: string; title?: string; delta: number | null; trend?: number[]; trendLabel?: string;
  icon: typeof Wallet; href?: string;
}) {
  const body = (
    <>
      <span className="flex items-start justify-between gap-2 text-xs font-medium text-muted">
        {label}
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-soft-sage text-karyalo-green"><Icon size={14} aria-hidden="true" /></span>
      </span>
      <span className="block truncate text-[1.6rem] font-bold leading-tight tracking-tight text-ink tabular-nums" title={title}>{value}</span>
      <Delta pct={delta} />
      {trend && <Sparkline values={trend} label={trendLabel ?? label} />}
    </>
  );
  const cls = "flex min-w-0 flex-col gap-1 rounded-[var(--radius-card)] border border-border/80 bg-warm-white p-4 shadow-xs";
  return href ? <Link href={href} className={`${cls} transition-colors hover:border-karyalo-green/50`}>{body}</Link> : <div className={cls}>{body}</div>;
}

function Panel({ title, subtitle, action, children, className = "" }: { title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`min-w-0 rounded-[var(--radius-card)] border border-border/80 bg-warm-white p-4 shadow-xs sm:p-5 ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-ink">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Segmented<T extends string | number>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string; activeClass?: string }[]; onChange: (v: T) => void }) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-lg border border-border bg-soft-sand p-0.5 text-xs font-medium">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-md px-2.5 py-1 transition-colors ${value === o.value ? o.activeClass ?? "bg-warm-white font-semibold text-ink shadow-2xs" : "text-muted hover:text-ink"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function DashboardView() {
  const { userName, capabilities, role } = useSession();
  const [days, setDays] = useState<PeriodDays>(7);
  const [channel, setChannel] = useState<ChannelFilter>("all");
  const [trendMetric, setTrendMetric] = useState<"revenue" | "orders">("revenue");

  const can = (cap?: string) => !cap || !!(capabilities && capabilities[cap as keyof typeof capabilities]);
  const seePii = can("customerPii");

  const s = useMemo(() => summarize(channel, days), [channel, days]);
  const stages = useMemo(() => pipeline(channel), [channel]);
  const attention = useMemo(() => attentionItems().filter((a) => can(a.capability)), [capabilities]); // eslint-disable-line react-hooks/exhaustive-deps
  const top = useMemo(() => topProducts(days, channel), [days, channel]);
  const recent = useMemo(() => recentOrders(6).filter((o) => channel === "all" || o.channel === channel), [channel]);
  const done = attention.filter((a) => a.count === 0).length;
  const firstName = userName.replace(/\s*\(.*\)$/, "").split(" ")[0];
  const anchorText = DATA_ANCHOR.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="mx-auto flex w-full max-w-(--container-wide) min-w-0 gap-5 px-3.5 py-4 sm:px-6 sm:py-6">
      <div className="@container flex min-w-0 flex-1 flex-col gap-4">
        {/* Greeting + period */}
        <header className="flex flex-col gap-3 @3xl:flex-row @3xl:items-end @3xl:justify-between">
          <div className="min-w-0">
            <h1 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">{greeting()}, {firstName}</h1>
            <p className="mt-0.5 text-xs text-muted">Ringkasan toko · data contoh s.d. {anchorText}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Segmented label="Kanal" value={channel} onChange={setChannel} options={[
              { value: "all", label: "Semua" },
              { value: "shopee", label: "Shopee", activeClass: "bg-[#ee4d2d] font-semibold text-warm-white shadow-2xs" },
              { value: "storefront", label: "Webstore", activeClass: "bg-deep-pine font-semibold text-warm-white shadow-2xs" },
            ]} />
            <Segmented label="Periode" value={days} onChange={setDays} options={[{ value: 7, label: "7 hari" }, { value: 14, label: "14 hari" }]} />
          </div>
        </header>

        {/* KPI */}
        <div className="grid grid-cols-2 gap-3 @4xl:grid-cols-4">
          <Kpi label="Omset (GMV)" value={compactRupiah(s.revenue)} title={formatRupiah(s.revenue)} delta={s.revenueDelta} trend={s.series.map((p) => p.revenue)} trendLabel={`Omset per hari, ${s.rangeLabel}`} icon={Wallet} href={can("analyticsExport") ? "/analytics" : undefined} />
          <Kpi label="Pesanan" value={`${s.orders}`} delta={s.ordersDelta} trend={s.series.map((p) => p.orders)} trendLabel={`Pesanan per hari, ${s.rangeLabel}`} icon={ShoppingCart} href={can("orderRead") ? "/orders" : undefined} />
          <Kpi label="Produk terjual" value={`${s.itemsSold} unit`} delta={s.itemsDelta} icon={Package} href={can("catalogWrite") ? "/products" : undefined} />
          <Kpi label="Rata-rata order" value={compactRupiah(s.averageOrder)} title={formatRupiah(s.averageOrder)} delta={s.averageDelta} icon={ShoppingBag} />
        </div>

        {/* Trend + pipeline */}
        <div className="grid grid-cols-1 gap-4 @3xl:grid-cols-12">
          <Panel
            className="@3xl:col-span-8"
            title="Tren penjualan"
            subtitle={`Per hari, ${s.rangeLabel} · pesanan batal tidak dihitung`}
            action={<Segmented label="Ukuran tren" value={trendMetric} onChange={setTrendMetric} options={[{ value: "revenue", label: "Omset" }, { value: "orders", label: "Pesanan" }]} />}
          >
            <TrendChart
              points={s.series.map((p) => ({ label: p.label, fullLabel: p.fullLabel, value: trendMetric === "revenue" ? p.revenue : p.orders }))}
              format={(v) => (trendMetric === "revenue" ? formatRupiah(v) : `${v} pesanan`)}
              formatAxis={(v) => (trendMetric === "revenue" ? compactRupiah(v).replace("Rp ", "") : String(Math.round(v)))}
              label={`Tren ${trendMetric === "revenue" ? "omset" : "jumlah pesanan"} ${s.rangeLabel}`}
            />
          </Panel>

          <Panel className="@3xl:col-span-4" title="Alur pesanan" subtitle="Dihitung dari status setiap order">
            <ul className="flex flex-col gap-1">
              {stages.map((st) => (
                <li key={st.id}>
                  <Link href={st.href} className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-[13px] hover:bg-soft-sand">
                    <span className="font-medium text-ink">{st.label}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-base font-bold tabular-nums text-ink">{st.count}</span>
                      <ChevronRight size={14} className="text-muted" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* Recent orders + top products */}
        <div className="grid grid-cols-1 gap-4 @3xl:grid-cols-12">
          <Panel
            className="@3xl:col-span-7"
            title="Pesanan terbaru"
            subtitle={seePii ? undefined : "Nama pembeli disamarkan untuk peran ini"}
            action={can("orderRead") ? <Link href="/orders" className="inline-flex items-center gap-1 text-xs font-semibold text-karyalo-green hover:underline">Lihat semua <ArrowRight size={13} /></Link> : undefined}
          >
            <ul className="divide-y divide-border/70">
              {recent.map((o) => {
                const rowClass = "flex items-center gap-3 py-2.5 text-[13px]";
                const content = (
                  <>
                    <span className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${o.channel === "shopee" ? "bg-[#ee4d2d]/10 text-[#ee4d2d]" : "bg-soft-sage text-deep-pine"}`}>
                      {o.channel === "shopee" ? "SHP" : o.channel === "storefront" ? "WEB" : "POS"}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-ink">{o.orderNumber} · {seePii ? o.customerName : maskName(o.customerName)}</span>
                      <span className="block truncate text-xs text-muted">{ORDER_CHANNEL_LABEL[o.channel]} · {ORDER_STATUS_LABEL[o.status]} · {o.createdAtLabel}</span>
                    </span>
                    <span className="shrink-0 text-right font-bold tabular-nums text-ink">{compactRupiah(o.total)}</span>
                  </>
                );
                return (
                  <li key={o.id}>
                    {can("orderRead") ? (
                      <Link href={`/orders/${o.id}`} className={`${rowClass} hover:bg-soft-sand/40`}>{content}</Link>
                    ) : (
                      <div className={rowClass}>{content}</div>
                    )}
                  </li>
                );
              })}
              {recent.length === 0 && <li className="py-6 text-center text-xs text-muted">Belum ada pesanan di kanal ini.</li>}
            </ul>
          </Panel>

          <Panel className="@3xl:col-span-5" title="Produk terlaris" subtitle={`Unit terjual, ${s.rangeLabel}`}>
            {top.length === 0 ? (
              <p className="py-6 text-center text-xs text-muted">Belum ada penjualan di periode ini.</p>
            ) : (
              <ol className="flex flex-col gap-3">
                {top.map((p, i) => {
                  const pct = Math.round((p.units / top[0].units) * 100);
                  return (
                    <li key={p.sku} className="flex flex-col gap-1">
                      <div className="flex items-baseline justify-between gap-2 text-[13px]">
                        <span className="min-w-0 truncate font-medium text-ink"><span className="mr-1.5 text-muted tabular-nums">{i + 1}.</span>{p.name}</span>
                        <span className="shrink-0 font-bold tabular-nums text-ink">{p.units} unit</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-soft-sand" role="presentation">
                        <div className="h-full rounded-full bg-karyalo-green" style={{ width: `${pct}%` }} />
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </Panel>
        </div>

        {/* Below xl the right column is hidden; its checklist sits here instead. */}
        <div className="xl:hidden">
          <AttentionChecklist items={attention} done={done} />
        </div>
      </div>

      {/* Right column (xl): attention, Shopee status, quick actions */}
      <aside aria-label="Perlu tindakan" className="hidden w-80 shrink-0 flex-col gap-4 xl:flex">
        <AttentionChecklist items={attention} done={done} />
        {role === "Owner" && (
          <section className="rounded-[var(--radius-card)] border border-border/80 bg-warm-white p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-[#ee4d2d]/10 text-[#ee4d2d]"><ShoppingBag size={14} aria-hidden="true" /></span>
                <div>
                  <h2 className="text-xs font-bold text-ink">Shopee OpenAPI</h2>
                  <span className="font-mono text-[11px] text-muted">Shop ID: 918230114</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded bg-soft-sand px-2 py-0.5 text-[11px] font-semibold text-status-success"><Check size={11} /> Aktif</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5 text-xs">
              <Link href="/orders/shopee" className="font-medium text-karyalo-green hover:underline">Pesanan Shopee</Link>
              <Link href="/settings/integrations/shopee" className="text-muted hover:text-ink">Kelola →</Link>
            </div>
          </section>
        )}
        <section className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Aksi cepat</h2>
          <QuickActions />
        </section>
      </aside>
    </div>
  );
}

function AttentionChecklist({ items, done }: { items: ReturnType<typeof attentionItems>; done: number }) {
  const pct = items.length ? Math.round((done / items.length) * 100) : 100;
  return (
    <section className="rounded-[var(--radius-card)] border border-border/80 bg-warm-white p-4 shadow-xs">
      <h2 className="text-sm font-bold text-ink">Perlu tindakan</h2>
      <p className="mt-0.5 text-xs text-muted tabular-nums">{done} dari {items.length} beres</p>
      <div role="progressbar" aria-label="Perlu tindakan yang sudah beres" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} className="mt-3 h-2 overflow-hidden rounded-full bg-soft-sand">
        <div className="h-full rounded-full bg-karyalo-green" style={{ width: `${pct}%` }} />
      </div>
      <ul className="mt-3 flex flex-col gap-0.5">
        {items.map((a) => {
          const clear = a.count === 0;
          return (
            <li key={a.id}>
              <Link href={a.href} className="flex items-center gap-3 rounded-lg px-1.5 py-2 text-[13px] hover:bg-soft-sand">
                <span aria-hidden="true" className={`flex size-5 shrink-0 items-center justify-center rounded-md border ${clear ? "border-karyalo-green bg-karyalo-green text-warm-white" : "border-border bg-warm-white"}`}>
                  {clear && <Check size={12} strokeWidth={3} />}
                </span>
                <span className={`min-w-0 flex-1 ${clear ? "text-muted" : "font-medium text-ink"}`}>
                  {clear ? a.doneLabel : (
                    <><span className={`font-bold tabular-nums ${a.tone === "critical" ? "text-status-critical" : "text-status-warning"}`}>{a.count}</span> {a.label}</>
                  )}
                </span>
                {!clear && <ArrowRight size={13} className="shrink-0 text-muted" aria-hidden="true" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
