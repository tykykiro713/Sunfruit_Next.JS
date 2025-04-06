import Navigation from "@/components/Navigation";
import VideoCTA from "@/components/VideoCTA"; 
import ValueProps from "@/components/ValueProps";
import ProductList from "@/components/ProductList";
import { SectionWave } from "@/components/SectionWave";
import IngredientsSection from "@/components/IngredientsSection";
import HeroSplit from "@/components/HeroSplit";
import SampleCTA from "@/components/SampleCTA";
import Faqs from "@/components/Faqs";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div>
      <Navigation />
      <VideoCTA />
      <ValueProps />
      <ProductList />
      <SectionWave />
      <IngredientsSection />
      <HeroSplit />
      <SampleCTA />
      <Faqs />
      <Footer />
      {/* Add more sections here */}
    </div>
  );
}

