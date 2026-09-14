"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Settings2 } from "lucide-react";
import { ORDERS } from "@/lib/data/orders";
import { OrderList } from "@/components/orders/OrderList";

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

  const readyCount = shopeeOrders.filter(
    (o) => o.status === "new" || o.status === "processing" || o.status === "fulfillment"
  ).length;
  const shippedCount = shopeeOrders.filter((o) => o.status === "shipped").length;
  const completedCount = shopeeOrders.filter((o) => o.status === "completed").length;
  const cancelledCount = shopeeOrders.filter(
    (o) => o.status === "cancelled" || o.status === "return_refund"
  ).length;

  return (
    <div className="mx-auto w-full max-w-(--container-wide) min-w-0 px-3.5 py-5 sm:px-6 sm:py-7 box-border">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Link
          href="/orders"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft size={13} aria-hidden="true" />
          <span>Semua Pesanan</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between min-w-0 border-b border-border/70 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">Pesanan Shopee</h1>
            <span className="rounded-md bg-[#ee4d2d]/10 px-2 py-0.5 text-xs font-semibold text-[#ee4d2d]">
              OpenAPI v2
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted">
            Daftar transaksi tersinkronisasi otomatis dari toko Shopee.
          </p>
        </div>

        <Link
          href="/settings/integrations/shopee"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-warm-white px-3 py-1.5 text-xs font-medium text-ink shadow-2xs hover:border-karyalo-green transition-colors"
        >
          <Settings2 size={13} className="text-muted" />
          <span>Pengaturan Shopee</span>
        </Link>
      </div>

      {/* Status Filter Tabs */}
      <div className="mb-4 flex w-full max-w-full min-w-0 items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 overscroll-x-contain">
        <button
          type="button"
          onClick={() => setSelectedStatus("all")}
          className={`tap-target inline-flex h-8 shrink-0 items-center justify-center rounded-lg px-3 text-xs font-medium transition-colors ${
            selectedStatus === "all"
              ? "bg-deep-pine text-warm-white font-semibold shadow-2xs"
              : "border border-border bg-warm-white text-muted hover:text-ink"
          }`}
        >
          Semua ({shopeeOrders.length})
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus("ready_to_ship")}
          className={`tap-target inline-flex h-8 shrink-0 items-center justify-center rounded-lg px-3 text-xs font-medium transition-colors ${
            selectedStatus === "ready_to_ship"
              ? "bg-deep-pine text-warm-white font-semibold shadow-2xs"
              : "border border-border bg-warm-white text-muted hover:text-ink"
          }`}
        >
          Siap Dikirim ({readyCount})
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus("shipped")}
          className={`tap-target inline-flex h-8 shrink-0 items-center justify-center rounded-lg px-3 text-xs font-medium transition-colors ${
            selectedStatus === "shipped"
              ? "bg-deep-pine text-warm-white font-semibold shadow-2xs"
              : "border border-border bg-warm-white text-muted hover:text-ink"
          }`}
        >
          Dalam Pengiriman ({shippedCount})
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus("completed")}
          className={`tap-target inline-flex h-8 shrink-0 items-center justify-center rounded-lg px-3 text-xs font-medium transition-colors ${
            selectedStatus === "completed"
              ? "bg-deep-pine text-warm-white font-semibold shadow-2xs"
              : "border border-border bg-warm-white text-muted hover:text-ink"
          }`}
        >
          Selesai ({completedCount})
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus("cancelled")}
          className={`tap-target inline-flex h-8 shrink-0 items-center justify-center rounded-lg px-3 text-xs font-medium transition-colors ${
            selectedStatus === "cancelled"
              ? "bg-deep-pine text-warm-white font-semibold shadow-2xs"
              : "border border-border bg-warm-white text-muted hover:text-ink"
          }`}
        >
          Dibatalkan ({cancelledCount})
        </button>
      </div>

      {/* Order List */}
      <OrderList orders={filteredOrders} />
    </div>
  );
}
