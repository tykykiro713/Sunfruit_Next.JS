import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails";
import { fetchProductByHandle, fetchProducts } from "@/lib/shopify";

// ✅ Force Next.js to recognize params correctly
export default async function ProductPage(props: any) {
  const params = props.params as { handle: string }; // ✅ Override incorrect type inference

  console.log("🛠️ Page Props:", params);

  if (!params?.handle) {
    console.error("🚨 Missing params.handle - Throwing Error!");
    throw new Error("❌ Params handle is missing!");
  }

  const product = await fetchProductByHandle(params.handle);
  console.log("Fetched product:", product);

  if (!product) {
    console.error("🚨 Product not found for handle:", params.handle);
    throw new Error(`❌ Product not found for handle: ${params.handle}`);
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

// ✅ Ensure generateStaticParams properly resolves values
export async function generateStaticParams(): Promise<{ handle: string }[]> {
  try {
    const products: { handle: string }[] = await fetchProducts();
    console.log("📌 Generating Static Paths:", products);

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
