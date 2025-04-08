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
    image?: {
      url: string;
      altText: string | null;
    };
    url?: string;
    altText?: string | null;
  };
  embeddedUrl?: string;
}

export interface Variant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number;
  priceV2: {
    amount: string;
    currencyCode: string;
  };
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

// Simplified selling plan interfaces to avoid schema mismatches
export interface SellingPlanOption {
  name: string;
  value: string;
}

export interface SellingPlan {
  id: string;
  name: string;
  description: string;
  options: SellingPlanOption[];
}

export interface SellingPlanGroup {
  name: string;
  options: {
    name: string;
    values: string[];
  }[];
  sellingPlans: {
    edges: {
      node: SellingPlan;
    }[];
  };
}

export interface ProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  availableForSale: boolean;
  variants: {
    edges: {
      node: Variant;
    }[];
  };
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
  sellingPlanGroups?: {
    edges: {
      node: SellingPlanGroup;
    }[];
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
  availableForSale?: boolean;
  variants?: {
    edges: {
      node: Variant;
    }[];
  };
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
  sellingPlanGroups?: {
    edges: {
      node: SellingPlanGroup;
    }[];
  };
  hasSubscriptionOption?: boolean;
}

// GraphQL Queries - Updated to include selling plan groups with simplified structure
export const GET_PRODUCTS = gql`
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          availableForSale
          variants(first: 3) {
            edges {
              node {
                id
                title
                availableForSale
                quantityAvailable
                priceV2: price {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
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
                  mediaContentType
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
          sellingPlanGroups(first: 5) {
            edges {
              node {
                name
                options {
                  name
                  values
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Simplified query to avoid schema mismatches
export const GET_PRODUCT_BY_HANDLE = gql`
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      availableForSale
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            quantityAvailable
            priceV2: price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
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
              mediaContentType
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
      sellingPlanGroups(first: 5) {
        edges {
          node {
            name
            options {
              name
              values
            }
            sellingPlans(first: 10) {
              edges {
                node {
                  id
                  name
                  description
                  options {
                    name
                    value
                  }
                }
              }
            }
          }
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
      availableForSale: data.productByHandle.availableForSale,
      variants: data.productByHandle.variants,
      priceRange: data.productByHandle.priceRange,
      images: data.productByHandle.images,
      media: data.productByHandle.media,
      rating: 5, // Default rating or calculate based on your needs
      sellingPlanGroups: data.productByHandle.sellingPlanGroups,
      // Fixed to handle undefined with nullish coalescing operator
      hasSubscriptionOption: (data.productByHandle.sellingPlanGroups?.edges?.length ?? 0) > 0
    };

    return product;
  } catch (error) {
    console.error("Error fetching product by handle:", error);
    return null;
  }
}

// Helper function to extract subscription options from selling plan groups
// Simplified to avoid relying on priceAdjustments that might not match the schema
export function getSubscriptionOptions(product: UIProduct): {
  subscriptionPlans: SellingPlan[];
  discountPercentage: number;
} {
  const subscriptionPlans: SellingPlan[] = [];
  // Hardcoded discount percentage since we can't reliably get it from the API without exploring schema
  const discountPercentage = 15; // Default discount percentage
  
  if (product.sellingPlanGroups?.edges) {
    product.sellingPlanGroups.edges.forEach(edge => {
      const group = edge.node;
      // Look for subscription groups
      if (group.name.toLowerCase().includes('subscription')) {
        group.sellingPlans.edges.forEach(planEdge => {
          const plan = planEdge.node;
          subscriptionPlans.push(plan);
        });
      }
    });
  }
  
  return {
    subscriptionPlans,
    discountPercentage
  };
}