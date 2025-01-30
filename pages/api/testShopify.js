export default async function handler(req, res) {
    const SHOPIFY_API_URL = process.env.NEXT_PUBLIC_SHOPIFY_API_URL;
    const SHOPIFY_ACCESS_TOKEN = process.env.NEXT_SHOPIFY_ACCESS_TOKEN;

    const query = `
    {
      products(first: 5) {
        edges {
          node {
            id
            title
            description
            handle
          }
        }
      }
    }
  `;
  
    try {
      const response = await fetch(SHOPIFY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query }),
      });
  
      const data = await response.json();
  
      if (data.errors) {
        return res.status(400).json({ errors: data.errors });
      }
  
      res.status(200).json(data.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data from Shopify' });
    }
  }



  