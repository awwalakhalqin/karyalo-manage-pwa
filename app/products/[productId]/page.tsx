import { notFound } from "next/navigation";
import { getProductById, getAllProducts } from "@/lib/data/catalog";
import { ProductEditorForm } from "@/components/products/ProductEditorForm";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ productId: p.id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await getProductById(productId);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-1 text-xl font-semibold text-ink md:text-2xl">{product.name}</h1>
      <p className="mb-4 text-sm text-muted">Terakhir diperbarui {product.updatedAtLabel}</p>
      <SampleDataBanner />
      <ProductEditorForm product={product} />
    </div>
  );
}
