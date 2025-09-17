// Recharge subscription options helper
// Maps products to their correct selling plan IDs using real data only

import { SELLING_PLAN_IDS } from './types';
import { getDiscountPercentage, getDeliveryFrequency, type SellingPlan } from '../sellingPlans';
import type { UIProduct } from '../shopify';

export interface RechargeSubscriptionOptions {
  subscriptionPlans: SellingPlan[];
  discountPercentage: number;
  rechargeSellingPlanId: string;
}

// Determine which Recharge selling plan ID to use based on product
export function getRechargeSellingPlanId(product: UIProduct): string {
  const title = product.title?.toLowerCase() || '';
  
  // Map products to their specific selling plan IDs
  if (title.includes('lemon') && title.includes('mint')) {
    return SELLING_PLAN_IDS.LEMON_MINT;
  }
  if (title.includes('raspberry') && title.includes('hibiscus')) {
    return SELLING_PLAN_IDS.RASPBERRY_HIBISCUS;
  }
  if (title.includes('grapefruit') && title.includes('ginger')) {
    return SELLING_PLAN_IDS.GRAPEFRUIT_GINGER;
  }
  if (title.includes('blueberry') && title.includes('lavender')) {
    return SELLING_PLAN_IDS.BLUEBERRY_LAVENDER;
  }
  
  // Fallback to Lemon Mint plan for unknown products
  return SELLING_PLAN_IDS.LEMON_MINT;
}

// Get Recharge subscription options using ONLY real selling plan data
export function getRechargeSubscriptionOptions(product: UIProduct): RechargeSubscriptionOptions | null {
  const rechargeSellingPlanId = getRechargeSellingPlanId(product);
  
  // Only look for the selling plan in existing product data
  if (product.sellingPlanGroups?.edges) {
    for (const groupEdge of product.sellingPlanGroups.edges) {
      for (const planEdge of groupEdge.node.sellingPlans.edges) {
        const plan = planEdge.node;
        
        // Found the Recharge selling plan - use its real data
        if (plan.id === rechargeSellingPlanId) {
          const discountPercentage = getDiscountPercentage(plan);
          
          // Validate the plan has required data
          if (discountPercentage > 0) {
            return {
              subscriptionPlans: [plan],
              discountPercentage,
              rechargeSellingPlanId
            };
          } else {
            console.warn(`Selling plan ${rechargeSellingPlanId} found but has no discount configured`);
          }
        }
      }
    }
  }
  
  // If we get here, the Recharge selling plan is not properly configured
  console.warn(`Recharge selling plan ${rechargeSellingPlanId} not found for product: ${product.title}`);
  
  // Log available selling plans for debugging
  if (product.sellingPlanGroups?.edges) {
    const availablePlans = product.sellingPlanGroups.edges.flatMap(e => 
      e.node.sellingPlans.edges.map(p => ({ 
        id: p.node.id, 
        name: p.node.name,
        description: p.node.description 
      }))
    );
    console.log('Available selling plans for product:', product.title, availablePlans);
    
    // Try to find any subscription plan as fallback
    for (const groupEdge of product.sellingPlanGroups.edges) {
      for (const planEdge of groupEdge.node.sellingPlans.edges) {
        const plan = planEdge.node;
        const planText = `${plan.name} ${plan.description}`.toLowerCase();
        
        if (planText.includes('subscription') || planText.includes('recurring') || planText.includes('delivery')) {
          console.log(`Using fallback selling plan: ${plan.id} (${plan.name})`);
          const discountPercentage = getDiscountPercentage(plan);
          
          return {
            subscriptionPlans: [plan],
            discountPercentage,
            rechargeSellingPlanId: plan.id
          };
        }
      }
    }
  }
  
  // Return null - don't show subscription option if no valid plan exists
  return null;
}

// Helper to determine if a product should have subscription options
export function shouldShowSubscriptionOption(product: UIProduct): boolean {
  // Don't show for sample packs
  const isSamplePack = product.title?.toLowerCase().includes('sample') ||
                       product.handle?.includes('sample');
  
  if (isSamplePack) {
    return false;
  }
  
  // Only show if we can find a valid Recharge selling plan
  const rechargeOptions = getRechargeSubscriptionOptions(product);
  return rechargeOptions !== null;
}

// Configuration validation helper for development/deployment
export function validateRechargeConfiguration(product: UIProduct): {
  isValid: boolean;
  errors: string[];
  expectedSellingPlanId: string;
} {
  const expectedSellingPlanId = getRechargeSellingPlanId(product);
  const errors: string[] = [];
  
  // Check if product has selling plan groups
  if (!product.sellingPlanGroups?.edges?.length) {
    errors.push('Product has no selling plan groups');
  } else {
    // Check if the expected Recharge selling plan exists
    let foundPlan = false;
    
    for (const groupEdge of product.sellingPlanGroups.edges) {
      for (const planEdge of groupEdge.node.sellingPlans.edges) {
        if (planEdge.node.id === expectedSellingPlanId) {
          foundPlan = true;
          
          // Validate the plan has proper configuration
          const discountPercentage = getDiscountPercentage(planEdge.node);
          if (discountPercentage <= 0) {
            errors.push(`Selling plan ${expectedSellingPlanId} has no discount configured`);
          }
          
          const deliveryFrequency = getDeliveryFrequency(planEdge.node);
          if (!deliveryFrequency) {
            errors.push(`Selling plan ${expectedSellingPlanId} has no delivery frequency configured`);
          }
          
          break;
        }
      }
    }
    
    if (!foundPlan) {
      errors.push(`Expected selling plan ${expectedSellingPlanId} not found`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    expectedSellingPlanId
  };
}