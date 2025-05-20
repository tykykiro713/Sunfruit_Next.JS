// @ts-ignore - Fix for NextConfig type issue
import dotenv from "dotenv";

dotenv.config(); // Load .env.local manually

/** @type {import('next').Config} */
const config = {
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
  // Note: We're no longer using webpack configuration for SVG imports
  // since we're using inline SVG components instead
};

export default config;