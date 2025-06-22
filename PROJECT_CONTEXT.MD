Sunfruit E-commerce Project Context
I'm working on a Next.js e-commerce project for Sunfruit (sunfruit.com) using Shopify as my product database.
Tech Stack
Next.js 15 with App Router and TypeScript
React 19
Tailwind CSS for styling (emerald green primary: emerald-500: #004E36)
Apollo Client for GraphQL queries to Shopify Storefront API
Headless UI for accessible components
Vercel hosting with GitHub auto-deployment
CRITICAL: Next.js 15 Breaking Changes
1. Params and searchParams are now async Promises - Essential for deployment:
// ❌ OLD (breaks deployment):
export default function Page({ params }: { params: { handle: string } }) {
  return <div>{params.handle}</div>
}


// ✅ NEW (required for Next.js 15):
export default async function Page({ params }: { params: Promise<{ handle: string }> }) {
  const resolvedParams = await params;
  return <div>{resolvedParams.handle}</div>
}

2. Image Component Changes - Always use:
import Image from 'next/image'
// Always include width, height, and alt for performance
<Image src="/image.jpg" width={500} height={300} alt="Description" />

3. Font Loading - Use Next.js font optimization:
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], display: 'swap' })

Key Integrations
Shopify Storefront API via Apollo Client
Microsoft Clarity for analytics
Google Analytics 4 and Google Ads
Zendesk for customer service
Product subscriptions (planning to implement soon)
Context Providers
CartContext - Shopping cart with subscription support
CustomerContext - Authentication and customer management
MyContext - GA4 pageview tracking
Folder Structure
src/
├── app/ (Next.js App Router pages)
├── components/ (Reusable UI components)
├── context/ (React Context providers)
├── lib/ (API utilities: shopify.ts, apollo-client.ts, cart.ts, customer.ts)
├── templates/ (Page section templates)
└── types/ (TypeScript definitions)

Development Preferences
Complete components/pages - not code snippets
Always use artifacts to prevent formatting errors
Request additional files before making assumptions
Follow existing naming conventions (camelCase components, kebab-case files)
Escape apostrophes to avoid linting errors
Consider code continuity - don't accidentally omit existing features
ALWAYS use async params/searchParams - Critical for Next.js 15 deployment
Performance & Quality Standards (CRITICAL for paid traffic conversions)
Performance - Priority #1: Optimize Core Web Vitals (LCP <2.5s, CLS <0.1, FID <100ms)
Accessibility - WCAG 2.1 AA compliance to avoid legal issues
Best Practices - Follow Next.js and Google recommendations
SEO - Proper meta tags, semantic HTML, structured data
Browser Support - Modern browsers per Next.js defaults
Testing - Interested in implementing automated testing to reduce manual testing risks
Design Guidelines
Clean, minimal UI with emerald green branding (#004E36)
Accessible components with proper contrast ratios
Responsive design optimized for all viewports
Performance-first - Image optimization, code splitting, lazy loading
Conversion-focused - Fast loading for paid traffic success
Current Features
Product listing and detail pages
Shopping cart with drawer functionality
Customer authentication (login/register/password reset)
Responsive navigation with mobile/desktop views
Custom quantity selectors
Basic subscription framework (ready for full implementation)
Optimized images and video loading
Google Analytics event tracking
Immediate Priorities
Subscription integration - Full implementation coming soon
Performance optimization - Critical for paid traffic ROI
Automated testing setup - Reduce manual testing risks as site scales
Key Files to Reference
When relevant, I'll attach these files for additional context:
src/lib/shopify.ts - Product and GraphQL queries
src/lib/apollo-client.ts - Apollo configuration
src/context/CartContext.tsx - Cart state management
src/context/CustomerContext.tsx - Authentication
src/app/layout.tsx - Root layout and providers
tailwind.config.ts - Custom colors and styling
Component files related to the specific request
