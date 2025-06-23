/** @type {import('next').NextConfig} */
const nextConfig = {
  // React configuration
  reactStrictMode: true,
  
  // Performance optimizations
  productionBrowserSourceMaps: false,
  
  // Image optimization - keeping your existing pattern
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
    ],
    // Add modern formats for better performance
    formats: ['image/avif', 'image/webp'],
    // Optional: Add image size optimizations
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Keep your ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Experimental features
  experimental: {
    // Keep your existing ESM externals setting
    esmExternals: true,
    
    // Add performance optimizations
    optimizeCss: true,
    
    // Optimize imports for packages you use
    optimizePackageImports: [
      '@heroicons/react',
      '@headlessui/react',
      '@apollo/client',
      'graphql',
    ],
  },
  
  // Environment variables - keeping your existing ones
  env: {
    SHOPIFY_API_URL: process.env.SHOPIFY_API_URL,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  },
  
  // Optional: Add compiler optimizations
  compiler: {
    // Remove console logs in production (except errors and warnings)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Optional: Add caching headers for better performance
  async headers() {
    return [
      {
        // Cache static assets
        source: '/images/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

// No need to import dotenv here - Next.js handles .env.local automatically
export default nextConfig;