// This file contains accordion data organized by product handle
// src/data/productAccordionData.ts

export interface AccordionItem {
    name: string;
    content: string[];
  }
  
  export interface ProductAccordionData {
    items: AccordionItem[];
  }
  
  // Product-specific accordion data mapped by product handle.
  // No default/fallback — if a product isn't listed here, the accordion
  // simply won't render. This avoids displaying generic ingredient info
  // that could violate FDA labeling requirements.
  const productAccordionData: Record<string, ProductAccordionData> = {
    // Lemon Mint product
    "lemon-mint": {
      items: [
        {
          name: "Description",
          content: [
            "USDA Certified Organic & Non-GMO",
            "Made from real lemons and mint extract",
            "No sugar added, no sodium, Keto friendly, nothing artificial",
            "3 stick packs per sample. 24 stick packs per tin",
            "Simply mix with 12-16oz of water and enjoy",
          ],
        },
        {
          name: "Ingredients",
          content: [
            "Organic Lemon Juice Powder",
            "Organic Natural Flavors",
            "Citric Acid",
            "Organic Fruit & Vegetable Juice (color)",
            "Organic Stevia Leaf Extract",
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
            "Subscribe and save 15%",
            "Easily manage your subscription via text",
            "Swap flavors or skip shipments on the go",
            "Pre-shipment notifications (no surprises)",
            "Pause or cancel anytime",
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
            "USDA Certified Organic & Non-GMO",
            "Made from real limes and basil extract",
            "No sugar added, no sodium, Keto friendly, nothing artificial",
            "3 stick packs per sample. 24 stick packs per tin",
            "Simply mix with 12-16oz of water and enjoy",
          ],
        },
        {
          name: "Ingredients",
          content: [
            "Organic Lime Juice Powder",
            "Organic Natural Flavors",
            "Citric Acid",
            "Organic Fruit & Vegetable Juice (color)",
            "Organic Stevia Leaf Extract",
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
            "Subscribe and save 15%",
            "Easily manage your subscription via text",
            "Swap flavors or skip shipments on the go",
            "Pre-shipment notifications (no surprises)",
            "Pause or cancel anytime",
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
            "USDA Certified Organic & Non-GMO",
            "Made from real raspberries and hibiscus extract",
            "No sugar added, no sodium, Keto friendly, nothing artificial",
            "3 stick packs per sample. 24 stick packs per tin",
            "Simply mix with 12-16oz of water and enjoy",
          ],
        },
        {
          name: "Ingredients",
          content: [
            "Organic Raspberry Juice Powder",
            "Organic Natural Flavors",
            "Citric Acid",
            "Organic Fruit & Vegetable Juice (color)",
            "Organic Stevia Leaf Extract",
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
            "Subscribe and save 15%",
            "Easily manage your subscription via text",
            "Swap flavors or skip shipments on the go",
            "Pre-shipment notifications (no surprises)",
            "Pause or cancel anytime",
          ],
        },
      ],
    },
    
    // Pomegranate Rose product
    "pomegranate-rose": {
      items: [
        {
          name: "Description",
          content: [
            "USDA Certified Organic & Non-GMO",
            "Made from real pomegranate and rose extract",
            "No sugar added, no sodium, Keto friendly, nothing artificial",
            "3 stick packs per sample. 24 stick packs per tin",
            "Simply mix with 12-16oz of water and enjoy",
          ],
        },
        {
          name: "Ingredients",
          content: [
            "Organic Pomegranate Juice Powder",
            "Organic Natural Flavors",
            "Citric Acid",
            "Organic Fruit & Vegetable Juice (color)",
            "Organic Stevia Leaf Extract",
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
            "Subscribe and save 15%",
            "Easily manage your subscription via text",
            "Swap flavors or skip shipments on the go",
            "Pre-shipment notifications (no surprises)",
            "Pause or cancel anytime",
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
            "USDA Certified Organic & Non-GMO",
            "Made from real grapefruit and ginger extract",
            "No sugar added, no sodium, Keto friendly, nothing artificial",
            "3 stick packs per sample. 24 stick packs per tin",
            "Simply mix with 12-16oz of water and enjoy",
          ],
        },
        {
          name: "Ingredients",
          content: [
            "Organic Grapefruit Juice Powder",
            "Organic Natural Flavors",
            "Citric Acid",
            "Organic Fruit & Vegetable Juice (color)",
            "Organic Stevia Leaf Extract",
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
            "Subscribe and save 15%",
            "Easily manage your subscription via text",
            "Swap flavors or skip shipments on the go",
            "Pre-shipment notifications (no surprises)",
            "Pause or cancel anytime",
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
  export function getProductAccordionData(handle: string): ProductAccordionData | null {
    return productAccordionData[handle] || null;
  }
  
  export default productAccordionData;