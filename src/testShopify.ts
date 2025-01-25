import client from "@/lib/apollo-client";
import { gql } from "@apollo/client";

const TEST_QUERY = gql`
  query {
    shop {
      name
    }
  }
`;

async function testShopifyAPI() {
  try {
    const { data } = await client.query({ query: TEST_QUERY });
    console.log("Shopify Store Name:", data.shop.name);
  } catch (error) {
    console.error("Error connecting to Shopify API:", error);
  }
}

testShopifyAPI();
