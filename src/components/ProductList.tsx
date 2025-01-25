"use client";

import React, { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/shopify";
import Link from "next/link";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-poppins font-semibold tracking-tight text-darkteal-500 sm:text-5xl text-center">
          Flavors
        </h2>
        {/*}
        <p className="mt-4 text-lg text-gray-600 text-center">
          Each flavor contains 1 organic fruit and 1 organic botanical
        </p>
        */}
        <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
          {products.map((product) => (
            <div key={product.id}>
              <Link href={`/products/${product.handle}`}>
                {/* Link wraps the media */}
                {product.media.edges.map(({ node }) => {
                  if (node.mediaContentType === "IMAGE") {
                    return (
                      <img
                        key={node.image.url}
                        src={node.image.url}
                        alt={node.image.altText || product.title}
                        className="aspect-[3/2] w-full rounded-lg object-cover"
                      />
                    );
                  }
                  if (node.mediaContentType === "VIDEO") {
                    return (
                      <video
                        key={node.sources[0]?.url}
                        controls
                        className="aspect-[3/2] w-full rounded-lg"
                      >
                        <source
                          src={node.sources[0]?.url}
                          type={node.sources[0]?.mimeType}
                        />
                      </video>
                    );
                  }
                  return null;
                })}
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
          ))}
        </div>
      </div>
    </div>
  );
}




