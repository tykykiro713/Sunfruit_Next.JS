import { fetchProductByHandle } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails";

// ✅ Correct the type definition for Next.js App Router
interface ProductPageProps {
  params: { handle: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Ensure `params` is correctly structured
  const { handle } = params;

  // Fetch product by handle
  const product = await fetchProductByHandle(handle);

  // Handle case where the product is not found
  if (!product) {
    return notFound();
  }

  return (
    <div className="bg-white">
      <Header />
      <ProductDetails product={product} />
    </div>
  );
}

