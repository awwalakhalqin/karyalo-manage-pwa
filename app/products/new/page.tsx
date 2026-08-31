import { ProductEditorForm } from "@/components/products/ProductEditorForm";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-4 text-xl font-semibold text-ink md:text-2xl">Tambah Produk</h1>
      <SampleDataBanner />
      <ProductEditorForm />
    </div>
  );
}
