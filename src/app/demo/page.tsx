import NavigationV2 from "@/components/NavigationV2";
import HeroVideoV2 from "@/components/HeroVideoV2";
import ValueProps from "@/components/ValueProps";
import ProductList from "@/components/ProductList";
import { SectionWave } from "@/components/SectionWave";
import IngredientsSection from "@/components/IngredientsSection";
import HeroSplit from "@/components/HeroSplit";
import SampleCTA from "@/components/SampleCTA";
import Faqs from "@/components/Faqs";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'Sunfruit - Zero Sugar Organic Drink Mix (Demo)',
  description: 'Demo page showcasing the new GoPuff-inspired navigation and hero video components.',
}

export default function DemoPage() {
  return (
    <div>
      <NavigationV2 />
      <HeroVideoV2 />
      <ValueProps />
      <ProductList />
      <SectionWave />
      <IngredientsSection />
      <HeroSplit />
      <SampleCTA />
      <Faqs />
      <Footer />
    </div>
  );
}