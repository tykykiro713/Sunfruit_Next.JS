import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import GoogleAdsTag from "@/components/GoogleAdsTag";
import ClientProviders from "@/components/ClientProviders";

// Font loading with optimized display strategy - works perfectly in server components
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
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
  return (
    <html lang="en">
      <head>
        {/* Critical preloads and preconnects - can be done directly in server component */}
        <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" type="image/svg+xml" href="/images/Sunfruit_Green_Logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        {/* Critical analytics - these already handle their own client-side logic properly */}
        <GoogleAnalytics />
        <GoogleAdsTag />
        
        {/* All client-side providers and components wrapped in a single client component */}
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}