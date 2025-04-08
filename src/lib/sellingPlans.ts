import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

// Types for selling plans
export interface SellingPlanOption {
  name: string;
  value: string;
}

export interface SellingPlanPrice {
  adjustmentType: string;
  adjustmentValue: {
    percentage: number;
  };
}

export interface SellingPlan {
  id: string;
  name: string;
  description: string;
  options: SellingPlanOption[];
  priceAdjustments: SellingPlanPrice[];
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
                  priceAdjustments {
                    adjustmentType
                    adjustmentValue {
                      ... on SellingPlanPercentagePriceAdjustment {
                        percentage
                      }
                    }
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
export function getDiscountPercentage(sellingPlan: SellingPlan): number {
  const discountAdjustment = sellingPlan.priceAdjustments.find(
    adjustment => adjustment.adjustmentType === 'PERCENTAGE'
  );
  
  return discountAdjustment?.adjustmentValue?.percentage || 0;
}

// Function to get delivery frequency from a selling plan
export function getDeliveryFrequency(sellingPlan: SellingPlan): string {
  const intervalOption = sellingPlan.options.find(
    option => option.name === 'Delivery every'
  );
  
  return intervalOption?.value || '';
}