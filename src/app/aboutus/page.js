import Navigation from "@/components/Navigation";
import AboutHero from "@/components/AboutHero";
import ProductRecirculation from "@/components/ProductRecirculation"
import Footer from "@/components/Footer";
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';

export default function AboutPage() {
  return (
    <div>
      <Navigation />
      <AboutHero />
      <ProductRecirculation />
      <div className="h-16 bg-white"></div>
      <Footer />
    </div>
  );
}