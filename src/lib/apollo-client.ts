import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Ensure the API URL is defined (this is public and required)
const SHOPIFY_API_URL = process.env.NEXT_PUBLIC_SHOPIFY_API_URL || "";

// Ensure the Shopify Access Token is only used on the server
const SHOPIFY_ACCESS_TOKEN = 
  typeof window === "undefined" ? process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN : "";

// Prevent app from starting if the required environment variables are missing (only on server)
if (typeof window === "undefined" && !SHOPIFY_ACCESS_TOKEN) {
  throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN in environment variables.");
}

const httpLink = createHttpLink({
  uri: SHOPIFY_API_URL, // ✅ Safe to expose
});

// Set headers (only adds token on server-side)
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
    },
  };
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;


