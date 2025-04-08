// This file contains all testimonial data organized by product handle
// src/data/productTestimonials.ts

export interface ProductTestimonial {
    image: string;
    alt: string;
    quote: string;
    author: string;
    location: string;
    title?: string;
  }
  
  // Default testimonial used when no product-specific one is found
  export const defaultTestimonial: ProductTestimonial = {
    image: "/images/Testimonial.jpg",
    alt: "Smiling woman",
    quote: "Our family loves Sunfruit!\nIt tastes great, and helps me\nstay on track with my health goals.\nI also feel good giving it to my kids.",
    author: "Brad R.",
    location: "Maine",
    title: "Taste the difference with Sunfruit Organics"
  };
  
  // Product-specific testimonials mapped by product handle
  const productTestimonials: Record<string, ProductTestimonial> = {
    // Example products - replace with your actual product handles
    "lemon-mint": {
      image: "/images/Woman.jpg",
      alt: "Real ingredients I can trust",
      quote: "I read every label. Sunfruit actually passes the test. No bloating, no weird additives. My body just feels good with it.",
      author: "Sarah M.",
      location: "California",
      title: "Real ingredients I can trust"
    },
    
    "grapefruit-ginger": {
      image: "/images/Kayak.jpg",
      alt: "Clean ingredients, big flavor",
      quote: "I finally found something organic that doesn't taste like a compromise. I drink way more water now. Sunfruit makes it easy.",
      author: "David K.",
      location: "New York",
      title: "Clean ingredients, big flavor"
    },
    
    "lime-basil": {
        image: "/images/Testimonial.jpg",
        alt: "Keeps me sipping all day",
        quote: "Our family loves Sunfruit! It tastes great, and helps me stay on track with my health goals. I also feel good giving it to my kids.",
        author: "Brad R.",
        location: "Maine",
        title: "Flavored water, finally done right"
    },

    "raspberry-hibiscus": {
        image: "/images/Joy.png",
        alt: "Customer enjoying green juice",
        quote: "I replensish electrolytes after a workout...the rest of the time I'm drinking Sunfruit.",
        author: "Joy B.",
        location: "North Carolina",
        title: "Hydration that fits my lifestyle"
    },
    
    // Add more testimonials for other products here
  };
  
  /**
   * Get a testimonial for a specific product handle
   * @param handle The product handle to get a testimonial for
   * @returns The testimonial for the specified product or the default testimonial
   */
  export function getProductTestimonial(handle: string): ProductTestimonial {
    return productTestimonials[handle] || defaultTestimonial;
  }
  
  export default productTestimonials;