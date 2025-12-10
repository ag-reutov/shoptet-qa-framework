# Test Coverage Plan (Focused)

**Date:** December 9, 2025  
**Last Updated:** December 9, 2025  
**Status:** Complete (Priority 1 + Performance) ✅  
**Target Branch:** `recreate-playwright`

---

## Executive Summary

✅ **Completed:**

- All Priority 1 Customer Flows (registration, returning customer, search/filter)
- All Priority 1 Admin Flows (add, verify, delete product)
- Performance Testing (k6) for homepage, checkout, API endpoints
- Total: 12 functional tests passing + 5 visual regression baselines + 3 k6 perf tests

📋 **Backlog (Optional):** Negative scenarios, mobile testing, accessibility, contract expansion

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
| Performance (k6)            | ✅     | `performance-*.js`                 | Homepage, checkout flow, API endpoints      |

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

## Backlog (Optional Enhancements)

- Negative scenarios (invalid credentials, required fields, out-of-stock)
- Mobile/responsive testing (device viewports)
- Accessibility testing (WCAG 2.1 checks)
- API contract expansion (more endpoints, schemas)

---

## Known Constraints

1. **Shoptet Free Tier:** Limited to 10 products - tests automatically clean up
2. **Selector Stability:** Some elements use hide-on-mouseout class - required force click or scroll
3. **Dynamic Dropdowns:** Modal products require waiting for visibility after form input
4. **Strict Mode:** Multiple elements with same testid in different forms - must scope selectors

---

## Test Statistics

| Metric            | Value        |
| ----------------- | ------------ |
| Total Tests       | 20           |
| Passing           | 20 ✅ (12 functional + 5 visual baselines + 3 k6) |
| Test Duration     | ~2.0 minutes (functional) + perf runs as configured |
| Page Objects      | 11           |
| Git Commits       | 2 (perf & docs) |

---

## Next Steps (if continued)

- Keep perf baselines as reference; rerun k6 before releases.
- Add any backlog items based on product needs.
