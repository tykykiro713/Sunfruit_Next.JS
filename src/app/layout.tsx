// Server component with optimized fonts and moved analytics
// ========================================
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import GoogleAdsTag from "@/components/GoogleAdsTag";
import ClientProviders from "@/components/ClientProviders";

// Optimized font loading with display: optional
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "optional", // Better performance than swap
  adjustFontFallback: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "optional",
  adjustFontFallback: false,
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "optional",
  adjustFontFallback: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* DNS prefetch for faster connections */}
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Preconnect only to critical domains */}
        <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="anonymous" />
        
        {/* Preload critical resources */}
        <link 
          rel="preload" 
          as="image" 
          type="image/svg+xml" 
          href="/images/Sunfruit_Green_Logo.svg"
          fetchPriority="high"
        />
        
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        {/* Main content with providers */}
        <ClientProviders>
          {children}
        </ClientProviders>
        
        {/* Analytics moved to end of body for better performance */}
        <GoogleAnalytics />
        <GoogleAdsTag />
      </body>
    </html>
  );
}