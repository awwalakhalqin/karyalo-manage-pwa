import { ORDERS, type AdminOrder, type OrderChannel, type OrderStatus } from "@/lib/data/orders";
import { PRODUCTS } from "@/lib/data/catalog";

/**
 * Dashboard numbers, all derived from the same order and product records the
 * Orders and Products pages show. Nothing here is typed in by hand: the old
 * dashboard carried hard-coded pipeline counts and a chart with its own made-up
 * dates, which disagreed with the order list one click away.
 *
 * The records are sample data (see lib/data/orders.ts), so periods are anchored
 * to the newest order rather than to today — anchored to today, every chart
 * would be empty and every total zero.
 */

const MONTHS: Record<string, number> = {
  januari: 0, februari: 1, maret: 2, april: 3, mei: 4, juni: 5,
  juli: 6, agustus: 7, september: 8, oktober: 9, november: 10, desember: 11,
};

/** "16 Agustus 2026, 09:12" -> Date (local time). */
export function parseIdDateLabel(label: string): Date | null {
  const m = label.trim().match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})(?:,\s*(\d{1,2}):(\d{2}))?/);
  if (!m) return null;
  const month = MONTHS[m[2].toLowerCase()];
  if (month === undefined) return null;
  return new Date(Number(m[3]), month, Number(m[1]), Number(m[4] ?? 0), Number(m[5] ?? 0));
}

const DAY = 24 * 60 * 60 * 1000;
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export type ChannelFilter = "all" | OrderChannel;
export type PeriodDays = 7 | 14;

export interface DatedOrder extends AdminOrder {
  createdAt: Date;
}

export const DATED_ORDERS: DatedOrder[] = ORDERS.flatMap((o) => {
  const createdAt = parseIdDateLabel(o.createdAtLabel);
  return createdAt ? [{ ...o, createdAt }] : [];
}).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

/** The last day that has orders — the "today" of the sample data. */
export const DATA_ANCHOR: Date = startOfDay(DATED_ORDERS[0]?.createdAt ?? new Date());

export const formatShortDate = (d: Date) => d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });

const counted = (o: AdminOrder) => o.status !== "cancelled";
const itemsIn = (o: AdminOrder) => o.items.reduce((n, i) => n + i.quantity, 0);

export interface DayPoint {
  date: Date;
  label: string;
  fullLabel: string;
  revenue: number;
  orders: number;
}

function daySeries(orders: DatedOrder[], days: number, endOffsetDays = 0): DayPoint[] {
  const end = DATA_ANCHOR.getTime() - endOffsetDays * DAY;
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(end - (days - 1 - i) * DAY);
    const dayOrders = orders.filter((o) => startOfDay(o.createdAt).getTime() === date.getTime());
    return {
      date,
      label: formatShortDate(date),
      fullLabel: date.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "short" }),
      revenue: dayOrders.reduce((s, o) => s + o.total, 0),
      orders: dayOrders.length,
    };
  });
}

const deltaPct = (now: number, before: number) => (before > 0 ? ((now - before) / before) * 100 : null);

export interface PeriodSummary {
  series: DayPoint[];
  revenue: number;
  orders: number;
  itemsSold: number;
  averageOrder: number;
  revenueDelta: number | null;
  ordersDelta: number | null;
  itemsDelta: number | null;
  averageDelta: number | null;
  rangeLabel: string;
}

export function summarize(channel: ChannelFilter, days: PeriodDays): PeriodSummary {
  const orders = DATED_ORDERS.filter((o) => counted(o) && (channel === "all" || o.channel === channel));
  const inRange = (offset: number) => {
    const end = DATA_ANCHOR.getTime() - offset * DAY + DAY;
    const start = end - days * DAY;
    return orders.filter((o) => o.createdAt.getTime() >= start && o.createdAt.getTime() < end);
  };
  const now = inRange(0);
  const before = inRange(days);
  const revenue = now.reduce((s, o) => s + o.total, 0);
  const revenueBefore = before.reduce((s, o) => s + o.total, 0);
  const items = now.reduce((s, o) => s + itemsIn(o), 0);
  const itemsBefore = before.reduce((s, o) => s + itemsIn(o), 0);
  const avg = now.length ? revenue / now.length : 0;
  const avgBefore = before.length ? revenueBefore / before.length : 0;
  const series = daySeries(orders, days);
  return {
    series,
    revenue,
    orders: now.length,
    itemsSold: items,
    averageOrder: avg,
    revenueDelta: deltaPct(revenue, revenueBefore),
    ordersDelta: deltaPct(now.length, before.length),
    itemsDelta: deltaPct(items, itemsBefore),
    averageDelta: deltaPct(avg, avgBefore),
    rangeLabel: `${formatShortDate(series[0].date)} – ${formatShortDate(series[series.length - 1].date)}`,
  };
}

/** Order pipeline, counted from order status instead of typed-in numbers. */
export interface PipelineStage {
  id: string;
  label: string;
  statuses: OrderStatus[];
  href: string;
  count: number;
}

export function pipeline(channel: ChannelFilter): PipelineStage[] {
  const orders = DATED_ORDERS.filter((o) => channel === "all" || o.channel === channel);
  const stages: Omit<PipelineStage, "count">[] = [
    { id: "new", label: "Pesanan baru", statuses: ["new"], href: "/orders" },
    { id: "payment", label: "Masalah bayar", statuses: ["payment_issue"], href: "/orders/payment-issues" },
    { id: "packing", label: "Siap dipacking", statuses: ["processing", "fulfillment"], href: "/orders/fulfillment" },
    { id: "shipping", label: "Dalam pengiriman", statuses: ["shipped"], href: "/orders" },
    { id: "done", label: "Selesai", statuses: ["completed"], href: "/orders" },
  ];
  return stages.map((s) => ({ ...s, count: orders.filter((o) => s.statuses.includes(o.status)).length }));
}

/** What is waiting on someone, worst first. */
export interface AttentionItem {
  id: string;
  label: string;
  doneLabel: string;
  count: number;
  href: string;
  tone: "critical" | "warning";
  capability?: "orderRead" | "orderProcess" | "cancelRefundRequest" | "catalogWrite";
}

export function attentionItems(): AttentionItem[] {
  const lowStock = PRODUCTS.filter((p) => p.status !== "archived" && p.stock > 0 && p.stock <= p.lowStockThreshold).length;
  const outOfStock = PRODUCTS.filter((p) => p.status !== "archived" && p.stock === 0).length;
  const syncErrors = PRODUCTS.filter((p) => p.shopeeSyncStatus === "error").length;
  const by = (s: OrderStatus[]) => ORDERS.filter((o) => s.includes(o.status)).length;
  return [
    { id: "payment", label: "pesanan bermasalah pembayaran", doneLabel: "Tidak ada masalah pembayaran", count: by(["payment_issue"]), href: "/orders/payment-issues", tone: "critical", capability: "orderRead" },
    { id: "packing", label: "pesanan menunggu packing & resi", doneLabel: "Semua pesanan sudah dikemas", count: by(["new", "processing", "fulfillment"]), href: "/orders/fulfillment", tone: "warning", capability: "orderProcess" },
    { id: "returns", label: "permintaan retur / refund", doneLabel: "Tidak ada retur terbuka", count: by(["return_refund"]), href: "/orders/returns", tone: "warning", capability: "cancelRefundRequest" },
    { id: "out", label: "produk stok habis", doneLabel: "Tidak ada stok habis", count: outOfStock, href: "/products/inventory", tone: "critical", capability: "catalogWrite" },
    { id: "low", label: "produk stok menipis", doneLabel: "Stok produk aman", count: lowStock, href: "/products/inventory", tone: "warning", capability: "catalogWrite" },
    { id: "sync", label: "produk gagal sinkron Shopee", doneLabel: "Sinkron Shopee lancar", count: syncErrors, href: "/products", tone: "critical", capability: "catalogWrite" },
  ];
}

/** Best sellers in the period, by units. */
export function topProducts(days: PeriodDays, channel: ChannelFilter = "all", limit = 5) {
  const end = DATA_ANCHOR.getTime() + DAY;
  const start = end - days * DAY;
  const tally = new Map<string, { name: string; sku: string; units: number; revenue: number }>();
  for (const o of DATED_ORDERS) {
    if (!counted(o) || (channel !== "all" && o.channel !== channel)) continue;
    if (o.createdAt.getTime() < start || o.createdAt.getTime() >= end) continue;
    for (const i of o.items) {
      const row = tally.get(i.sku) ?? { name: i.productName, sku: i.sku, units: 0, revenue: 0 };
      row.units += i.quantity;
      row.revenue += i.quantity * i.unitPrice;
      tally.set(i.sku, row);
    }
  }
  return [...tally.values()].sort((a, b) => b.units - a.units || b.revenue - a.revenue).slice(0, limit);
}

export const recentOrders = (limit = 6) => DATED_ORDERS.slice(0, limit);
