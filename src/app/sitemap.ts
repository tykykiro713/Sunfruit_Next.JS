// src/app/sitemap.ts
// Dynamic sitemap that includes all products from Shopify
import { fetchProducts } from '@/lib/shopify'

// Define the sitemap types manually
type SitemapEntry = {
  url: string
  lastModified?: string | Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

type Sitemap = SitemapEntry[]

export default async function sitemap(): Promise<Sitemap> {
  const baseUrl = 'https://sunfruit.com'
  
  // Static pages
  const staticPages: Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/aboutus`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/findus`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contactus`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/account`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/account/login`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/account/register`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  try {
    // Fetch all products from Shopify
    // Using a higher number to get all products - adjust as needed
    const products = await fetchProducts(250)
    
    // Create product pages
    const productPages: Sitemap = products.map((product) => ({
      url: `${baseUrl}/products/${product.handle}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))

    // Combine static and dynamic pages
    return [...staticPages, ...productPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return just static pages if product fetch fails
    return staticPages
  }
}