import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

interface MediaImage {
  image: {
    url: string;
    altText: string | null;
  };
}

interface VideoSource {
  url: string;
  mimeType: string;
}

interface MediaNode {
  mediaContentType: string;
  alt: string | null;
  image?: MediaImage['image'];
  sources?: VideoSource[];
}

interface ProductNode {
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

interface ProductsData {
  products: {
    edges: {
      node: ProductNode;
    }[];
  };
}

interface ProductByHandleData {
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
                mediaContentType
                alt
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
                ... on Video {
                  sources {
                    url
                    mimeType
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
            mediaContentType
            alt
            ... on MediaImage {
              image {
                url
                altText
              }
            }
            ... on Video {
              sources {
                url
                mimeType
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