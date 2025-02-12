export interface Product {
    title: string;
    description: string;
    priceRange?: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images?: {
      edges: { 
        node: { 
          url: string; 
          altText: string | null;  // Changed from optional to required, but can be null
        } 
      }[];
    };
    media?: {
      edges: {
        node: {
          mediaContentType: string;
          alt: string | null;
          image?: {
            url: string;
            altText: string | null;
          };
          previewImage?: {
            image: {
              url: string;
              altText: string | null;
            };
          };
          sources?: {
            url: string;
            mimeType: string;
          }[];
        };
      }[];
    };
    colors?: Color[];
    rating?: number;
  }
  
  export type Color = {
    name: string;
    bgColor: string;
    selectedColor: string;
  };