/**
 * Data katalog CONTOH (demo) — Fase 3 preview, atas permintaan pemilik
 * proyek ("mock dulu kayak yg storefront", 16 Agustus 2026). Isi produk
 * SENGAJA dipakai ulang dari `Karyalo_Storefront_PWA/lib/data/products.ts`
 * (nama/SKU/harga/kategori persis sama) — dua prototype ini mensimulasikan
 * TOKO YANG SAMA, jadi datanya harus konsisten, bukan katalog fiktif yang
 * tidak berhubungan. Field admin-spesifik (status, lowStock, updatedAt)
 * ditambahkan di sini karena tidak relevan untuk storefront.
 *
 * PRD §37 Coding Rule 21 melarang fake ORDER/STOCK/SALES *production*
 * data — ini dipatuhi dengan cara: (1) semua halaman yang memakai file ini
 * WAJIB memasang `SampleDataBanner`, (2) Dashboard (`/`) TIDAK memakai
 * file ini sama sekali. Stok di bawah adalah angka contoh untuk
 * mendemonstrasikan UI (badge low-stock, dst.), bukan klaim inventori
 * sungguhan.
 *
 * TODO integrasi: ganti ke Catalog Service API begitu Admin BFF ada,
 * seperti storefront — semua fungsi di bawah sudah `async`.
 */

export type ProductStatus = "published" | "draft" | "archived";

export interface AdminProduct {
  id: string;
  sku: string;
  name: string;
  categorySlug: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  status: ProductStatus;
  image: string;
  updatedAtLabel: string;
}

export interface Category {
  slug: string;
  name: string;
  productCount: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  productCount: number;
  status: ProductStatus;
}

export const CATEGORIES: Category[] = [
  { slug: "wanita", name: "Wanita", productCount: 4 },
  { slug: "pria", name: "Pria", productCount: 4 },
  { slug: "sepatu", name: "Sepatu", productCount: 4 },
  { slug: "tas", name: "Tas", productCount: 3 },
  { slug: "aksesoris", name: "Aksesoris", productCount: 3 },
];

export const COLLECTIONS: Collection[] = [
  { id: "col-01", name: "Baru Tiba", description: "Produk yang baru ditambahkan minggu ini.", productCount: 3, status: "published" },
  { id: "col-02", name: "Paling Laris", description: "Produk dengan penjualan tertinggi.", productCount: 3, status: "published" },
  { id: "col-03", name: "Sedang Diskon", description: "Produk dengan harga coret.", productCount: 4, status: "published" },
  { id: "col-04", name: "Koleksi Lebaran", description: "Draft untuk kampanye musiman berikutnya.", productCount: 0, status: "draft" },
];

export const PRODUCTS: AdminProduct[] = [
  { id: "p01", sku: "KRY-WN-001", name: "Blouse Linen Wanita — Krem", categorySlug: "wanita", price: 189000, stock: 24, lowStockThreshold: 10, status: "published", image: "/mock/product-placeholder.svg", updatedAtLabel: "14 Agustus 2026" },
  { id: "p02", sku: "KRY-WN-002", name: "Dress Midi Rayon — Navy", categorySlug: "wanita", price: 259000, stock: 15, lowStockThreshold: 10, status: "published", image: "/mock/product-placeholder.svg", updatedAtLabel: "12 Agustus 2026" },
  { id: "p03", sku: "KRY-WN-003", name: "Rok Plisket Wanita — Hitam", categorySlug: "wanita", price: 175000, stock: 30, lowStockThreshold: 10, status: "published", image: "/mock/product-placeholder.svg", updatedAtLabel: "10 Agustus 2026" },
  { id: "p04", sku: "KRY-WN-004", name: "Cardigan Rajut — Sage", categorySlug: "wanita", price: 219000, stock: 8, lowStockThreshold: 10, status: "published", image: "/mock/product-placeholder.svg", updatedAtLabel: "9 Agustus 2026" },
  { id: "p05", sku: "KRY-PR-001", name: "Kemeja Katun Pria — Putih", categorySlug: "pria", price: 199000, stock: 40, lowStockThreshold: 10, status: "published", image: "/mock/product-placeholder.svg", updatedAtLabel: "15 Agustus 2026" },
  { id: "p06", sku: "KRY-PR-002", name: "Kaos Polos Pria — Navy", categorySlug: "pria", price: 89000, stock: 55, lowStockThreshold: 15, status: "published", image: "/mock/product-placeholder.svg", updatedAtLabel: "8 Agustus 2026" },
  { id: "p07", sku: "KRY-PR-003", name: "Celana Chino Pria — Khaki", categorySlug: "pria", price: 229000, stock: 0, lowStockThreshold: 10, status: "published", image: "/mock/product-placeholder.svg", updatedAtLabel: "5 Agustus 2026" },
  { id: "p08", sku: "KRY-PR-004", name: "Jaket Denim Pria — Biru", categorySlug: "pria", price: 329000, stock: 12, lowStockThreshold: 10, status: "published", image: "/mock/product-placeholder.svg", updatedAtLabel: "11 Agustus 2026" },
  { id: "p09", sku: "KRY-SP-001", name: "Sneakers Canvas — Putih", categorySlug: "sepatu", price: 249000, stock: 60, lowStockThreshold: 15, status: "published", image: "/mock/product-placeholder.svg", updatedAtLabel: "13 Agustus 2026" },
  { id: "p10", sku: "KRY-SP-002", name: "Sandal Slide — Krem", categorySlug: "sepatu", price: 129000, stock: 45, lowStockThreshold: 15, status: "published", image: "/mock/product-placeholder.svg", updatedAtLabel: "7 Agustus 2026" },
  { id: "p11", sku: "KRY-SP-003", name: "Flat Shoes Wanita — Hitam", categorySlug: "sepatu", price: 179000, stock: 22, lowStockThreshold: 10, status: "published", image: "/mock/product-placeholder.svg", updatedAtLabel: "6 Agustus 2026" },
  { id: "p12", sku: "KRY-SP-004", name: "Boots Chelsea — Cokelat", categorySlug: "sepatu", price: 389000, stock: 4, lowStockThreshold: 10, status: "published", image: "/mock/product-placeholder.svg", updatedAtLabel: "4 Agustus 2026" },
  { id: "p13", sku: "KRY-TS-001", name: "Tote Bag Kanvas — Natural", categorySlug: "tas", price: 149000, stock: 50, lowStockThreshold: 15, status: "published", image: "/mock/product-placeholder.svg", updatedAtLabel: "3 Agustus 2026" },
  { id: "p14", sku: "KRY-TS-002", name: "Sling Bag Mini — Terracotta", categorySlug: "tas", price: 165000, stock: 20, lowStockThreshold: 10, status: "published", image: "/mock/product-placeholder.svg", updatedAtLabel: "2 Agustus 2026" },
  { id: "p15", sku: "KRY-TS-003", name: "Ransel Harian — Navy", categorySlug: "tas", price: 279000, stock: 28, lowStockThreshold: 10, status: "draft", image: "/mock/product-placeholder.svg", updatedAtLabel: "16 Agustus 2026" },
  { id: "p16", sku: "KRY-AK-001", name: "Kacamata Hitam Bulat", categorySlug: "aksesoris", price: 99000, stock: 40, lowStockThreshold: 10, status: "published", image: "/mock/product-placeholder.svg", updatedAtLabel: "1 Agustus 2026" },
  { id: "p17", sku: "KRY-AK-002", name: "Jam Tangan Minimalis — Navy", categorySlug: "aksesoris", price: 259000, stock: 17, lowStockThreshold: 10, status: "published", image: "/mock/product-placeholder.svg", updatedAtLabel: "31 Juli 2026" },
  { id: "p18", sku: "KRY-AK-003", name: "Scarf Motif — Earth Tone", categorySlug: "aksesoris", price: 79000, stock: 35, lowStockThreshold: 10, status: "archived", image: "/mock/product-placeholder.svg", updatedAtLabel: "20 Juli 2026" },
];

export async function getAllProducts(): Promise<AdminProduct[]> {
  return PRODUCTS;
}

export async function getProductById(id: string): Promise<AdminProduct | null> {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}

export async function getCollections(): Promise<Collection[]> {
  return COLLECTIONS;
}

export async function getLowStockProducts(): Promise<AdminProduct[]> {
  return PRODUCTS.filter((p) => p.stock <= p.lowStockThreshold);
}

export async function getOutOfStockProducts(): Promise<AdminProduct[]> {
  return PRODUCTS.filter((p) => p.stock === 0);
}
