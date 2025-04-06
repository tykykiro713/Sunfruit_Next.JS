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
            Terms of Service
          </h1>
          <p className="mt-6 text-xl/8">
            Dedicated team passionate about creating innovative solutions. Our mission is to deliver exceptional products and services that make a difference in people's lives.
          </p>
          <p className="mt-6 text-xl/8">
            Dedicated team passionate about creating innovative solutions. Our mission is to deliver exceptional products and services that make a difference in people's lives.
          </p>
          <p className="mt-6 text-xl/8">
            Dedicated team passionate about creating innovative solutions. Our mission is to deliver exceptional products and services that make a difference in people's lives.
          </p>
        </div>
        <div className="h-12"> </div>
        <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
          <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-xl/8">
            Dedicated team passionate about creating innovative solutions. Our mission is to deliver exceptional products and services that make a difference in people's lives.
          </p>
          <p className="mt-6 text-xl/8">
            Dedicated team passionate about creating innovative solutions. Our mission is to deliver exceptional products and services that make a difference in people's lives.
          </p>
          <p className="mt-6 text-xl/8">
            Dedicated team passionate about creating innovative solutions. Our mission is to deliver exceptional products and services that make a difference in people's lives.
          </p>
        </div>
        <div className="h-12"> </div>
        <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
          <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-5xl">
            Accessibility
          </h1>
          <p className="mt-6 text-xl/8">
            Dedicated team passionate about creating innovative solutions. Our mission is to deliver exceptional products and services that make a difference in people's lives.
          </p>
          <p className="mt-6 text-xl/8">
            Dedicated team passionate about creating innovative solutions. Our mission is to deliver exceptional products and services that make a difference in people's lives.
          </p>
          <p className="mt-6 text-xl/8">
            Dedicated team passionate about creating innovative solutions. Our mission is to deliver exceptional products and services that make a difference in people's lives.
          </p>
        </div>
      </div>
      <ProductRecirculation />
      <div className="h-16 bg-white"></div>
      <Footer />
    </div>
  );
}