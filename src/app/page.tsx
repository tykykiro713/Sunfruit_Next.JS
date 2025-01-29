import Header from "@/components/Header";
import VideoCTA from "@/components/VideoCTA"; 
import ValueProps from "@/components/ValueProps";
import ProductList from "@/components/ProductList";
import UsVsThem from "@/components/UsVsThem";
import Content1 from "@/components/Content1";
import Testimonials from "@/components/Testimonials";
import HeroSection from "@/components/HeroSection";
import Faqs from "@/components/Faqs";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div>
      <Header />
      <VideoCTA />
      <ValueProps />
      <ProductList />
      <UsVsThem />
      <Content1 />
      <Testimonials />
      <HeroSection />
      <Faqs />
      <Footer />
      {/* Add more sections here */}
    </div>
  );
}

