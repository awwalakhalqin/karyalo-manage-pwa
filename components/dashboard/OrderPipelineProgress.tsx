import Link from "next/link";
import { Sparkles, Clock, PackageCheck, Truck, ChevronRight } from "lucide-react";

interface PipelineStage {
  id: string;
  label: string;
  count: number;
  href: string;
  icon: typeof Sparkles;
}

const STAGES: PipelineStage[] = [
  {
    id: "new",
    label: "Pesanan Baru",
    count: 2,
    href: "/orders",
    icon: Sparkles,
  },
  {
    id: "payment",
    label: "Belum Bayar",
    count: 1,
    href: "/orders/payment-issues",
    icon: Clock,
  },
  {
    id: "processing",
    label: "Siap Dipacking",
    count: 2,
    href: "/orders/fulfillment",
    icon: PackageCheck,
  },
  {
    id: "fulfillment",
    label: "Dalam Pengiriman",
    count: 2,
    href: "/orders",
    icon: Truck,
  },
];

export function OrderPipelineProgress() {
  return (
    <div className="rounded-2xl border border-border/80 bg-warm-white p-4 sm:p-5 shadow-xs">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
          Alur Pemrosesan Pesanan
        </h3>
        <Link
          href="/orders"
          className="tap-target inline-flex items-center gap-1 text-xs font-medium text-karyalo-green hover:underline"
        >
          <span>Daftar Order</span>
          <ChevronRight size={13} aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {STAGES.map((stage) => {
          const Icon = stage.icon;
          return (
            <Link
              key={stage.id}
              href={stage.href}
              className="tap-target flex flex-col justify-between rounded-xl border border-border/70 bg-soft-sand/30 p-3 transition-colors hover:border-karyalo-green/40 hover:bg-soft-sand/60"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted">
                  {stage.label}
                </span>
                <Icon size={14} className="text-muted" aria-hidden="true" />
              </div>

              <span className="mt-2 text-xl font-bold tracking-tight text-ink tabular-nums sm:text-2xl">
                {stage.count}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
