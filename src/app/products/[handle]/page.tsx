import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails";
import { fetchProductByHandle, fetchProducts } from "@/lib/shopify";

export default async function ProductPage({ params }: { params: { handle: string } }) {
  console.log("Product Page Params:", params); // Debugging log

  if (!params?.handle) {
    return notFound();
  }

  const product = await fetchProductByHandle(params.handle);
  console.log("Fetched product:", product); // Debugging log

  if (!product) {
    return notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductDetails product={product} />
      </main>
    </div>
  );
}

// ✅ Explicit return type for generateStaticParams
export async function generateStaticParams(): Promise<{ handle: string }[]> {
  try {
    const products = await fetchProducts();
    console.log("Generating Static Paths:", products); // Debugging log

    if (!products || products.length === 0) {
      console.warn("⚠️ No products found. Ensure Shopify API is returning products.");
      return [];
    }

    return products.map((product) => ({ handle: product.handle }));
  } catch (error) {
    console.error("❌ Error generating static params:", error);
    return [];
  }
}
