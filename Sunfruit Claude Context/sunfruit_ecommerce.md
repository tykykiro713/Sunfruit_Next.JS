# Sunfruit E-commerce & Tech Stack Context

## Platform Overview

Sunfruit operates on Shopify with Shop Pay enabled. Subscriptions are the heart of the business model.

---

## Website: sunfruit.com

### Current State
- Built on Shopify
- Shop Pay enabled (accelerated checkout)
- Direct-to-consumer sales channel

### SEO Priorities

**Target Keywords:**
- Primary: "organic drink mix," "zero sugar hydration," "natural drink powder"
- Secondary: "healthy beverage alternatives," "sugar-free electrolytes," "organic fruit drinks"
- Long-tail: "best organic drink mix for hydration," "zero sugar sports drink alternative"

**Technical SEO Needs:**
- Optimize title tags (e.g., "Sunfruit - Organic Zero Sugar Drink Mix | Natural Hydration")
- Add meta descriptions for all pages
- Implement structured data for products/reviews
- Create XML sitemap
- Mobile optimization (WebP images, lazy loading)

**Content Strategy:**
- Recipe content: "Healthy smoothie recipes with Sunfruit"
- Comparison guides: "Sunfruit vs traditional sports drinks"
- Lifestyle content: "Staying hydrated during workouts naturally"

---

## Subscription Platform Comparison

### Recharge

**Pricing:**
- Starter: $50/month (first 50 subscribers free of transaction fees)
- Standard: $99/month + 1.25% + 19¢ per transaction
- Pro: $499/month + 1% + 19¢ per transaction

**Key Features:**
- Flexible subscription management
- Dynamic bundles (2.7x higher LTV for bundle shoppers)
- Advanced analytics with industry benchmarking
- Retention tools (cancellation flows, win-back campaigns)
- SMS subscription management
- A/B testing
- Multi-currency support
- Extensive integrations (Klaviyo, Gorgias, Zendesk)

**Best For:**
- Lower monthly commitment to start
- Extensive third-party integrations
- Industry benchmarking data (20,000+ merchants)

### Skio

**Pricing:**
- $499/month (or $399/month annual)
- 1% + 20¢ per order

**Key Features:**
- 1-click checkout with Shop Pay (72% conversion increase claim)
- Passwordless login (reduces support tickets by 80%)
- Native Shopify integration
- Advanced box builder
- "Surprise & Delight" retention feature
- Family plan and volume discounts
- Direct human support (no ticket system)
- Free migration with dedicated Launch Engineering team

**Best For:**
- Highest conversion rates
- Minimal customer support burden
- Modern, mobile-first experience

### Recommendation
**Start with Recharge Starter ($50/month)** to validate subscription model. Reassess for Skio's conversion benefits once beyond 50 subscribers and proven product-market fit.

### Key Insight
Both platforms support Shop Pay accelerated checkout. The "72% increase" Skio advertises is comparing Shop Pay to non-Shop Pay checkouts, not Skio vs Recharge with Shop Pay enabled.

---

## Subscription Offer Best Practices

### Proven High-ROI Offers

**1. Subscribe & Save (15-20%)**
- Industry standard baseline
- Creates habit without feeling "locked in"
- Sunfruit using 40% for aggressive growth

**2. First Order Discount (25-40%)**
- Reduces trial friction
- 40% off first order recommended
- "Subscribe to full size for 40% off first order"

**3. Prepaid Subscription Ladder**
- 3 months prepaid: 5% additional discount
- 6 months prepaid: 10% additional discount
- 12 months prepaid: 15% additional discount
- Benefits: Accelerated cash flow, reduced churn

**4. Skip/Pause/Modify Flexibility**
- Must-have to prevent "product buildup" churn
- Allow frequency changes (every 2, 3, 4 weeks)
- One-click pause for vacations

**5. Surprise & Delight**
- Unexpected free gift after order #3 or #4
- Handwritten note from founder
- Exclusive access to new flavors

**6. Free Shipping for Subscribers**
- Clear ongoing value
- Non-subscribers need $X minimum

### Offers Sunfruit Is Using
- 40% Subscribe & Save discount
- Prepaid discounts + surprise & delight
- Minimal discounting to attract organic-seeking customers willing to pay premium

---

## Checkout Experience

### Shop Pay Benefits
- Saved payment/shipping info
- One-tap checkout
- Installment options
- Order tracking in Shop app

### Customer Portal Differences
**Skio:** Passwordless login (4-digit code via SMS/email), modern React interface
**Recharge:** Traditional password login, extensive customization

---

## Email Marketing

### Platform Integration
Both Recharge and Skio integrate with:
- Klaviyo (recommended)
- Mailchimp
- Postscript (SMS)

### Key Email Flows
1. **Welcome Series** - Brand story, product education
2. **Post-Sample** - Convert samplers to purchasers
3. **Subscription Confirmation** - Order details, what to expect
4. **Win-Back** - Re-engage churned subscribers
5. **Referral** - Encourage word-of-mouth

---

## Analytics & Tracking

### Essential Metrics to Track
- Customer Acquisition Cost (CAC) by channel
- Lifetime Value (LTV) by acquisition source
- Subscription rate (target: 20-30%)
- Monthly churn (target: 6-9%)
- Average Order Value (AOV)
- Sample → Purchase conversion
- Payback period

### Tools
- Shopify Analytics (basic)
- Google Analytics 4 (website behavior)
- Subscription platform analytics (cohort analysis, retention curves)
- UTM tracking on all campaigns

### UTM Structure Example
```
source: mail-insert, facebook, google, subscription-box
medium: qr-code, cpc, email, influencer
campaign: beverage-sample-20off-2025, summer-launch
content: insert-v1, batch-a (for A/B testing)
```

---

## QR Code Tracking

### Recommended Providers
1. **Bitly** - Most established, deepest analytics
2. **QR TIGER** - Best value with strong security
3. **QRCodeChimp** - SOC 2 certified, enterprise features

### Setup for Mail Inserts
- Dynamic QR codes (can update destination without reprinting)
- Track scans by location, device, time
- A/B test different QR code designs
- Link to landing page with UTM parameters

---

## Tech Stack Summary

### Current/Recommended Stack

| Function | Tool | Cost |
|----------|------|------|
| E-commerce | Shopify | $39-299/month |
| Payments | Shop Pay/Shopify Payments | 2.9% + $0.30 |
| Subscriptions | Recharge Starter → Skio | $50-499/month |
| Email | Klaviyo | Free to $45+/month |
| SMS | Postscript or Klaviyo | Usage-based |
| QR Codes | Bitly or QR TIGER | $10-35/month |
| Analytics | GA4 + Shopify | Free |
| Automation | Clay.com, Instantly.ai | $150-200/month |
| CRM | Airtable | Free |
| Design | Canva Pro | $12/month |

### Monthly Tech Costs (Starting)
- Essential: ~$100-150/month
- With automation tools: ~$300-400/month
- Full stack at scale: ~$600-800/month

---

## Future Considerations

### Features to Enable Later
- Loyalty program (Smile.io, Yotpo)
- Referral program (ReferralCandy)
- Reviews (Judge.me, Yotpo)
- Upsell/Cross-sell apps
- Subscription box builder (if offering variety packs)

### Integration Priorities
1. Klaviyo for email/SMS (mission critical)
2. Google Analytics 4 (tracking)
3. Subscription platform webhooks (automation triggers)
