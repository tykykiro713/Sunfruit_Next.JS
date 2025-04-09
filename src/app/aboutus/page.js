import Navigation from "@/components/Navigation";
import ProductRecirculation from "@/components/ProductRecirculation"
import Footer from "@/components/Footer";
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';

export default function AboutPage() {
  return (
    <div>
      <Navigation />
      <div className="bg-gray-50 px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
          <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-5xl">
            Our Story
          </h1>
          <p className="mt-6 text-xl/8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="mt-6 text-xl/8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="mt-6 text-xl/8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
      <ProductRecirculation />
      <div className="h-16 bg-white"></div>
      <Footer />
    </div>
  );
}