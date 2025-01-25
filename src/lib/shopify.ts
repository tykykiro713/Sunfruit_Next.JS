import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

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
export async function fetchProducts(first = 10) {
  try {
    const { data } = await client.query({
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
export async function fetchProductByHandle(handle: string) {
  try {
    const { data } = await client.query({
      query: GET_PRODUCT_BY_HANDLE,
      variables: { handle },
    });
    return data.productByHandle;
  } catch (error) {
    console.error("Error fetching product by handle:", error);
    return null;
  }
}

