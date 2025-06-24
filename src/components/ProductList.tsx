"use client";

import React, { useEffect, useState } from "react";
import { fetchProducts, ProductNode } from "@/lib/shopify";
import Link from "next/link";
import Image from "next/image";

interface ErrorWithMessage {
  message: string;
}

interface ProductImage {
  url: string;
  altText: string | null;
}

export default function ProductList() {
  const [products, setProducts] = useState<ProductNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorWithMessage | null>(null);
  const [hoveredProducts, setHoveredProducts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadProducts() {
      try {
        const fetchedProducts = await fetchProducts();
        console.log("Fetched products:", fetchedProducts);
        
        // Filter out the Sunfruit Sample Pack and limit to 4 products
        const filteredProducts = fetchedProducts
          .filter(product => !product.title.toLowerCase().includes('sample pack'))
          .slice(0, 4);
        
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        const error = err as ErrorWithMessage;
        console.error("Error fetching products:", error);
        setError(error);
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleMouseEnter = (productId: string) => {
    setHoveredProducts(prev => ({ ...prev, [productId]: true }));
  };

  const handleMouseLeave = (productId: string) => {
    setHoveredProducts(prev => ({ ...prev, [productId]: false }));
  };

  // More robust function to get product images
  const getProductImages = (product: ProductNode): ProductImage[] => {
    // First try to get images from media edges
    const mediaImages = product.media?.edges
      ?.filter(edge => 
        edge.node?.mediaContentType === "IMAGE" && 
        edge.node?.image?.url
      )
      .map(edge => edge.node.image);
    
    if (mediaImages && mediaImages.length > 0) {
      // Filter out any undefined values before returning
      return mediaImages.filter((image): image is ProductImage => image !== undefined);
    }
    
    // If no media images, try product images
    const productImages = product.images?.edges
      ?.map(edge => edge.node);
    
    if (productImages && productImages.length > 0) {
      // Filter out any undefined values before returning
      return productImages.filter((image): image is ProductImage => image !== undefined);
    }
    
    // No images found
    return [];
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-poppins font-semibold tracking-tight text-emeraldgreen-500 sm:text-5xl text-center">
          Sunfruit Flavors
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
          {products.map((product, index) => {
            // Get images for this product
            const productImages = getProductImages(product);
            const hasMultipleImages = productImages.length >= 2;
            const isHovered = hoveredProducts[product.id] || false;
            
            return (
              <div key={product.id}>
                <Link href={`/products/${product.handle}`}>
                  <div 
                    className="relative aspect-[3/2] w-full overflow-hidden rounded-lg"
                    onMouseEnter={() => handleMouseEnter(product.id)}
                    onMouseLeave={() => handleMouseLeave(product.id)}
                  >
                    {productImages.length > 0 ? (
                      <>
                        {/* First image - with optimized lazy loading */}
                        <div
                          className="w-full h-full transition-opacity duration-300 lg:absolute lg:inset-0"
                          style={{
                            opacity: isHovered && hasMultipleImages ? 0 : 1
                          }}
                        >
                          <Image
                            src={productImages[0]?.url}
                            alt={productImages[0]?.altText || product.title}
                            width={800}
                            height={533}
                            className="w-full h-full object-cover rounded-lg"
                            // LAZY LOADING: All products are below the fold
                            loading="lazy"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAwDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0Dp9R6WxagHJ6PPRgACw2UE7gY+1axTKMYt8K5xUbhqq/HSIZeeOXIy03jBELFYhEchT5c3RmfavhJbAHDUPGkREyLAMR7WNuqxJNK//2Q=="
                          />
                        </div>

                        {/* Second image (visible on hover for desktop only) - always lazy loaded */}
                        {hasMultipleImages && (
                          <div
                            className="hidden lg:block absolute inset-0 w-full h-full transition-opacity duration-300 pointer-events-none lg:pointer-events-auto"
                            style={{
                              opacity: isHovered ? 1 : 0
                            }}
                          >
                            <Image
                              src={productImages[1]?.url}
                              alt={productImages[1]?.altText || `${product.title} - Alternate View`}
                              width={800}
                              height={533}
                              className="w-full h-full object-cover rounded-lg"
                              loading="lazy" // Always lazy load hover images
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      // Fallback if no images are available
                      <div className="aspect-[3/2] w-full rounded-lg bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No image available</span>
                      </div>
                    )}
                  </div>
                </Link>
                <div className="mt-8">
                  <Link
                    href={`/products/${product.handle}`}
                    className="text-lg font-bold text-gray-900 hover:underline"
                  >
                    {product.title}
                  </Link>
                  <p className="mt-2 text-base text-gray-600">
                    {product.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}