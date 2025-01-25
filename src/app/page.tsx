import NewHeader from "@/components/NewHeader";
import VideoCTA from "@/components/VideoCTA"; 
import ValueProps from "@/components/ValueProps";
import ProductList from "@/components/ProductList";
import UsVsThem from "@/components/UsVsThem";
import Content1 from "@/components/Content1";
import Circle_Testimonial from "@/components/Circle_Testimonial";
import Testimonials from "@/components/Testimonials";
import HeroSection from "@/components/HeroSection";
import Faqs from "@/components/Faqs";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div>
      <NewHeader />
      <VideoCTA />
      <ValueProps />
      <ProductList />
      <UsVsThem />
      <Content1 />
      <Circle_Testimonial />
      <Testimonials />
      <HeroSection />
      <Faqs />
      <Footer />
      {/* Add more sections here */}
    </div>
  );
}

