import { ProductStatus } from "@/lib/data/catalog";

const LABEL: Record<ProductStatus, string> = {
  published: "Published",
  draft: "Draft",
  archived: "Arsip",
};

const STYLES: Record<ProductStatus, string> = {
  published: "bg-soft-sage text-status-success",
  draft: "bg-soft-sand text-muted",
  archived: "bg-terracotta-soft text-status-warning",
};

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${STYLES[status]}`}>
      {LABEL[status]}
    </span>
  );
}
