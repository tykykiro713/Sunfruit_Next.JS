"use client";

import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import { MyProvider } from "@/context/MyContext";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import Script from "next/script";
import { ClarityProvider } from "@/components/ClarityProvider"; // Import ClarityProvider
import { GoogleAnalytics } from "@/components/GoogleAnalytics"; // Import GoogleAnalytics

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
        {/* All analytics scripts are now handled by dedicated components */}
        
        {/* Klaviyo Active Onsite Script */}
        <Script
          src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID}`}
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        {/* Add analytics components */}
        <ClarityProvider />
        <GoogleAnalytics />
        
        <ApolloProvider client={client}>
          <MyProvider>
            <CartProvider>
              {children}
              <CartDrawer />
            </CartProvider>
          </MyProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}






