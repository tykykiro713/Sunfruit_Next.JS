import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

// Types for cart operations
export interface CartCreateData {
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
    };
  };
}

export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
  sellingPlanId?: string; // Added for subscription support
  attributes?: Array<{
    key: string;
    value: string;
  }>;
}

export interface CartLineUpdateInput {
  id: string;
  quantity: number;
  sellingPlanId?: string; // Added for subscription support
  attributes?: Array<{
    key: string;
    value: string;
  }>;
}

export interface CartLine {
  id: string;
  quantity: number;
  sellingPlanAllocation?: {
    sellingPlan: {
      id: string;
      name: string;
      options: {
        name: string;
        value: string;
      }[];
    };
  };
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
    };
    priceV2: {
      amount: string;
      currencyCode: string;
    };
    image: {
      url: string;
      altText: string | null;
    };
  };
}

export interface CartEdge {
  node: CartLine;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  estimatedCost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: CartEdge[];
  };
}

export interface CartData {
  cart: Cart;
}

export interface CartLinesAddData {
  cartLinesAdd: {
    cart: Cart;
  };
}

export interface CartLinesUpdateData {
  cartLinesUpdate: {
    cart: Cart;
  };
}

export interface CartLinesRemoveData {
  cartLinesRemove: {
    cart: Cart;
  };
}

// Subscription details type
export interface SubscriptionDetails {
  frequency: string;
  discountPercentage?: number;
}

// GraphQL Mutations and Queries - Updated to include selling plan fields
export const CREATE_CART = gql`
  mutation CartCreate {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        estimatedCost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              sellingPlanAllocation {
                sellingPlan {
                  id
                  name
                  options {
                    name
                    value
                  }
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    handle
                  }
                  priceV2: price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
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

export const UPDATE_CART_LINES = gql`
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        estimatedCost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              sellingPlanAllocation {
                sellingPlan {
                  id
                  name
                  options {
                    name
                    value
                  }
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    handle
                  }
                  priceV2: price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
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

export const REMOVE_FROM_CART = gql`
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        estimatedCost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              sellingPlanAllocation {
                sellingPlan {
                  id
                  name
                  options {
                    name
                    value
                  }
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    handle
                  }
                  priceV2: price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
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

export const GET_CART = gql`
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      estimatedCost {
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            sellingPlanAllocation {
              sellingPlan {
                id
                name
                options {
                  name
                  value
                }
              }
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  title
                  handle
                }
                priceV2: price {
                  amount
                  currencyCode
                }
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Cart API Functions
export async function createCart(): Promise<string> {
  try {
    const { data } = await client.mutate<CartCreateData>({
      mutation: CREATE_CART,
    });
    
    return data?.cartCreate.cart.id || "";
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
}

// Modified to optionally accept a sellingPlanId
export async function addToCart(
  cartId: string, 
  merchandiseId: string, 
  quantity: number,
  sellingPlanId?: string
): Promise<Cart | null> {
  try {
    const lineInput: CartLineInput = {
      merchandiseId,
      quantity,
    };
    
    // Add selling plan ID if it exists
    if (sellingPlanId) {
      lineInput.sellingPlanId = sellingPlanId;
    }
    
    const { data } = await client.mutate<CartLinesAddData>({
      mutation: ADD_TO_CART,
      variables: {
        cartId,
        lines: [lineInput],
      },
    });
    
    return data?.cartLinesAdd.cart || null;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}

// Modified to optionally accept a sellingPlanId for subscription updates
export async function updateCartLines(
  cartId: string, 
  lineId: string, 
  quantity: number,
  sellingPlanId?: string
): Promise<Cart | null> {
  try {
    const lineUpdateInput: CartLineUpdateInput = {
      id: lineId,
      quantity,
    };
    
    // Add selling plan ID if it exists
    if (sellingPlanId) {
      lineUpdateInput.sellingPlanId = sellingPlanId;
    }
    
    const { data } = await client.mutate<CartLinesUpdateData>({
      mutation: UPDATE_CART_LINES,
      variables: {
        cartId,
        lines: [lineUpdateInput],
      },
    });
    
    return data?.cartLinesUpdate.cart || null;
  } catch (error) {
    console.error("Error updating cart lines:", error);
    throw error;
  }
}

export async function removeFromCart(cartId: string, lineId: string): Promise<Cart | null> {
  try {
    const { data } = await client.mutate<CartLinesRemoveData>({
      mutation: REMOVE_FROM_CART,
      variables: {
        cartId,
        lineIds: [lineId],
      },
    });
    
    return data?.cartLinesRemove.cart || null;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
}

export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const { data } = await client.query<CartData>({
      query: GET_CART,
      variables: { cartId },
      fetchPolicy: "network-only", // Don't use cache for cart
    });
    
    return data?.cart || null;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}