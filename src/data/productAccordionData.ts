// This file contains accordion data organized by product handle
// src/data/productAccordionData.ts

export interface AccordionItem {
    name: string;
    content: string[];
  }
  
  export interface ProductAccordionData {
    items: AccordionItem[];
  }
  
  // Default accordion data used when no product-specific data is found
  export const defaultAccordionData: ProductAccordionData = {
    items: [
      {
        name: "Description",
        content: [
          "Made from organic fruits and botanicals",
          "Prebiotics to improve gut health",
          "10 Calories, Zero sugar, Zero Carbs, Zero Preservatives",
          "20 stick packs per can",
          "Simply mix with 16oz of water and enjoy",
        ],
      },
      {
        name: "Ingredients",
        content: [
            "Organic Inulin (Prebiotic}",
            "Organic Fruit Extract",
            "Organic Botanical Extract",
            "Organic Monk Fruit Extract",
        ],
      },
      {
        name: "Shipping & Returns",
        content: [
          "Free Shipping on all orders",
          "Delivered in 2-3 business days",
          "We are unable to accept returns on opened product",
        ],
      },
      {
        name: "Subscription",
        content: [
            "Subscribe and save 33%",
            "Pause or cancel your subscription at any time",
            "Easy to change your flavors or shipping frequency",
        ],
      },
    ],
  };
  
  // Product-specific accordion data mapped by product handle
  const productAccordionData: Record<string, ProductAccordionData> = {
    // Lemon Mint product
    "lemon-mint": {
      items: [
        {
          name: "Description",
          content: [
            "Made from organic lemon and organic mint",
            "Prebiotics to improve gut health",
            "10 Calories, Zero sugar, Zero Carbs, Zero Preservatives",
            "20 stick packs per can",
            "Simply mix with 16oz of water and enjoy",
          ],
        },
        {
          name: "Ingredients",
          content: [
            "Organic Inulin (Prebiotic}",
            "Organic Lemon Extract",
            "Organic Mint Extract",
            "Organic Monk Fruit Extract",
          ],
        },
        {
          name: "Shipping & Returns",
          content: [
            "Free Shipping on all orders",
            "Delivered in 2-3 business days",
            "We are unable to accept returns on opened product",
          ],
        },
        {
          name: "Subscription",
          content: [
            "Subscribe and save 33%",
            "Pause or cancel your subscription at any time",
            "Easy to change your flavors or shipping frequency",
          ],
        },
      ],
    },
    
    // Lime Basil product
    "lime-basil": {
      items: [
        {
          name: "Description",
          content: [
            "Made from organic lime and organic basil",
            "Prebiotics to improve gut health",
            "10 Calories, Zero sugar, Zero Carbs, Zero Preservatives",
            "20 stick packs per can",
            "Simply mix with 16oz of water and enjoy",
          ],
        },
        {
          name: "Ingredients",
          content: [
            "Organic Inulin (Prebiotic}",
            "Organic Lime Extract",
            "Organic Basil Extract",
            "Organic Monk Fruit Extract",
          ],
        },
        {
          name: "Shipping & Returns",
          content: [
            "Free Shipping on all orders",
            "Delivered in 2-3 business days",
            "We are unable to accept returns on opened product",
          ],
        },
        {
          name: "Subscription",
          content: [
            "Subscribe and save 33%",
            "Pause or cancel your subscription at any time",
            "Easy to change your flavors or shipping frequency",
          ],
        },
      ],
    },
    
    // Raspberry Hibiscus product
    "raspberry-hibiscus": {
      items: [
        {
          name: "Description",
          content: [
            "Made from organic raspberry and organic hibiscus",
            "Prebiotics to improve gut health",
            "10 Calories, Zero sugar, Zero Carbs, Zero Preservatives",
            "20 stick packs per can",
            "Simply mix with 16oz of water and enjoy",
          ],
        },
        {
          name: "Ingredients",
          content: [
            "Organic Inulin (Prebiotic}",
            "Organic Raspberry Extract",
            "Organic Hibiscus Extract",
            "Organic Monk Fruit Extract",
          ],
        },
        {
          name: "Shipping & Returns",
          content: [
            "Free Shipping on all orders",
            "Delivered in 2-3 business days",
            "We are unable to accept returns on opened product",
          ],
        },
        {
          name: "Subscription",
          content: [
            "Subscribe and save 33%",
            "Pause or cancel your subscription at any time",
            "Easy to change your flavors or shipping frequency",
          ],
        },
      ],
    },
    
    // Grapefruit Ginger product
    "grapefruit-ginger": {
      items: [
        {
          name: "Description",
          content: [
            "Made from organic grapefruit and organic ginger",
            "Prebiotics to improve gut health",
            "10 Calories, Zero sugar, Zero Carbs, Zero Preservatives",
            "20 stick packs per can",
            "Simply mix with 16oz of water and enjoy",
          ],
        },
        {
          name: "Ingredients",
          content: [
            "Organic Inulin (Prebiotic}",
            "Organic Grapefruit Extract",
            "Organic Ginger Extract",
            "Organic Monk Fruit Extract",
          ],
        },
        {
          name: "Shipping & Returns",
          content: [
            "Free Shipping on all orders",
            "Delivered in 2-3 business days",
            "We are unable to accept returns on opened product",
          ],
        },
        {
          name: "Subscription",
          content: [
            "Subscribe and save 33%",
            "Pause or cancel your subscription at any time",
            "Easy to change your flavors or shipping frequency",
          ],
        },
      ],
    }
  };
  
  /**
   * Get accordion data for a specific product handle
   * @param handle The product handle to get accordion data for
   * @returns The accordion data for the specified product or the default accordion data
   */
  export function getProductAccordionData(handle: string): ProductAccordionData {
    return productAccordionData[handle] || defaultAccordionData;
  }
  
  export default productAccordionData;