import { fetchProductByHandle } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails"; // Ensure this component is correctly imported

export default async function ProductPage({ params }: { params: { handle: string } }) {
  // Destructure `handle` from `params` for clarity
  const { handle } = params;

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
}


