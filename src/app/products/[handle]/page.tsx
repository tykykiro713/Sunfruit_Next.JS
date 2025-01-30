import { fetchProductByHandle } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails"; // Ensure this component is correctly imported

interface ProductPageProps {
  params: { handle: string }; // ✅ Correct type for params
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    // Fetch product by handle
    const product = await fetchProductByHandle(params.handle);

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




