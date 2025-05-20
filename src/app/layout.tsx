"use client";

import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import { MyProvider } from "@/context/MyContext";
import { CartProvider } from "@/context/CartContext";
import { CustomerProvider } from "@/context/CustomerContext";
import CartDrawer from "@/components/CartDrawer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import GoogleAdsTag from "@/components/GoogleAdsTag";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Import non-critical components directly to avoid dynamic type issues
import ZendeskLauncher from '@/components/ZendeskLauncher';
import { ClarityProvider } from '@/components/ClarityProvider';
import { KlaviyoProvider } from '@/components/KlaviyoProvider';

// Load fonts with optimized display strategy
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap", // Use font-display: swap for faster text display
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loadThirdParty, setLoadThirdParty] = useState(false);
  
  // Delay loading of non-critical resources
  useEffect(() => {
    // Load third-party scripts after a delay
    const timer = setTimeout(() => {
      setLoadThirdParty(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Add preconnect for critical domains
  useEffect(() => {
    // Add preconnect to critical domains
    const preconnectDomains = [
      'https://cdn.shopify.com',
      'https://www.googletagmanager.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    
    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
    
    // Preload logo SVG
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.type = 'image/svg+xml';
    preloadLink.href = '/images/Sunfruit_Green_Logo.svg';
    document.head.appendChild(preloadLink);
    
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        {/* Critical preloads and preconnects added programmatically */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        {/* Critical analytics - keep it synchronous */}
        <GoogleAnalytics />
        <GoogleAdsTag />
        
        <ApolloProvider client={client}>
          <MyProvider>
            <CustomerProvider>
              <CartProvider>
                {children}
                <CartDrawer />
                
                {/* Conditionally render third-party components */}
                {loadThirdParty && (
                  <>
                    <ZendeskLauncher />
                    <ClarityProvider />
                    <KlaviyoProvider />
                  </>
                )}
              </CartProvider>
            </CustomerProvider>
          </MyProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}