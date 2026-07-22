import Image from "next/image";
import Link from "next/link";
import OfficeOrderForm from "@/components/offices/OfficeOrderForm";
import { resolveOfficeFlavors } from "@/lib/offices/products";

// Public but UNLINKED + UNINDEXED — direct-URL only. Also excluded from
// src/app/sitemap.ts (which uses an explicit allowlist, so /quickorder is omitted).

// ISR: without this the route prerenders statically at build time, freezing
// prices/availability/variant GIDs until the next deploy. Refresh hourly.
export const revalidate = 3600;

export const metadata = {
  title: "Quick Order — Cases — Sunfruit",
  description: "Order Sunfruit by the case, delivered monthly to your office.",
  robots: { index: false, follow: false },
};

export default async function QuickOrderPage() {
  const flavors = await resolveOfficeFlavors();

  return (
    <div
      className="flex min-h-screen flex-col bg-yellow-50"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.25), rgba(255,255,255,0.25)), url('/images/Lemon_slice_bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* React 19 hoists this to <head>; the background is the LCP element but
          CSS-referenced images are discovered late without a preload. */}
      <link rel="preload" as="image" href="/images/Lemon_slice_bg.webp" />
      {/* Minimal logo-only header (no nav, no sign-in) */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-center px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Sunfruit home">
            <Image
              src="/images/Sunfruit_Green_Logo.svg"
              alt="Sunfruit"
              width={140}
              height={32}
              priority
            />
          </Link>
        </div>
      </header>

      <main className="flex-1 px-4 py-10 sm:py-12">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-8">
          <OfficeOrderForm flavors={flavors} />
        </div>
      </main>

      {/* Legal-only footer */}
      <footer className="border-t border-gray-200 bg-white/80 py-8 backdrop-blur">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 px-4 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} Sunfruit. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="/privacypolicy" className="hover:text-emeraldgreen-500">
              Privacy Policy
            </Link>
            <Link href="/termsofuse" className="hover:text-emeraldgreen-500">
              Terms of Use
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
