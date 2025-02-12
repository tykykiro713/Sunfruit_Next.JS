import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

export interface MediaImage {
  id: string;
  image: {
    url: string;
    altText: string | null;
  };
}

export interface VideoSource {
  format: string;
  url: string;
  mimeType: string;
}

export interface MediaNode {
  id: string;
  mediaContentType: string;
  image?: {
    url: string;
    altText: string | null;
  };
  sources?: VideoSource[];
  previewImage?: {
    url: string;
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

// GraphQL query to fetch products with media
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
                id
                mediaContentType
                ... on MediaImage {
                  id
                  image {
                    url
                    altText
                  }
                }
                ... on Video {
                  id
                  sources {
                    format
                    url
                    mimeType
                  }
                  previewImage {
                    url
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
        }
      }
    }
  }
`;

// GraphQL query to fetch a single product by handle
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
            id
            mediaContentType
            ... on MediaImage {
              id
              image {
                url
                altText
              }
            }
            ... on Video {
              id
              sources {
                format
                url
                mimeType
              }
              previewImage {
                url
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

// Function to fetch products
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

// Function to fetch a single product by handle
export async function fetchProductByHandle(handle: string): Promise<ProductNode | null> {
  try {
    const { data } = await client.query<ProductByHandleData>({
      query: GET_PRODUCT_BY_HANDLE,
      variables: { handle },
    });
    return data.productByHandle;
  } catch (error) {
    console.error("Error fetching product by handle:", error);
    return null;
  }
}
