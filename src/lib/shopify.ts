import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

// Type Definitions
export interface MediaImage {
  id?: string;
  mediaContentType: string;
  image: {
    url: string;
    altText: string | null;
  };
}

export interface VideoSource {
  format?: string;
  url: string;
  mimeType: string;
}

export interface MediaNode {
  id?: string;
  mediaContentType: string;
  image?: {
    url: string;
    altText: string | null;
  };
  sources?: VideoSource[];
  previewImage?: {
    url: string;
    altText: string | null;
  };
  embeddedUrl?: string;
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
  id: string;
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
      node: MediaNode;
    }[];
  };
  colors?: {
    name: string;
    bgColor: string;
    selectedColor: string;
  }[];
  rating?: number;
}

// GraphQL Queries
export const GET_PRODUCTS = gql`
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          media(first: 5) {
            edges {
              node {
                ... on Video {
                  id
                  mediaContentType
                  sources {
                    format
                    url
                    mimeType
                  }
                  previewImage {
                    url
                    altText
                  }
                }
                ... on ExternalVideo {
                  id
                  mediaContentType
                  embeddedUrl
                  previewImage {
                    url
                    altText
                  }
                }
                ... on MediaImage {
                  id
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = gql`
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      media(first: 5) {
        edges {
          node {
            ... on Video {
              id
              mediaContentType
              sources {
                format
                url
                mimeType
              }
              previewImage {
                url
                altText
              }
            }
            ... on ExternalVideo {
              id
              mediaContentType
              embeddedUrl
              previewImage {
                url
                altText
              }
            }
            ... on MediaImage {
              id
              image {
                url
                altText
              }
            }
          }
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;

// API Functions
export async function fetchProducts(first = 10): Promise<ProductNode[]> {
  try {
    const { data } = await client.query<ProductsData>({
      query: GET_PRODUCTS,
      variables: { first },
    });
    return data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchProductByHandle(handle: string): Promise<UIProduct | null> {
  try {
    const { data } = await client.query<ProductByHandleData>({
      query: GET_PRODUCT_BY_HANDLE,
      variables: { handle },
    });
    
    if (!data.productByHandle) return null;

    // Transform ProductNode to UIProduct
    const product: UIProduct = {
      id: data.productByHandle.id,
      title: data.productByHandle.title,
      description: data.productByHandle.description,
      handle: data.productByHandle.handle,
      priceRange: data.productByHandle.priceRange,
      images: data.productByHandle.images,
      media: data.productByHandle.media,
      rating: 5, // Default rating or calculate based on your needs
    };

    return product;
  } catch (error) {
    console.error("Error fetching product by handle:", error);
    return null;
  }
}