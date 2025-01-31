import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails";
import { fetchProductByHandle, fetchProducts } from "@/lib/shopify";

export default async function ProductPage(props: Promise<{ params: { handle: string } }>) {
  const { params } = await props; // ✅ Await the promise if needed
  console.log("🛠️ Product Page Params (after await):", params);

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

// ✅ Explicitly return a resolved Promise in generateStaticParams
export async function generateStaticParams(): Promise<{ handle: string }[]> {
  try {
    const products = await fetchProducts();
    console.log("📌 Generating Static Paths:", products);

    if (!products || products.length === 0) {
      console.warn("⚠️ No products found. Ensure Shopify API is returning products.");
      return [];
    }

    const paths = products.map((product) => {
      console.log("🛠️ Generated Params:", { handle: product.handle });
      return { handle: product.handle };
    });

    console.log("✅ Final Generated Paths:", paths);
    return paths;
  } catch (error) {
    console.error("❌ Error generating static params:", error);
    return [];
  }
}
