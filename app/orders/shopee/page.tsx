"use client";

import { useState } from "react";
import Link from "next/link";
import { Settings2, ShoppingBag, PackageCheck, Truck, CheckCircle2, XCircle } from "lucide-react";
import { ORDERS, AdminOrder } from "@/lib/data/orders";
import { OrderList } from "@/components/orders/OrderList";
import { OrderFilterTabs } from "@/components/orders/OrderFilterTabs";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

type ShopeeStatusFilter = "all" | "ready_to_ship" | "shipped" | "completed" | "cancelled";

export default function ShopeeOrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState<ShopeeStatusFilter>("all");

  const shopeeOrders = ORDERS.filter((o) => o.channel === "shopee");

  const filteredOrders = shopeeOrders.filter((order) => {
    if (selectedStatus === "all") return true;
    if (selectedStatus === "ready_to_ship") {
      return order.status === "new" || order.status === "processing" || order.status === "fulfillment";
    }
    if (selectedStatus === "shipped") {
      return order.status === "shipped";
    }
    if (selectedStatus === "completed") {
      return order.status === "completed";
    }
    if (selectedStatus === "cancelled") {
      return order.status === "cancelled" || order.status === "return_refund";
    }
    return true;
  });

  // Hitung jumlah per status
  const readyCount = shopeeOrders.filter(
    (o) => o.status === "new" || o.status === "processing" || o.status === "fulfillment"
  ).length;
  const shippedCount = shopeeOrders.filter((o) => o.status === "shipped").length;
  const completedCount = shopeeOrders.filter((o) => o.status === "completed").length;
  const cancelledCount = shopeeOrders.filter(
    (o) => o.status === "cancelled" || o.status === "return_refund"
  ).length;

  return (
    <div className="mx-auto w-full max-w-(--container-wide) min-w-0 px-3.5 py-5 sm:px-6 sm:py-8 box-border">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between min-w-0">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">Pesanan Shopee</h1>
            <span className="rounded-md bg-[#ee4d2d]/10 px-2 py-0.5 text-xs font-semibold text-[#ee4d2d]">
              OpenAPI v2.0
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted sm:text-sm">
            Tabel status pesanan tersinkronisasi real-time via Shopee OpenAPI v2 (v2.order).
          </p>
        </div>
        <Link
          href="/settings/integrations/shopee"
          className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-border bg-warm-white px-3.5 text-xs font-semibold text-ink shadow-xs transition-colors hover:border-karyalo-green"
        >
          <Settings2 size={14} className="text-muted" />
          <span>Pengaturan Sync Shopee</span>
        </Link>
      </div>

      <SampleDataBanner note="Data pesanan Shopee disinkronkan real-time dari skema Shopee OpenAPI v2 (v2.order.get_order_list & get_order_detail)." />

      <OrderFilterTabs />

      {/* Shopee Order Status Filters (Siap Dikirim, Dalam Pengiriman, Selesai, Dibatalkan) */}
      <div className="mb-4 flex w-full max-w-full min-w-0 items-center gap-2 overflow-x-auto pb-1 sm:pb-0 overscroll-x-contain">
        <button
          type="button"
          onClick={() => setSelectedStatus("all")}
          className={`tap-target inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-xl px-3.5 text-xs font-semibold transition-all ${
            selectedStatus === "all"
              ? "bg-[#ee4d2d] text-warm-white shadow-xs"
              : "border border-border bg-warm-white text-ink hover:border-[#ee4d2d] hover:bg-[#ee4d2d]/5"
          }`}
        >
          <ShoppingBag size={13} />
          <span>Semua ({shopeeOrders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus("ready_to_ship")}
          className={`tap-target inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-xl px-3.5 text-xs font-semibold transition-all ${
            selectedStatus === "ready_to_ship"
              ? "bg-deep-pine text-warm-white shadow-xs"
              : "border border-border bg-warm-white text-ink hover:border-karyalo-green hover:bg-soft-sand"
          }`}
        >
          <PackageCheck size={13} />
          <span>Siap Dikirim ({readyCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus("shipped")}
          className={`tap-target inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-xl px-3.5 text-xs font-semibold transition-all ${
            selectedStatus === "shipped"
              ? "bg-deep-pine text-warm-white shadow-xs"
              : "border border-border bg-warm-white text-ink hover:border-karyalo-green hover:bg-soft-sand"
          }`}
        >
          <Truck size={13} />
          <span>Dalam Pengiriman ({shippedCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus("completed")}
          className={`tap-target inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-xl px-3.5 text-xs font-semibold transition-all ${
            selectedStatus === "completed"
              ? "bg-deep-pine text-warm-white shadow-xs"
              : "border border-border bg-warm-white text-ink hover:border-karyalo-green hover:bg-soft-sand"
          }`}
        >
          <CheckCircle2 size={13} />
          <span>Selesai ({completedCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus("cancelled")}
          className={`tap-target inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-xl px-3.5 text-xs font-semibold transition-all ${
            selectedStatus === "cancelled"
              ? "bg-deep-pine text-warm-white shadow-xs"
              : "border border-border bg-warm-white text-ink hover:border-karyalo-green hover:bg-soft-sand"
          }`}
        >
          <XCircle size={13} />
          <span>Dibatalkan ({cancelledCount})</span>
        </button>
      </div>

      {/* Order List Table */}
      <OrderList orders={filteredOrders} />
    </div>
  );
}
