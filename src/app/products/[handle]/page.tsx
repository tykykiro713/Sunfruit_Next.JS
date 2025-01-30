import { Metadata } from 'next';
import { fetchProductByHandle } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails";

interface PageParams {
  handle: string;
}

interface GenerateMetadataProps {
  params: PageParams;
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  props: GenerateMetadataProps
): Promise<Metadata> {
  const product = await fetchProductByHandle(props.params.handle);

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
  params,
  searchParams,
}: {
  params: PageParams;
  searchParams: { [key: string]: string | string[] | undefined };
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