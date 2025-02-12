import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails";
import { fetchProductByHandle, fetchProducts, ProductNode } from "@/lib/shopify";
import { Product } from "@/types/product";

function convertShopifyProduct(shopifyProduct: ProductNode): Product {
  return {
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    priceRange: shopifyProduct.priceRange,
    images: {
      edges: shopifyProduct.images.edges.map(edge => ({
        node: {
          url: edge.node.url,
          altText: edge.node.altText || null
        }
      }))
    },
    media: {
      edges: shopifyProduct.media.edges.map(edge => ({
        node: {
          mediaContentType: edge.node.mediaContentType,
          alt: edge.node.mediaContentType === 'VIDEO' ? null : edge.node.image?.altText || null,
          image: edge.node.image ? {
            url: edge.node.image.url,
            altText: edge.node.image.altText || null
          } : undefined,
          previewImage: edge.node.previewImage ? {
            image: {
              url: edge.node.previewImage.url,
              altText: null
            }
          } : undefined,
          sources: edge.node.sources?.map(source => ({
            url: source.url,
            mimeType: source.mimeType
          }))
        }
      }))
    }
  };
}

interface PageProps {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ProductPage = async ({ params, searchParams }: PageProps) => {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams]);

  if (!resolvedParams?.handle) {
    throw new Error("❌ Params handle is missing!");
  }

  const shopifyProduct = await fetchProductByHandle(resolvedParams.handle);

  if (!shopifyProduct) {
    notFound();
  }

  const product = convertShopifyProduct(shopifyProduct);

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductDetails product={product} />
      </main>
    </div>
  );
};

export default ProductPage;

export async function generateStaticParams() {
  try {
    const products = await fetchProducts();
    return products?.map((product) => ({
      handle: product.handle,
    })) ?? [];
  } catch (error) {
    console.error("❌ Error generating static params:", error);
    return [];
  }
}