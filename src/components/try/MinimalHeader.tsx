import Image from 'next/image';
import Link from 'next/link';

export default function MinimalHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/try" aria-label="Sunfruit" className="inline-flex items-center">
          <Image
            src="/images/Sunfruit_Green_Logo.svg"
            alt="Sunfruit"
            width={160}
            height={40}
            className="h-8 w-auto sm:h-10"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
