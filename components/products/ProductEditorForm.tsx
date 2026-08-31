"use client";

import { FormEvent, useState } from "react";
import { Info } from "lucide-react";
import { AdminProduct } from "@/lib/data/catalog";

/**
 * PRD §12.2 Product Editor. Simplifikasi Fase "mock dulu" — field inti
 * saja (nama, SKU, kategori, harga, stok, status), bukan full varian
 * matrix (§39 `VariantMatrix`, belum dibangun). Submit disimulasikan
 * (§37 Coding Rule 12 forms butuh schema validation client+server — baru
 * validasi client sederhana di sini, server tidak ada), TIDAK menulis ke
 * mana pun — konsisten dengan `OrderCommandBar`.
 */
export function ProductEditorForm({ product }: { product?: AdminProduct }) {
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-ink">Nama Produk</label>
        <input
          defaultValue={product?.name}
          required
          className="w-full rounded-lg border border-border bg-warm-white px-3.5 py-2.5 text-sm text-ink"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-ink">SKU</label>
          <input
            defaultValue={product?.sku}
            required
            className="w-full rounded-lg border border-border bg-warm-white px-3.5 py-2.5 text-sm text-ink"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-ink">Kategori</label>
          <input
            defaultValue={product?.categorySlug}
            required
            className="w-full rounded-lg border border-border bg-warm-white px-3.5 py-2.5 text-sm text-ink"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-ink">Harga (Rp)</label>
          <input
            type="number"
            defaultValue={product?.price}
            required
            min={0}
            className="w-full rounded-lg border border-border bg-warm-white px-3.5 py-2.5 text-sm text-ink"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-ink">Stok</label>
          <input
            type="number"
            defaultValue={product?.stock}
            required
            min={0}
            className="w-full rounded-lg border border-border bg-warm-white px-3.5 py-2.5 text-sm text-ink"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-ink">Status</label>
        <select
          defaultValue={product?.status ?? "draft"}
          className="w-full rounded-lg border border-border bg-warm-white px-3.5 py-2.5 text-sm text-ink"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Arsip</option>
        </select>
      </div>

      <button
        type="submit"
        className="tap-target self-start rounded-full bg-karyalo-green px-5 py-2.5 text-sm font-medium text-warm-white hover:opacity-90"
      >
        Simpan
      </button>

      {saved && (
        <div className="flex items-start gap-2 rounded-lg bg-soft-sand px-3 py-2 text-xs text-muted">
          <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
          Form ini disimulasikan — belum tersambung ke Catalog Service, perubahan tidak benar-benar tersimpan (Fase 3).
        </div>
      )}
    </form>
  );
}
