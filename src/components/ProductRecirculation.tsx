"use client";

import React, { useEffect, useState } from "react";
import { fetchProducts, ProductNode } from "@/lib/shopify";
import Link from "next/link";

interface ProductImage {
  url: string;
  altText: string | null;
}

export default function ProductRecirculation() {
  const [products, setProducts] = useState<ProductNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const fetchedProducts = await fetchProducts(12); // Fetch up to 12 products
        
        // Filter out the Sunfruit Sample Pack and limit to 4 products
        const filteredProducts = fetchedProducts
          .filter(product => !product.title.toLowerCase().includes('sample pack'))
          .slice(0, 4);
        
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        const error = err as { message: string };
        console.error("Error fetching products:", error);
        setError(error);
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Helper function to get product images
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

  // Get formatted price
  const getFormattedPrice = (product: ProductNode): string => {
    if (!product.priceRange?.minVariantPrice?.amount) {
      return "Price unavailable";
    }
    
    const amount = parseFloat(product.priceRange.minVariantPrice.amount);
    const currency = product.priceRange.minVariantPrice.currencyCode || "USD";
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  if (loading) return (
    <div className="bg-white py-16 w-full">
      <div className="flex justify-center">
        <div className="animate-pulse text-xl text-gray-500">Loading products...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-white py-16 w-full">
      <div className="flex justify-center">
        <div className="text-red-500">Error loading products: {error.message}</div>
      </div>
    </div>
  );

  return (
    <div className="bg-white w-full">
      <div className="py-16 w-full">
        <h2 className="text-3xl md:text-5xl font-poppins font-semibold font-bold tracking-tight text-emeraldgreen-500 mb-8 text-center">All Flavors</h2>
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
            {products.map((product) => {
              const productImages = getProductImages(product);
              const hasMultipleImages = productImages.length >= 2;
              
              return (
                <div key={product.id} className="group relative w-full">
                  <Link href={`/products/${product.handle}`}>
                    <div 
                      className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-200"
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      {productImages.length > 0 ? (
                        <>
                          {/* First image (always visible when not hovering) */}
                          <img
                            src={productImages[0]?.url}
                            alt={productImages[0]?.altText || product.title}
                            className={`w-full h-full object-contain group-hover:opacity-75 transition-opacity duration-300 ${
                              hoveredProduct === product.id && hasMultipleImages ? 'opacity-0' : 'opacity-100'
                            }`}
                          />

                          {/* Second image (visible on hover if available) */}
                          {hasMultipleImages && (
                            <img
                              src={productImages[1]?.url}
                              alt={productImages[1]?.altText || `${product.title} - Alternate View`}
                              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                                hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                              }`}
                            />
                          )}
                        </>
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="text-gray-500">No image available</span>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="mt-4 flex justify-center">
                    <div>
                      <h3 className="text-sm sm:text-base text-gray-700 text-center">
                        <Link href={`/products/${product.handle}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.title}
                        </Link>
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}