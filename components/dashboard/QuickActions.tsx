"use client";

import Link from "next/link";
import {
  PackagePlus,
  Megaphone,
  LayoutTemplate,
  ShoppingBag,
  ImagePlus,
  ArrowUpRight,
  Truck,
  Boxes,
  PackageCheck,
  Users,
  BarChart3,
} from "lucide-react";
import { useSession } from "@/lib/auth/session-context";

export function QuickActions() {
  const { role } = useSession();

  const getActionsForRole = () => {
    switch (role) {
      case "AdminWarehouse":
        return [
          { href: "/orders/fulfillment", label: "Packing Pesanan", icon: PackageCheck },
          { href: "/orders/fulfillment", label: "Input Resi", icon: Truck },
          { href: "/products/inventory", label: "Stok Gudang", icon: Boxes },
          { href: "/orders", label: "Daftar Pesanan", icon: ShoppingBag },
        ];
      case "AdminDashboard":
        return [
          { href: "/products/new", label: "Tambah Produk", icon: PackagePlus },
          { href: "/marketing/promotions", label: "Buat Promosi", icon: Megaphone },
          { href: "/storefront/homepage", label: "Storefront CMS", icon: LayoutTemplate },
          { href: "/orders", label: "Pesanan Masuk", icon: ShoppingBag },
        ];
      case "Owner":
      default:
        return [
          { href: "/products/new", label: "Tambah Produk", icon: PackagePlus },
          { href: "/settings/integrations/shopee", label: "Integrasi Shopee", icon: ShoppingBag },
          { href: "/marketing/promotions", label: "Buat Promosi", icon: Megaphone },
          { href: "/settings/team", label: "Kelola Tim", icon: Users },
        ];
    }
  };

  const actions = getActionsForRole();

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
      {actions.map((action) => (
        <Link
          key={action.href + action.label}
          href={action.href}
          className="tap-target flex items-center justify-between rounded-xl border border-border bg-warm-white p-3 text-xs font-semibold text-ink shadow-2xs hover:border-karyalo-green hover:text-karyalo-green transition-colors"
        >
          <div className="flex items-center gap-2">
            <action.icon size={15} className="text-muted shrink-0" aria-hidden="true" />
            <span className="truncate">{action.label}</span>
          </div>
          <ArrowUpRight size={13} className="text-muted/50 shrink-0" />
        </Link>
      ))}
    </div>
  );
}
