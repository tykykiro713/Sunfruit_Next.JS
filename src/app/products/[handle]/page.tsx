import { Metadata } from 'next';
import { fetchProductByHandle } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails";

type GenerateMetadataProps = {
  params: Promise<{ handle: string }>;
  searchParams?: { [key: string]: string | string[] | undefined };
};

type PageProps = {
  params: { handle: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: GenerateMetadataProps
): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await fetchProductByHandle(resolvedParams.handle);

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

export default async function ProductPage({ params }: PageProps) {
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