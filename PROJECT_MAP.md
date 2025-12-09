# Project Map & Status

**Last Updated:** December 9, 2025  
**Branch:** `recreate-playwright`  
**Status:** 🟢 Active Development

---

## 📊 Overview

This document provides a comprehensive map of the Shoptet QA Framework, including current implementation status, known issues, and planned improvements.

## 🗂️ Project Structure

### Source Code (`src/`)

#### Page Objects (`src/pages/`)

| File                          | Status  | Description                   | Last Updated | Notes                                     |
| ----------------------------- | ------- | ----------------------------- | ------------ | ----------------------------------------- |
| `BasePage.ts`                 | ✅ Done | Base page with common methods | Dec 2024     | Includes `open()`, `acceptCookies()`      |
| `HomePage.ts`                 | ✅ Done | Homepage interactions         | Dec 9, 2025  | Add to cart, registration entry, search   |
| `CartPage.ts`                 | ✅ Done | Shopping cart page            | Dec 2024     | Cart validation, checkout navigation      |
| `CheckoutStep1Page.ts`        | ✅ Done | Checkout delivery selection   | Dec 2024     | Supports "OSOBNÍ ODBĚR" (personal pickup) |
| `CheckoutStep2Page.ts`        | ✅ Done | Checkout contact form         | Dec 2024     | Fixed email selector (`input#email`)      |
| `OrderConfirmationPage.ts`    | ✅ Done | Order confirmation            | Dec 2024     | Basic confirmation check                  |
| `CustomerRegistrationPage.ts` | ✅ Done | New customer registration     | Dec 9, 2025  | Scoped to formRegistration                |
| `CustomerSettingsPage.ts`     | ✅ Done | Contact details form          | Dec 9, 2025  | Name, phone, address, city, zip           |
| `CustomerLoginPage.ts`        | ✅ Done | Customer login form           | Dec 9, 2025  | Scoped to formLogin                       |
| `SearchResultsPage.ts`        | ✅ Done | Search results page           | Dec 9, 2025  | Basic structure, search/filter support    |
| `AdminLoginPage.ts`           | ✅ Done | Admin authentication          | Dec 9, 2025  | Flexible selectors for login inputs       |
| `AdminProductsPage.ts`        | ✅ Done | Admin product CRUD            | Dec 9, 2025  | Add, filter, delete product operations    |

#### Utilities (`src/utils/`)

| File             | Status  | Description              | Notes                                  |
| ---------------- | ------- | ------------------------ | -------------------------------------- |
| `dataFactory.ts` | ✅ Done | Test data generators     | Czech phone format: `+420 705 XXX XXX` |
| `apiSchema.ts`   | ✅ Done | Zod API contract schemas | Echo endpoint validation               |

### Test Suites (`test/specs/`)

| File                               | Status        | Pass   | Coverage              | Last Updated | Notes                                       |
| ---------------------------------- | ------------- | ------ | --------------------- | ------------ | ------------------------------------------- |
| `smoke.spec.ts`                    | ✅ Passing    | 2      | Homepage, add to cart | Dec 2024     | Basic smoke tests                           |
| `checkout-flow.spec.ts`            | ✅ Passing    | 1      | E2E guest checkout    | Dec 2024     | Personal pickup delivery method             |
| `api-health.spec.ts`               | ✅ Passing    | 2      | API health, contracts | Dec 2024     | Uses Zod for validation                     |
| `debug-checkout.spec.ts`           | 🔧 Debug Only | -      | Checkout debugging    | Dec 2024     | Helper for troubleshooting                  |
| `customer-registration.spec.ts`    | ✅ Passing    | 1      | New user registration | Dec 9, 2025  | Registration + settings form                |
| `search-filter.spec.ts`            | ✅ Passing    | 2      | Search, sort, filter  | Dec 9, 2025  | Product search and sort by price/name       |
| `returning-customer-flow.spec.ts`  | ✅ Passing    | 1      | Login + add to cart   | Dec 9, 2025  | Existing customer checkout flow             |
| `admin-product-management.spec.ts` | ✅ Passing    | 1      | Admin CRUD            | Dec 9, 2025  | Add, verify, delete product                 |
| `visual-regression.spec.ts`        | 📸 Baselines  | 5      | Visual regression     | Dec 9, 2025  | Homepage, cart, checkout step 1 & 2         |
| **TOTAL**                          | **12 Pass**   | **12** | **-**                 | **-**        | **5 additional visual regression captures** |

---

## ✅ Recent Achievements

### December 8-9, 2025 - Priority 1 Complete ✅

- ✅ **Customer Registration Test** - New user signup with contact form
- ✅ **Customer Search & Filter Test** - Product search, sort by price/name with URL assertions
- ✅ **Returning Customer Test** - Login and cart navigation
- ✅ **Admin Product Management Test** - Add product → verify on storefront → filter → delete
- ✅ **Page Objects** - Created 6 new page objects (CustomerRegistration, CustomerSettings, CustomerLogin, AdminLogin, AdminProducts, SearchResults)
- ✅ **Test Results** - 12 tests passing in ~2 minutes, 5 visual regression baselines captured
- ✅ **Code Quality** - All tests passing ESLint, Prettier, TypeScript strict mode
- ✅ **Documentation** - Updated README.md and TEST_COVERAGE_PLAN.md with completed work
- ✅ **Czech phone validation** - Generates valid `+420 705 XXX XXX` format
- ✅ **Email selector fix** - Resolved dual email input conflict in `CheckoutStep2Page`
- ✅ **Simplified delivery selection** - Uses "OSOBNÍ ODBĚR" to avoid modal complexity
- ✅ **Committed and pushed** - Branch `recreate-playwright` pushed to GitHub

---

## 🚧 TODO List

### ✅ Priority 1 - COMPLETE

- [x] Customer registration flow test
- [x] Customer returning flow test
- [x] Product search & filter test
- [x] Admin product management test (add, verify, delete)
- [x] Page objects for all above flows
- [x] Code quality checks (ESLint, TypeScript, Prettier)
- [x] Test documentation (README, TEST_COVERAGE_PLAN)

### 📋 Priority 2 - Upcoming

#### Performance Testing

- [ ] **k6 Load Testing**
  - Setup k6 for checkout flow performance testing
  - Define response time budgets (target: <2s for checkout)
  - Test concurrent user scenarios (10, 50, 100 users)
  - Memory and CPU profiling

#### Negative Test Scenarios

- [ ] **Invalid Inputs**
  - Invalid email format in registration
  - Weak/invalid passwords
  - Empty required fields
  - SQL injection attempts in search
- [ ] **Business Logic Errors**
  - Out of stock product handling
  - Invalid price inputs (negative, non-numeric)
  - Expired product/category deletion
  - Checkout with empty cart

#### Mobile & Responsive Testing

- [ ] Mobile device viewports (iPhone, Android)
- [ ] Touch event handling
- [ ] Responsive design validation
- [ ] Mobile checkout flow

#### Accessibility (a11y) Testing

- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast validation

### 📚 Priority 3 - Nice to Have

#### Documentation

- [ ] Architecture Decision Records (ADRs)
- [ ] Troubleshooting guide
- [ ] Test pattern library
- [ ] API documentation
- [ ] Contributing guide

#### Code Quality

- [ ] Unit tests for utilities
- [ ] Custom Playwright matchers
- [ ] Enhanced error messages
- [ ] Type safety improvements

#### Developer Experience

- [ ] VS Code launch configurations
- [ ] Test templates
- [ ] Pre-push hooks
- [ ] Docker optimization

---

## 🐛 Known Issues & Workarounds

### Resolved Issues ✅

1. ✅ **Dual email inputs in checkout** - Fixed with specific input selectors
2. ✅ **Strict mode violations** - Resolved with `.first()` and form scoping
3. ✅ **Product limit (free tier)** - Workaround: tests delete created products
4. ✅ **Hide-on-mouseout elements** - Fixed with `.force: true` and scroll

### Active Issues & Workarounds

1. **Delivery point modals**
   - **Issue:** PPL/GLS delivery methods require ZIP code search in modal
   - **Workaround:** Use "OSOBNÍ ODBĚR" (personal pickup) for tests
   - **Impact:** Limited delivery method coverage
   - **Future Fix:** Implement ZIP search modal interaction

2. **Visual regression baselines**
   - **Issue:** Platform changes break visual snapshots frequently
   - **Workaround:** Store baselines, update when intentional changes occur
   - **Impact:** Need to rebuild baselines occasionally
   - **Future Fix:** Use fuzzy matching or region-based comparisons
   - **Long-term Fix:** Implement robust modal interaction with retry logic

3. **Order confirmation text varies** _(Minor)_
   - **Issue:** "Objednávka odeslána" text may not always appear
   - **Current Solution:** Basic page load check without text validation
   - **Long-term Fix:** Add multiple confirmation indicators

4. **Husky deprecation warning** _(Low priority)_
   - **Issue:** Husky pre-commit hook shows deprecation message
   - **Solution:** Update `.husky/pre-commit` to remove deprecated lines

### Resolved Issues

- ✅ Czech phone number validation (Dec 8, 2025)
- ✅ Email input selector conflict (Dec 8, 2025)
- ✅ Checkout flow test failures (Dec 8, 2025)

---

## 📈 Test Metrics

### Current Stats (December 9, 2025)

| Metric           | Value                     |
| ---------------- | ------------------------- |
| Total Test Specs | 9                         |
| Total Test Cases | 12 (passing) + 5 (visual) |
| Pass Rate        | 100% ✅                   |
| Test Duration    | ~2 minutes (full suite)   |
| Average Per Test | ~12 seconds               |
| Browsers Tested  | Chromium (primary)        |
| Page Objects     | 11                        |
| Source Files     | ~3,500 LoC                |
| Git Commits      | 2 (Priority 1 work)       |

### Coverage Summary

| Category          | Coverage | Status |
| ----------------- | -------- | ------ |
| Customer Flows    | 3/3      | ✅     |
| Admin Flows       | 1/1      | ✅     |
| Core E2E          | 1/1      | ✅     |
| API Health        | 1/1      | ✅     |
| Visual Regression | 5        | 📸     |

### Coverage Goals

- [x] 100% Priority 1 customer flows (registration, returning, search/filter)
- [x] 100% Priority 1 admin flows (product CRUD)
- [ ] 80% critical path coverage (extended scope)
- [ ] All major user flows tested (Priority 2)
- [ ] API contract tests for key endpoints (in progress)
- [ ] Cross-browser validation (Chrome, Firefox, Safari) - Priority 2

---

## 🔄 Development Workflow

### Running Tests Locally

```bash
# Run all tests
npm test

# Run specific suite
npx playwright test test/specs/checkout-flow.spec.ts

# Debug mode
npm run test:debug

# UI mode
npm run test:ui
```

### Committing Changes

```bash
# Pre-commit hooks will run automatically
git add .
git commit -m "feat: description"

# Hooks run: Prettier, ESLint
# If checks fail, commit is blocked
```

### Opening Pull Requests

1. Push branch to GitHub
2. Open PR from branch to `main`
3. CI runs tests automatically (TODO: set up workflows)
4. Request review
5. Merge after approval

---

## 🎯 Success Criteria

### ✅ Completed - Priority 1 Framework

- [x] Page Object Model implemented
- [x] E2E checkout flow passing
- [x] API tests with contract validation
- [x] Customer registration flow
- [x] Customer search & filter flow
- [x] Returning customer login flow
- [x] Admin product management flow
- [x] Page objects for all flows (11 total)
- [x] Code quality checks (ESLint, TypeScript, Prettier)
- [x] Test documentation updated

### 📋 Priority 2 Goals (Upcoming)

- [ ] CI/CD pipeline operational (GitHub Actions)
- [ ] Cross-browser testing enabled (Firefox, Safari)
- [ ] Visual regression suite with diff detection
- [ ] Performance baseline established (k6)
- [ ] 80%+ critical path coverage
- [ ] Negative test scenarios
- [ ] Mobile/responsive testing

### Definition of Done for Individual Tests

- [x] Test follows POM pattern
- [x] Uses TypeScript with proper typing
- [x] Passes linting checks (ESLint, Prettier)
- [x] Includes assertions and validations
- [x] Runs in <30s
- [ ] Has retry logic for flaky operations
- [ ] Documents edge cases
- [ ] Includes accessibility checks

---

## 📞 Contact & Support

**Repository:** https://github.com/ag-reutov/shoptet-qa-framework  
**Issues:** https://github.com/ag-reutov/shoptet-qa-framework/issues  
**Branch:** `recreate-playwright`

---

## 🏷️ Version History

| Version | Date        | Changes                                      |
| ------- | ----------- | -------------------------------------------- |
| 1.0.0   | Dec 9, 2025 | Initial framework with passing checkout flow |
| 0.9.0   | Dec 8, 2025 | Framework restructure, POM implementation    |

---

_This document is maintained as part of the project. Update it as features are added or issues are resolved._
