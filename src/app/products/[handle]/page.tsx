import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { fetchProductByHandle, fetchProducts } from "@/lib/shopify";
import ProductMedia from "@/components/ProductMedia";
import ProductInfo from "@/components/ProductInfo";
import ProductForm from "@/components/ProductForm";
import ProductAccordion from "@/components/ProductAccordion";
import Circle_Testimonial from "@/components/Circle_Testimonial";
import ProductHeroSplit from "@/components/ProductHeroSplit";
import ProductRecirculation from "@/components/ProductRecirculation";
import SampleCTA from "@/components/SampleCTA";
import Faqs from "@/components/Faqs";
import Footer from "@/components/Footer";

// @ts-expect-error - Next.js App Router typing issue
export default async function ProductPage({ params, searchParams }) {
  if (!params?.handle) {
    throw new Error("❌ Params handle is missing!");
  }

  const product = await fetchProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main>
        {/* Product details section - constrained width on mobile, full width on desktop */}
        <div className="px-4 py-8 sm:px-6 sm:py-16 md:py-24 lg:py-32 lg:px-0">
          <div className="mx-auto max-w-2xl lg:max-w-none lg:px-8 xl:px-16">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              {/* Left column - Product Media */}
              <ProductMedia product={product} />

              {/* Right column - Product Info & Form */}
              <div className="mt-10 px-4 sm:mt-16 sm:px-6 lg:mt-0 lg:px-8 xl:px-12">
                <ProductInfo product={product} />
                <ProductForm product={product} />
                <ProductAccordion />
              </div>
            </div>
          </div>
        </div>

        {/* Full width sections */}
        <div>
          <Circle_Testimonial />
          <ProductHeroSplit />
        </div>
        
        {/* Product recirculation section - constrained width on mobile, full width on desktop */}
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-8 xl:px-16">
          <ProductRecirculation />
        </div>

        {/* Faqs and Footer section - constrained width on mobile, full width on desktop */}
        <div>
          <SampleCTA />
          <Faqs />
          <Footer />
        </div>
      </main>
    </div>
  );
}

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