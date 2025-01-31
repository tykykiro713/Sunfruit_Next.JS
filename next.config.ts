import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config(); // Load .env.local manually

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add experimental flag for proper module support
  experimental: {
    esmExternals: true,
  },
  env: {
    SHOPIFY_API_URL: process.env.SHOPIFY_API_URL,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  },
};

export default config;
