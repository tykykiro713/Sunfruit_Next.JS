import Link from 'next/link';
import Image from 'next/image';

const navigation = {
  solutions: [
    { name: "Our Story", href: "/aboutus" },
    { name: "Careers", href: "/contactus" },
    { name: "Press", href: "/contactus" },
  ],
  support: [
    { name: "Refer a Friend", href: "/contactus" },
    { name: "Wholesale", href: "/contactus" },
    { name: "Affiliate", href: "/contactus" },
  ],
  company: [
    { name: "FAQs", href: "/" },
    { name: "My Account", href: "/account" },
    { name: "Contact Us", href: "/contactus" },
  ],
  legal: [
    { name: "Terms of Use", href: "/termsofuse" },
    { name: "Privacy Policy", href: "/privacypolicy" },
    { name: "Accessibility", href: "/accessibility" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M9.197 21V12.844H6.5V9.902h2.697V7.476C9.197 4.467 10.923 3 13.539 3c1.228 0 2.282.09 2.588.131v3.003h-1.84c-1.445 0-1.725.688-1.725 1.698v1.773h3.458l-.451 2.942h-3.007V21h-3.365z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.063 2.633.336 3.608 1.311.975.975 1.248 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.248-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.336-3.608-1.311-.975-.975-1.248-2.242-1.311-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.063-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.248 3.608-1.311 1.266-.058 1.646-.07 4.85-.07zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-emeraldgreen-500">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
          <Link href="/" className="inline-block">
              <img
                alt="Company name"
                src="/images/Logo_Trans.png"
                className="h-10 w-auto sm:h-12"
              />
            </Link>
            <p className="text-base text-white">
              100% organic fruit and botanicals.
            </p>
            <div className="flex gap-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-white hover:text-gray-800">
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="size-7 sm:size-8" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-semibold text-white">About Us</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-base text-white hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-base font-semibold text-white">Connect</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-base text-white hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-semibold text-white">Help</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-base text-white hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-base font-semibold text-white">Legal</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-base text-white hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-base text-white">&copy; 2025 Sunfruit, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}