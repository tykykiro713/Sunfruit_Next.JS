import Link from 'next/link';

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacypolicy' },
  { name: 'Terms of Use', href: '/termsofuse' },
  { name: 'Accessibility', href: '/accessibility' },
  { name: 'Contact', href: '/contactus' },
];

export default function MinimalFooter() {
  return (
    <footer className="bg-emeraldgreen-500 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm">
          Drink. Organic. Now.<sup className="text-[0.6em]">TM</sup>
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {legalLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="hover:text-brightgreen-500">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-xs text-white/70">
          &copy; {new Date().getFullYear()} Sunfruit, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
