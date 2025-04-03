import Header from "@/components/Header";
import VideoCTA from "@/components/VideoCTA"; 
import ValueProps from "@/components/ValueProps";
import ProductList from "@/components/ProductList";
import IngredientsSection from "@/components/IngredientsSection";
import HeroSplit from "@/components/HeroSplit";
import SampleCTA from "@/components/SampleCTA";
import Faqs from "@/components/Faqs";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div>
      <Header />
      <VideoCTA />
      <ValueProps />
      <ProductList />
      <IngredientsSection />
      <HeroSplit />
      <SampleCTA />
      <Faqs />
      <Footer />
      {/* Add more sections here */}
    </div>
  );
}

