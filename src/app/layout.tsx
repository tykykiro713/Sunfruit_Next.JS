"use client";

import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import { MyProvider } from "@/context/MyContext";
import { CartProvider } from "@/context/CartContext";
import { CustomerProvider } from "@/context/CustomerContext"; 
import CartDrawer from "@/components/CartDrawer";
import { ClarityProvider } from "@/components/ClarityProvider";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { KlaviyoProvider } from "@/components/KlaviyoProvider";
import ZendeskWidget from "@/components/ZendeskWidget";
import GoogleAdsTag from "@/components/GoogleAdsTag"; 

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
        {/* No scripts here - all analytics scripts are now handled by dedicated components */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        {/* Analytics components */}
        <ClarityProvider />
        <GoogleAnalytics />
        <KlaviyoProvider />
        <GoogleAdsTag />
        
        <ApolloProvider client={client}>
          <MyProvider>
            <CustomerProvider> {/* Add CustomerProvider to wrap CartProvider */}
              <CartProvider>
                {children}
                <CartDrawer />
                <ZendeskWidget /> {/* Add Zendesk Widget component */}
              </CartProvider>
            </CustomerProvider>
          </MyProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}



