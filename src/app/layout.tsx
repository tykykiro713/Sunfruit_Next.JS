// Optimized layout.tsx for critical performance improvements
// ========================================
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import GoogleAdsTag from "@/components/GoogleAdsTag";
import ClientProviders from "@/components/ClientProviders";
import "@/lib/recharge/client"; // Initialize Recharge SDK

// CRITICAL: Changed font loading strategy for production
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap", // Changed from "optional" - faster initial render
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", 
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false, // Only preload critical fonts
  fallback: ['monospace'],
});

// CRITICAL: Reduce Poppins font weights to minimize download
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Keep all - you're using them!
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* CRITICAL: More aggressive resource hints */}
        <link rel="dns-prefetch" href="//cdn.shopify.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* CRITICAL: Preconnect to critical domains only */}
        <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* CRITICAL: Preload only the most critical assets */}
        <link 
          rel="preload" 
          as="image" 
          type="image/svg+xml" 
          href="/images/Sunfruit_Green_Logo.svg"
          fetchPriority="high"
        />
        
        {/* CRITICAL: Improved viewport for better mobile performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* CRITICAL: Resource hints for faster loading */}
        <link rel="preload" href="/fonts" as="fetch" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        {/* CRITICAL: Move analytics to very end of body */}
        <ClientProviders>
          {children}
        </ClientProviders>
        
        {/* CRITICAL: Defer all analytics until after main content loads */}
        <GoogleAnalytics />
        <GoogleAdsTag />
      </body>
    </html>
  );
}