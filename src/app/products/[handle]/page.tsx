import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails";
import { fetchProductByHandle, fetchProducts } from "@/lib/shopify";

interface ProductPageProps {
  params: {
    handle: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Ensure params.handle is correctly received
  if (!params || !params.handle) {
    return notFound();
  }

  const product = await fetchProductByHandle(params.handle);

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

// Pre-generate static paths for known products
export async function generateStaticParams() {
  try {
    const products = await fetchProducts();
    return products.map((product: { handle: string }) => ({ handle: product.handle }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}