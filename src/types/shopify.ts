export interface MediaImage {
    image: {
      url: string;
      altText: string | null;
    };
  }
  
  export interface VideoSource {
    url: string;
    mimeType: string;
  }
  
  export interface MediaNode {
    mediaContentType: string;
    alt: string | null;
    image?: MediaImage['image'];
    sources?: VideoSource[];
    previewImage?: {
      image: {
        url: string;
        altText: string | null;
      };
    };
  }
  
  export interface ProductNode {
    id: string;
    title: string;
    description: string;
    handle: string;
    media: {
      edges: {
        node: MediaNode;
      }[];
    };
    images: {
      edges: {
        node: {
          url: string;
          altText: string | null;
        };
      }[];
    };
    priceRange?: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
      maxVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
  }
  
  export interface ProductsData {
    products: {
      edges: {
        node: ProductNode;
      }[];
    };
  }
  
  export interface ProductByHandleData {
    productByHandle: ProductNode;
  }
  
  export interface UIProduct {
    id?: string;
    title: string;
    description: string;
    handle?: string;
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
          altText: string | null;
        };
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
    colors?: {
      name: string;
      bgColor: string;
      selectedColor: string;
    }[];
    rating?: number;
  }