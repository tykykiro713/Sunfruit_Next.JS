import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Ensure the API URL is defined
const SHOPIFY_API_URL = process.env.SHOPIFY_API_URL;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Ensure required environment variables exist
if (!SHOPIFY_API_URL) {
  throw new Error("Missing SHOPIFY_API_URL in environment variables.");
}
if (!SHOPIFY_ACCESS_TOKEN) {
  throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN in environment variables.");
}

// Create HTTP link for Shopify API
const httpLink = createHttpLink({
  uri: SHOPIFY_API_URL, // ✅ Uses correct URL from env
});

// Set headers with access token
const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
  },
}));

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;


