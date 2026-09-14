import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";

export function ActionRequiredCard() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/80 bg-warm-white px-4 py-3 shadow-2xs">
      <div className="flex items-center gap-2.5 text-xs">
        <CheckCircle2 size={15} className="text-karyalo-green shrink-0" aria-hidden="true" />
        <span className="font-medium text-ink">Semua pesanan berjalan normal</span>
      </div>
      <Link
        href="/orders"
        className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink transition-colors"
      >
        <span>Lihat Order</span>
        <ChevronRight size={13} />
      </Link>
    </div>
  );
}
