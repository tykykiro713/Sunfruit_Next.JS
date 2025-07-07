// src/app/robots.txt/route.ts
// Simple robots.txt route handler
import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Disallow private areas
Disallow: /account/
Disallow: /cart
Disallow: /checkout
Disallow: /admin/
Disallow: /api/
Disallow: /*.json
Disallow: /search?*

# Sitemap location
Sitemap: https://sunfruit.com/sitemap.xml`

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  })
}