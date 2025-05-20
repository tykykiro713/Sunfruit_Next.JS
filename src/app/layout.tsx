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
import dynamic from 'next/dynamic';

// Import ZendeskLauncher directly - NOT lazy loaded
import ZendeskLauncher from '@/components/ZendeskLauncher';

// Lazy load other non-critical components
const ClarityProvider = dynamic(
  () => import('@/components/ClarityProvider').then(mod => ({ default: mod.ClarityProvider })),
  { ssr: false, loading: () => null }
);

const KlaviyoProvider = dynamic(
  () => import('@/components/KlaviyoProvider').then(mod => ({ default: mod.KlaviyoProvider })),
  { ssr: false, loading: () => null }
);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to domains for faster loading */}
        <link rel="preconnect" href="https://static.zdassets.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://static.klaviyo.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.clarity.ms" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        {/* Critical analytics and our ZendeskLauncher component */}
        <GoogleAnalytics />
        <GoogleAdsTag />
        <ZendeskLauncher />
        
        <ApolloProvider client={client}>
          <MyProvider>
            <CustomerProvider>
              <CartProvider>
                {children}
                <CartDrawer />
                
                {/* Non-critical components that can be lazy loaded */}
                <ClarityProvider />
                <KlaviyoProvider />
              </CartProvider>
            </CustomerProvider>
          </MyProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}