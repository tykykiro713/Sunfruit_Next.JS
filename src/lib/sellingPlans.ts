import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

// Types for selling plans
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

export interface ProductSellingPlanGroups {
  sellingPlanGroups: {
    edges: {
      node: SellingPlanGroup;
    }[];
  };
}

export interface ProductSellingPlansData {
  product: ProductSellingPlanGroups;
}

// GraphQL Query to fetch selling plans for a product
export const GET_PRODUCT_SELLING_PLANS = gql`
  query GetProductSellingPlans($productId: ID!) {
    product(id: $productId) {
      sellingPlanGroups(first: 10) {
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

// Function to fetch selling plans for a product
export async function fetchProductSellingPlans(productId: string): Promise<SellingPlan[]> {
  try {
    const { data } = await client.query<ProductSellingPlansData>({
      query: GET_PRODUCT_SELLING_PLANS,
      variables: { productId },
    });
    
    // Flatten and extract selling plans from the response
    const sellingPlans: SellingPlan[] = [];
    
    data.product.sellingPlanGroups.edges.forEach(groupEdge => {
      groupEdge.node.sellingPlans.edges.forEach(planEdge => {
        sellingPlans.push(planEdge.node);
      });
    });
    
    return sellingPlans;
  } catch (error) {
    console.error("Error fetching product selling plans:", error);
    return [];
  }
}

// Function to get discount percentage from a selling plan
// Since we can't query priceAdjustments via GraphQL, we'll use plan name/description to infer discount
export function getDiscountPercentage(sellingPlan: SellingPlan): number {
  // Look for discount information in the plan name or description
  const text = `${sellingPlan.name} ${sellingPlan.description}`.toLowerCase();
  
  // Common patterns for subscription discounts
  const discountMatch = text.match(/(\d+)%\s*(off|discount|save)/);
  if (discountMatch) {
    return parseInt(discountMatch[1]);
  }
  
  // Look for "save X%" pattern
  const saveMatch = text.match(/save\s*(\d+)%/);
  if (saveMatch) {
    return parseInt(saveMatch[1]);
  }
  
  // Default discount for subscription plans (common practice is 10-15%)
  if (text.includes('subscription') || text.includes('recurring')) {
    return 10; // Default 10% discount for subscriptions
  }
  
  return 0;
}

// Function to get delivery frequency from a selling plan
export function getDeliveryFrequency(sellingPlan: SellingPlan): string {
  const intervalOption = sellingPlan.options.find(
    option => option.name === 'Delivery every'
  );
  
  return intervalOption?.value || '';
}