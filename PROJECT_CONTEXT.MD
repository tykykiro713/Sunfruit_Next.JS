# Sunfruit E-commerce Project Context

I'm working on a Next.js e-commerce project for Sunfruit (sunfruit.com) using Shopify as my product database.

## Tech Stack
- Next.js 15 with App Router and TypeScript
- React 19
- Tailwind CSS for styling (emerald green primary: emerald-500: #004E36)
- Apollo Client for GraphQL queries to Shopify Storefront API
- Headless UI for accessible components
- Vercel hosting with GitHub auto-deployment

## CRITICAL: Next.js 15 Breaking Changes

### 1. Params and searchParams are now async Promises - Essential for deployment:
```typescript
// ❌ OLD (breaks deployment):
export default function Page({ params }: { params: { handle: string } }) {
  return <div>{params.handle}</div>
}

// ✅ NEW (required for Next.js 15):
export default async function Page({ params }: { params: Promise<{ handle: string }> }) {
  const resolvedParams = await params;
  return <div>{resolvedParams.handle}</div>
}
```

### 2. Image Component Changes - Always use:
```typescript
import Image from 'next/image'
// Always include width, height, and alt for performance
<Image src="/image.jpg" width={500} height={300} alt="Description" />
```

### 3. Font Loading - Use Next.js font optimization:
```typescript
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], display: 'swap' })
```

## TypeScript Global Declarations

**IMPORTANT**: Global type declarations are defined once in the project. DO NOT add these to individual components as it causes errors:

```typescript
// This is already declared globally - DO NOT add to components:
declare global {
  interface Window {
    _klOnsite: any;
  }
}
```

Components can directly use `window._klOnsite` without redeclaring the global interface.

## Key Integrations
- Shopify Storefront API via Apollo Client
- Microsoft Clarity for analytics
- Google Analytics 4 and Google Ads
- Zendesk for customer service
- Klaviyo for email marketing (uses `window._klOnsite`)
- Product subscriptions (planning to implement soon)

## Context Providers
- **CartContext** - Shopping cart with subscription support
- **CustomerContext** - Authentication and customer management
- **MyContext** - GA4 pageview tracking

## Folder Structure
```
src/
├── app/          (Next.js App Router pages)
├── components/   (Reusable UI components)
├── context/      (React Context providers)
├── lib/          (API utilities: shopify.ts, apollo-client.ts, cart.ts, customer.ts)
├── templates/    (Page section templates)
└── types/        (TypeScript definitions)
```

## Development Preferences
- Complete components/pages - not code snippets
- Always use artifacts to prevent formatting errors
- Request additional files before making assumptions
- Follow existing naming conventions (camelCase components, kebab-case files)
- Escape apostrophes to avoid linting errors
- Consider code continuity - don't accidentally omit existing features
- ALWAYS use async params/searchParams - Critical for Next.js 15 deployment
- DO NOT redeclare global TypeScript interfaces in components

## Performance & Quality Standards (CRITICAL for paid traffic conversions)
- **Performance** - Priority #1: Optimize Core Web Vitals (LCP <2.5s, CLS <0.1, FID <100ms)
- **Accessibility** - WCAG 2.1 AA compliance to avoid legal issues
- **Best Practices** - Follow Next.js and Google recommendations
- **SEO** - Proper meta tags, semantic HTML, structured data
- **Browser Support** - Modern browsers per Next.js defaults
- **Testing** - Interested in implementing automated testing to reduce manual testing risks

### Performance Optimization Guidelines

#### Image Loading Strategy
- **Above the fold**: Use `priority={true}` for LCP elements (e.g., VideoCTA poster image)
- **Below the fold**: Use `loading="lazy"` for all images
- **Hero images**: Consider using static images instead of videos on mobile for better performance
- **Responsive images**: Serve different images for mobile/desktop when file sizes differ significantly

#### Lazy Loading Implementation
```typescript
// Above the fold (VideoCTA, Navigation, ValueProps)
<Image priority={true} ... />

// Below the fold (ProductList, HeroSplit, SampleCTA, Footer)
<Image loading="lazy" placeholder="blur" blurDataURL="..." ... />
```

#### Video Loading Strategy
- **Above the fold videos**: Use Intersection Observer for controlled loading
- **Below the fold videos**: Use simple lazy loading with `preload="none"`
- **Mobile optimization**: Provide separate mobile-optimized video files
- **Fallbacks**: Always include poster images as fallbacks

#### Third-Party Script Loading Strategy (via ClientProviders.tsx)
- **Google Analytics/Ads**: Load immediately (needed for pageview tracking)
- **Zendesk**: Load on user interaction (click/scroll/touch) or after 10 seconds
- **Klaviyo**: Load on e-commerce actions (add to cart, out of stock) or after 15 seconds
- **Clarity**: Load on general interaction (mousemove/keydown) or after 5 seconds
- **Pattern**: Use dynamic imports with interaction-based or delayed loading

#### Current Performance Optimizations
- Lazy loading implemented for all below-the-fold images
- Separate mobile/desktop images where appropriate (e.g., SampleCTA)
- Video lazy loading with poster image fallbacks
- Third-party scripts use interaction-based loading via ClientProviders.tsx
- Preconnect headers for critical domains (Shopify CDN)

## Design Guidelines
- Clean, minimal UI with emerald green branding (#004E36)
- Accessible components with proper contrast ratios
- Responsive design optimized for all viewports
- Performance-first - Image optimization, code splitting, lazy loading
- Conversion-focused - Fast loading for paid traffic success

## Current Features
- Product listing and detail pages
- Shopping cart with drawer functionality
- Customer authentication (login/register/password reset)
- Responsive navigation with mobile/desktop views
- Custom quantity selectors
- Basic subscription framework (ready for full implementation)
- Optimized images and video loading
- Google Analytics event tracking
- Klaviyo integration for forms and tracking

## Immediate Priorities
- Subscription integration - Full implementation coming soon
- Performance optimization - Critical for paid traffic ROI
- Automated testing setup - Reduce manual testing risks as site scales

## Key Files to Reference
When relevant, I'll attach these files for additional context:
- `src/lib/shopify.ts` - Product and GraphQL queries
- `src/lib/apollo-client.ts` - Apollo configuration
- `src/context/CartContext.tsx` - Cart state management
- `src/context/CustomerContext.tsx` - Authentication
- `src/app/layout.tsx` - Root layout and providers
- `src/components/ClientProviders.tsx` - Third-party script loading orchestration
- `tailwind.config.ts` - Custom colors and styling
- Component files related to the specific request

## Project File Structure
```
.
├── PROJECT_CONTEXT.MD
├── next.config.js (Note: using .js not .ts)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx (homepage)
│   │   ├── globals.css
│   │   ├── aboutus/page.js
│   │   ├── findus/page.js
│   │   ├── contactus/page.tsx
│   │   ├── account/
│   │   │   ├── page.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── recover/page.tsx
│   │   │   ├── reset/[resetToken]/page.tsx
│   │   │   ├── addresses/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── products/[handle]/page.tsx
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── VideoCTA.tsx
│   │   ├── ValueProps.tsx
│   │   ├── ProductList.tsx
│   │   ├── SectionWave.tsx
│   │   ├── IngredientsSection.tsx
│   │   ├── HeroSplit.tsx
│   │   ├── SampleCTA.tsx
│   │   ├── Faqs.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── AddToCartButton.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── ProductMedia.tsx
│   │   ├── ProductInfo.tsx
│   │   ├── EnhancedProductForm.tsx
│   │   ├── SubscriptionSelector.tsx
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ClientProviders.tsx (manages all third-party script loading)
│   │   ├── GoogleAnalytics.tsx
│   │   ├── GoogleAdsTag.tsx
│   │   ├── ClarityProvider.tsx
│   │   ├── KlaviyoProvider.tsx
│   │   ├── ZendeskLauncher.tsx
│   │   └── SunfruitLogo.tsx
│   ├── context/
│   │   ├── CartContext.tsx
│   │   ├── CustomerContext.tsx
│   │   └── MyContext.tsx
│   ├── lib/
│   │   ├── shopify.ts
│   │   ├── apollo-client.ts
│   │   ├── cart.ts
│   │   ├── customer.ts
│   │   ├── analytics.ts
│   │   └── sellingPlans.ts
│   ├── types/
│   │   ├── global.d.ts (contains global TypeScript declarations)
│   │   └── product.ts
│   └── templates/ (additional page sections)
├── public/
│   ├── images/
│   │   ├── Logo_Trans.png
│   │   ├── Sunfruit_Green_Logo.svg
│   │   ├── Grapefruit.png
│   │   ├── Grapefruit_3.png
│   │   ├── samples-desktop.jpg
│   │   ├── samples-mobile.jpg
│   │   ├── grapefruit-poster.jpg
│   │   └── video-poster.jpg
│   └── videos/
│       ├── Lemonade_Creation.mp4
│       ├── Lemonade_Creation_Mobile.webm
│       └── GrapefruitSD_Mobile.mp4
└── tailwind.config.js (Note: using .js not .ts)