import { fetchProductByHandle } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails"; // Ensure this component is correctly imported
import type { PageProps } from "next";

export default async function ProductPage({ params }: PageProps<{ handle: string }>) {
  try {
    // Ensure params is properly awaited (fix TypeScript issue)
    const { handle } = await params;

    // Fetch the product data using the resolved `handle`
    const product = await fetchProductByHandle(handle);

    // Handle the case where the product is not found
    if (!product) {
      return notFound();
    }

    return (
      <div className="bg-white">
        <Header />
        <ProductDetails product={product} />
      </div>
    );
  } catch (error) {
    console.error("Error loading product page:", error);
    return notFound();
  }
}



