import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Debug: Log the environment variables
console.log("Apollo Client Config:", {
  uri: process.env.NEXT_PUBLIC_SHOPIFY_API_URL,
  token: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SHOPIFY_API_URL, // Use the full API URL directly
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  },
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;



