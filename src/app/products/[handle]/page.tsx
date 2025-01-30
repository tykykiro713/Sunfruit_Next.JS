import { Metadata } from 'next';
import { fetchProductByHandle } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails";

export async function generateMetadata({ 
  params 
}: { 
  params: { handle: string } 
}): Promise<Metadata> {
  const product = await fetchProductByHandle(params.handle);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({
  params 
}: { 
  params: { handle: string } 
}) {
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