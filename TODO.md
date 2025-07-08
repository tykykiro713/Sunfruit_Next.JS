# Sunfruit E-commerce TODO List

## High Priority Features

### 1. Full Order Details Implementation
- [ ] Add `getCustomerOrder(accessToken, orderId)` function to `src/lib/shopify.ts`
- [ ] Create proper GraphQL query for single order with full details
- [ ] Implement order detail page with:
  - [ ] Order timeline (placed, processing, shipped, delivered)
  - [ ] Shipping address and tracking information
  - [ ] Detailed line items with images
  - [ ] Payment and billing information
  - [ ] Reorder functionality
- [ ] Add proper error handling for orders not found
- [ ] Test with various order statuses

### 2. Performance Optimizations (Phase 3)
- [ ] Add React.memo to ProductList items
- [ ] Implement useCallback in CartContext for all functions
- [ ] Implement useCallback in CustomerContext for all functions
- [ ] Add debouncing to window resize handlers in VideoCTA.tsx and OptimizedImage.tsx
- [ ] Implement product caching in Navigation.tsx using sessionStorage
- [ ] Add useMemo for expensive calculations in ProductList.tsx

### 3. TypeScript Improvements
- [ ] Replace all `any` types with proper interfaces
- [ ] Create CustomerAddressInput interface
- [ ] Create CustomerInfoInput interface
- [ ] Create proper ErrorWithMessage interface
- [ ] Add proper typing for third-party services (Klaviyo, Zendesk, etc.)
- [ ] Remove remaining @ts-expect-error comments

### 4. Error Handling & UX
- [ ] Add error boundaries around context providers
- [ ] Implement proper loading states for all async operations
- [ ] Add user-friendly error messages instead of console.error
- [ ] Implement retry mechanisms for failed API calls
- [ ] Add offline detection and handling

### 5. Security Improvements
- [ ] Move authentication tokens from localStorage to httpOnly cookies
- [ ] Implement proper token refresh mechanism
- [ ] Add rate limiting for API calls
- [ ] Remove any remaining sensitive data logging

## Medium Priority Features

### 6. Enhanced Customer Experience
- [ ] Add order search functionality
- [ ] Implement order filtering (by status, date range)
- [ ] Add customer reviews and ratings
- [ ] Implement wishlist functionality
- [ ] Add recently viewed products

### 7. Mobile Optimization
- [ ] Optimize mobile checkout flow
- [ ] Add mobile-specific video optimization
- [ ] Implement touch gestures for product galleries
- [ ] Add mobile app installation prompts

### 8. Analytics & Tracking
- [ ] Implement enhanced e-commerce tracking
- [ ] Add conversion funnel analysis
- [ ] Implement A/B testing framework
- [ ] Add performance monitoring

## Low Priority Features

### 9. Admin Features
- [ ] Add inventory management notifications
- [ ] Implement customer service chat integration
- [ ] Add product recommendation engine
- [ ] Implement automated email campaigns

### 10. Code Quality
- [ ] Add comprehensive unit tests
- [ ] Implement integration tests
- [ ] Add component documentation
- [ ] Set up automated accessibility testing

## Completed ✅
- [x] Remove all console.log statements (Phase 1)
- [x] Fix tsconfig.json includes path (Phase 1)
- [x] Add typecheck script to package.json (Phase 1)
- [x] Remove unused critters dependency (Phase 1)
- [x] Fix client component dynamic routes in reset password page (Phase 2)
- [x] Fix duplicate order page with immediate placeholder (Phase 2)

---

## Notes
- This TODO list is stored in your project and tracked in Git
- Items can be moved to GitHub Issues for better project management
- Priority levels can be adjusted based on business needs
- Consider creating epic stories for larger features like Order Details Implementation