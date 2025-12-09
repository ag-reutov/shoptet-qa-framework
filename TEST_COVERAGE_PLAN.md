# Test Coverage Plan (Focused)

**Date:** December 9, 2025  
**Last Updated:** December 9, 2025  
**Status:** In Progress - Priority 1 Flows Complete ✅  
**Target Branch:** `recreate-playwright`

---

## Executive Summary

✅ **Completed:**

- All Priority 1 Customer Flows (3 tests covering registration, returning customer, search/filter)
- All Priority 1 Admin Flows (1 comprehensive test covering add, verify, delete product)
- Total: 12 passing tests (5 additional visual regression baselines)

🔄 **In Progress:** Visual regression baseline captures

📋 **Remaining:** Performance testing, negative scenarios, mobile testing (Priority 2)

---

## Scope (What We Will Cover)

### Customer Flows — Priority 1 ✅ COMPLETE

1. ✅ **New User Registration** - `customer-registration.spec.ts`
   - Create account via popup, fill settings form, verify successful registration
2. ✅ **Returning Customer Flow** - `returning-customer-flow.spec.ts`
   - Login with existing account, add product to cart, verify cart contents
3. ✅ **Product Search & Filter** - `search-filter.spec.ts`
   - Search product by keyword, filter by price (low→high, high→low), filter by name
   - Verify URL query parameters: `?order=price`, `?order=-price`, `?order=name`

### Admin/CMS Flows — Priority 1 ✅ COMPLETE

1. ✅ **Admin Product Management** - `admin-product-management.spec.ts`
   - Admin login
   - Add new product (name, category, price)
   - Save product customization
   - Verify product on storefront search
   - Filter products by "created today"
   - Delete product with confirmation

Everything else is out of scope for Priority 1.

---

## Coverage Status (Detailed)

| Area                        | Status | Test File                          | Details                                     |
| --------------------------- | ------ | ---------------------------------- | ------------------------------------------- |
| Guest checkout              | ✅     | `checkout-flow.spec.ts`            | End-to-end checkout, order confirmation     |
| Smoke tests                 | ✅     | `smoke.spec.ts`                    | Homepage, navigation, add to cart           |
| API health                  | ✅     | `api-health.spec.ts`               | Endpoint checks, contract validation        |
| **Customer Registration**   | ✅     | `customer-registration.spec.ts`    | New account creation, settings form         |
| **Returning Customer**      | ✅     | `returning-customer-flow.spec.ts`  | Login, add to cart                          |
| **Product Search & Filter** | ✅     | `search-filter.spec.ts`            | Search, sort by price/name, cart navigation |
| **Admin Login**             | ✅     | `admin-product-management.spec.ts` | Part of admin product flow                  |
| **Admin Add Product**       | ✅     | `admin-product-management.spec.ts` | Create product, save settings               |
| **Admin Verify Product**    | ✅     | `admin-product-management.spec.ts` | Search on storefront, assert presence       |
| **Admin Delete Product**    | ✅     | `admin-product-management.spec.ts` | Filter, delete with confirmation            |
| Visual Regression           | 📸     | `visual-regression.spec.ts`        | 5 baseline images captured                  |

---

## Page Objects Delivered

### Customer Flows

- ✅ `CustomerRegistrationPage.ts` - Registration form (scoped to formRegistration)
- ✅ `CustomerSettingsPage.ts` - Contact details form (name, phone, address, city, zip)
- ✅ `CustomerLoginPage.ts` - Login form (scoped to formLogin)
- ✅ `SearchResultsPage.ts` - Search results page (created, minimal implementation)
- ✅ `HomePage.ts` - Enhanced with goToRegistration(), signInLink, addFirstProductToCart()

### Admin Flows

- ✅ `AdminLoginPage.ts` - Admin authentication
- ✅ `AdminProductsPage.ts` - Product CRUD operations (add, filter, delete)

---

## Test Data & Accounts

### Test Accounts

- **Admin:** `ag.reutov@proton.me` / `jikig-ovub-udog`
- **Pre-registered Customer:** `test.customer@example.com` / `TestPassword123!`
- **Dynamic Customer Data:** Faker-generated unique emails, Czech phone numbers, addresses

### Shoptet Platform Limits

- Free version: 10 products maximum
- Current strategy: Test cleanup deletes created products

---

## Test Statistics

| Metric            | Value        |
| ----------------- | ------------ |
| Total Tests       | 17           |
| Passing           | 12 ✅        |
| Baselines Created | 5 📸         |
| Test Duration     | ~2.0 minutes |
| Page Objects      | 11           |
| Git Commits       | 2            |

---

## Remaining Work (Priority 2)

- [ ] **Performance Testing**
  - k6 load testing for checkout flow
  - Response time assertions
  - Concurrent user simulation

- [ ] **Negative Scenarios**
  - Invalid login credentials
  - Missing required fields in forms
  - Out-of-stock products
  - Invalid product prices

- [ ] **Mobile/Responsive Testing**
  - Mobile device viewport testing
  - Touch interactions

- [ ] **Accessibility Testing (a11y)**
  - WCAG 2.1 compliance checks
  - Screen reader compatibility

- [ ] **API Contract Expansion**
  - More comprehensive endpoint coverage
  - Additional Zod schema validations

---

## Known Constraints

1. **Shoptet Free Tier:** Limited to 10 products - tests automatically clean up
2. **Selector Stability:** Some elements use hide-on-mouseout class - required force click or scroll
3. **Dynamic Dropdowns:** Modal products require waiting for visibility after form input
4. **Strict Mode:** Multiple elements with same testid in different forms - must scope selectors

---

## Next Steps

1. ✅ Complete Priority 1 customer and admin flows
2. ⬜ Setup Priority 2 work (performance, negative scenarios)
3. ⬜ Add API contract testing for more endpoints
4. ⬜ Consider mobile testing setup

5. Wire admin credentials via env/secret for CI.
6. Run locally, then enable in CI once stable.

---

_This focused plan replaces broader scope items. Only the bullets above are in scope now._
