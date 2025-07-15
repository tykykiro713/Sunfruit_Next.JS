# Sunfruit Vine Section - Workflow Architecture

## Overview
This document outlines the complete technical workflow architecture for creating and managing the Sunfruit vine section content at scale. The system is designed to generate 400-650 pages of SEO-optimized health and wellness content using automated workflows.

## Architecture Overview

### **System Flow**
```
Ahrefs Research → MongoDB → GitHub Actions → OpenAI API → Grammarly API → Next.js Frontend
```

## Technology Stack

### **Database Layer**
**MongoDB Atlas** - Primary data storage
- **Purpose:** Store topic data, prompts, keywords, content status
- **Benefits:** 
  - Flexible schema for different content types
  - Easy to scale as pillars are added
  - Good integration with automation tools
  - Cloud-hosted with automatic backups
- **Cost:** $0-57/month (depending on usage)
- **Alternative:** Airtable ($20/month) - easier setup but less scalable

### **Content Management System**
**Strapi Cloud** - Headless CMS
- **Purpose:** Manage and serve content via API to Next.js
- **Benefits:**
  - Perfect integration with Next.js frontend
  - API-first approach matches existing tech stack
  - Custom content types for pillar vs cluster pages
  - Built-in SEO optimization features
- **Cost:** $15-99/month
- **Alternative:** Contentful (more expensive but more features)

### **Workflow Automation**
**n8n Cloud** - Process orchestration
- **Purpose:** Automate the entire content creation pipeline
- **Benefits:**
  - Visual workflow builder
  - Great integrations with ChatGPT, MongoDB, Strapi
  - Cost-effective for large-scale automation
  - Open source with cloud hosting option
- **Cost:** $20-50/month
- **Alternative:** Zapier (easier but expensive at scale)

### **Content Generation**
**OpenAI ChatGPT API** - AI content creation
- **Purpose:** Generate pillar and cluster page content
- **Benefits:**
  - Consistent quality at scale
  - API integration for automation
  - Cost-effective for high volume
- **Cost:** ~$50-200/month (depending on usage)

### **SEO & Research Tools**
**Ahrefs** - Keyword research and competitive analysis
- **Purpose:** Research keywords for all 25 pillar topics
- **Benefits:**
  - Comprehensive keyword data
  - Competitor content gap analysis
  - Rank tracking for all topics
- **Cost:** $99/month

**Surfer SEO** - Content optimization
- **Purpose:** Optimize content for search engines
- **Benefits:**
  - Real-time content scoring
  - SERP analysis for target keywords
  - Content recommendations
- **Cost:** $59/month

### **Quality Control**
**Grammarly Business API** - Content quality assurance
- **Purpose:** Automated grammar, style, and consistency checking
- **Benefits:**
  - Ensures consistency across 400+ pages
  - Brand voice alignment
  - Plagiarism detection
- **Cost:** $15/month

## Detailed Workflow Process

### **Phase 1: Setup & Data Preparation**

1. **Keyword Research**
   - Use Ahrefs to research each of 25 pillar topics
   - Identify high-value cluster page keywords
   - Export data to structured format

2. **Database Setup**
   - Create MongoDB collections:
     - `topics` - Pillar and cluster topic data
     - `content` - Generated content and status
     - `keywords` - Keyword research data
     - `prompts` - AI prompts for different content types

3. **Data Import**
   - Import keyword research into MongoDB
   - Create content prompts for each topic type
   - Set up content status tracking

### **Phase 2: Content Generation Pipeline**

```mermaid
graph LR
    A[MongoDB] --> B[n8n Workflow]
    B --> C[ChatGPT API]
    C --> D[Grammarly API]
    D --> E[Strapi CMS]
    E --> F[Next.js Frontend]
```

1. **n8n Automation Workflow:**
   - Fetch pending topics from MongoDB
   - Generate content using ChatGPT API
   - Run quality checks with Grammarly API
   - Upload to Strapi via API
   - Update status in MongoDB

2. **Content Generation Process:**
   - Pull topic and keywords from database
   - Generate structured content (title, meta, body)
   - Apply brand voice and style guidelines
   - Create internal linking suggestions

3. **Quality Control:**
   - Automated grammar and style checking
   - Plagiarism detection
   - Brand voice consistency scoring
   - Manual review queue for high-priority content

### **Phase 3: SEO Optimization & Publishing**

1. **SEO Analysis:**
   - Surfer SEO content scoring
   - Keyword density optimization
   - Meta description generation
   - Internal linking recommendations

2. **Publishing Schedule:**
   - Automated publishing via n8n
   - Staggered release (10-20 pages per day)
   - Social media promotion automation
   - Search Console sitemap submission

3. **Performance Monitoring:**
   - Google Analytics integration
   - Search Console rank tracking
   - Ahrefs position monitoring
   - Content performance analysis

## Database Schema

### **Topics Collection**
```json
{
  "_id": "ObjectId",
  "pillar_id": "string",
  "type": "pillar|cluster",
  "title": "string",
  "slug": "string",
  "keywords": ["string"],
  "target_word_count": "number",
  "priority": "high|medium|low",
  "status": "pending|generated|reviewed|published",
  "content_prompt": "string",
  "created_at": "date",
  "updated_at": "date"
}
```

### **Content Collection**
```json
{
  "_id": "ObjectId",
  "topic_id": "ObjectId",
  "title": "string",
  "meta_description": "string",
  "content": "string",
  "word_count": "number",
  "seo_score": "number",
  "quality_score": "number",
  "strapi_id": "string",
  "published_at": "date",
  "performance_metrics": {
    "views": "number",
    "avg_time_on_page": "number",
    "bounce_rate": "number"
  }
}
```

## Tool Budget Analysis

### **Minimum Viable Stack**
- MongoDB Atlas: $0-25/month
- Strapi Cloud: $15/month  
- n8n Cloud: $20/month
- ChatGPT API: $50/month
- Ahrefs: $99/month
- **Total: ~$200/month**

### **Recommended Full Stack**
- MongoDB Atlas: $25/month
- Strapi Cloud: $25/month
- n8n Cloud: $50/month
- ChatGPT API: $100/month
- Ahrefs: $99/month
- Surfer SEO: $59/month
- Grammarly Business: $15/month
- **Total: ~$350/month**

### **Free Tools (Supplementary)**
- Google Search Console
- Google Analytics
- Answer The Public (free tier)
- Google Keyword Planner
- Google Trends

## Alternative Budget-Conscious Approach

### **Phase 1 Starter Stack**
- Airtable: $20/month (database + visual interface)
- ChatGPT Plus: $20/month (manual content creation)
- Next.js + Markdown files (file-based CMS)
- Free SEO tools for research
- **Total: $40/month**

### **Migration Path**
1. Start with simple stack to validate content strategy
2. Scale to full automation as content volume increases
3. Migrate to professional tools when ROI is proven

## Performance Expectations

### **Content Output**
- **Manual approach:** 2-3 pages per day
- **Semi-automated:** 5-10 pages per day
- **Fully automated:** 20-50 pages per day

### **Timeline Estimates**
- **Setup phase:** 2-3 weeks
- **Content generation:** 6-8 weeks (400+ pages)
- **SEO optimization:** 4-6 weeks
- **Total project timeline:** 3-4 months

### **ROI Projections**
- **Initial investment:** $1,000-1,500 (setup + 3 months tools)
- **Expected traffic increase:** 50-200% within 6 months
- **Conversion improvement:** 15-30% from targeted content
- **Break-even timeline:** 6-12 months

## Implementation Phases

### **Phase 1: Foundation (Week 1-2)**
1. Set up MongoDB Atlas instance
2. Configure Strapi CMS with content types
3. Design n8n workflow architecture
4. Import initial keyword research

### **Phase 2: Automation (Week 3-4)**
1. Build n8n content generation workflow
2. Test ChatGPT API integration
3. Set up Grammarly quality checks
4. Create Strapi publishing automation

### **Phase 3: Content Creation (Week 5-12)**
1. Generate pillar pages (25 pages)
2. Create cluster pages (375+ pages)
3. Implement SEO optimizations
4. Set up publishing schedule

### **Phase 4: Optimization (Week 13-16)**
1. Monitor performance metrics
2. Optimize underperforming content
3. Expand successful topic clusters
4. Refine automation workflows

## Next Steps

1. **Immediate Actions:**
   - Set up MongoDB Atlas account
   - Configure Strapi Cloud instance
   - Create n8n Cloud account
   - Obtain ChatGPT API access

2. **Week 1 Goals:**
   - Complete database schema design
   - Set up basic n8n workflow
   - Import first pillar topic data
   - Test content generation pipeline

3. **Success Metrics:**
   - Content generation speed (pages per day)
   - Quality scores (Grammarly + manual review)
   - SEO performance (keyword rankings)
   - Traffic growth (organic search)

---

*This architecture is designed to scale efficiently while maintaining content quality and SEO best practices. The automated approach enables rapid content creation while preserving the high standards required for Sunfruit's brand authority in the health and wellness space.*