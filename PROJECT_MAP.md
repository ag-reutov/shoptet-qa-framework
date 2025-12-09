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

| File                       | Status  | Description                   | Notes                                     |
| -------------------------- | ------- | ----------------------------- | ----------------------------------------- |
| `BasePage.ts`              | ✅ Done | Base page with common methods | Includes `open()`, `acceptCookies()`      |
| `HomePage.ts`              | ✅ Done | Homepage interactions         | Add to cart, cookie acceptance            |
| `CartPage.ts`              | ✅ Done | Shopping cart page            | Cart validation, checkout navigation      |
| `CheckoutStep1Page.ts`     | ✅ Done | Checkout delivery selection   | Supports "OSOBNÍ ODBĚR" (personal pickup) |
| `CheckoutStep2Page.ts`     | ✅ Done | Checkout contact form         | Fixed email selector (`input#email`)      |
| `OrderConfirmationPage.ts` | ✅ Done | Order confirmation            | Basic confirmation check                  |

#### Utilities (`src/utils/`)

| File             | Status  | Description              | Notes                                  |
| ---------------- | ------- | ------------------------ | -------------------------------------- |
| `dataFactory.ts` | ✅ Done | Test data generators     | Czech phone format: `+420 705 XXX XXX` |
| `apiSchema.ts`   | ✅ Done | Zod API contract schemas | Echo endpoint validation               |

### Test Suites (`test/specs/`)

| File                     | Status        | Coverage              | Notes                           |
| ------------------------ | ------------- | --------------------- | ------------------------------- |
| `smoke.spec.ts`          | ✅ Passing    | Homepage, add to cart | Basic smoke tests               |
| `checkout-flow.spec.ts`  | ✅ Passing    | E2E guest checkout    | Personal pickup delivery method |
| `api-health.spec.ts`     | ✅ Passing    | API health, contracts | Uses Zod for validation         |
| `debug-checkout.spec.ts` | 🔧 Debug Only | Checkout debugging    | Helper for troubleshooting      |

---

## ✅ Recent Achievements

### December 8-9, 2025

- ✅ **Fixed checkout flow test** - Complete E2E guest checkout now passing
- ✅ **Czech phone validation** - Generates valid `+420 705 XXX XXX` format
- ✅ **Email selector fix** - Resolved dual email input conflict in `CheckoutStep2Page`
- ✅ **Simplified delivery selection** - Uses "OSOBNÍ ODBĚR" to avoid modal complexity
- ✅ **Committed and pushed** - Branch `recreate-playwright` pushed to GitHub

---

## 🚧 TODO List

### High Priority

- [ ] **Add GitHub Actions CI/CD workflows**
  - Create `.github/workflows/test.yml` for automated test runs
  - Add lint workflow for PR checks
  - Configure artifact uploads for test reports
  - Set up parallel browser testing

- [ ] **Expand test coverage**
  - [ ] Add logged-in user checkout flow
  - [ ] Test multiple delivery methods (PPL, GLS, DPD, etc.)
  - [ ] Test payment method selection
  - [ ] Add product search tests
  - [ ] Test product filtering and sorting

- [ ] **Enhance order confirmation validation**
  - [ ] Check for order number display
  - [ ] Validate order summary details
  - [ ] Verify email confirmation sent message

### Medium Priority

- [ ] **Improve page objects**
  - [ ] Add explicit waits and better error messages
  - [ ] Add retry logic for flaky selectors
  - [ ] Extract common form-filling patterns
  - [ ] Add validation methods to each page

- [ ] **Add visual regression testing**
  - [ ] Set up Playwright visual comparison
  - [ ] Create baseline screenshots
  - [ ] Configure CI to handle screenshot diffs

- [ ] **Performance testing**
  - [ ] Add k6 performance test scripts
  - [ ] Measure checkout flow performance
  - [ ] Set performance budgets

- [ ] **Test data management**
  - [ ] Add more realistic Czech addresses
  - [ ] Support multiple phone prefixes (703, 604, 721, etc.)
  - [ ] Add company data generator for B2B flows

### Low Priority

- [ ] **Documentation improvements**
  - [ ] Add architecture decision records (ADRs)
  - [ ] Create troubleshooting guide
  - [ ] Document common test patterns
  - [ ] Add API documentation

- [ ] **Code quality**
  - [ ] Increase TypeScript strictness
  - [ ] Add unit tests for utilities
  - [ ] Improve error handling
  - [ ] Add custom Playwright matchers

- [ ] **Developer experience**
  - [ ] Add VS Code launch configurations
  - [ ] Create test templates/snippets
  - [ ] Add pre-push hooks for test validation
  - [ ] Docker optimization for faster builds

---

## 🐛 Known Issues

### Active Issues

1. **Delivery point modal complexity** _(Workaround implemented)_
   - **Issue:** Selecting delivery points with modals (PPL, GLS) requires ZIP search
   - **Current Solution:** Use "OSOBNÍ ODBĚR" (personal pickup) to avoid modals
   - **Long-term Fix:** Implement robust modal interaction with retry logic

2. **Order confirmation text varies** _(Minor)_
   - **Issue:** "Objednávka odeslána" text may not always appear
   - **Current Solution:** Basic page load check without text validation
   - **Long-term Fix:** Add multiple confirmation indicators

3. **Husky deprecation warning** _(Low priority)_
   - **Issue:** Husky pre-commit hook shows deprecation message
   - **Solution:** Update `.husky/pre-commit` to remove deprecated lines

### Resolved Issues

- ✅ Czech phone number validation (Dec 8, 2025)
- ✅ Email input selector conflict (Dec 8, 2025)
- ✅ Checkout flow test failures (Dec 8, 2025)

---

## 📈 Test Metrics

### Current Stats

- **Total Test Specs:** 4
- **Total Test Cases:** ~10
- **Pass Rate:** 100% (excluding debug tests)
- **Average Runtime:** ~12s per test
- **Browsers Tested:** Chromium (primary)

### Coverage Goals

- [ ] 80% critical path coverage
- [ ] All major user flows tested
- [ ] API contract tests for key endpoints
- [ ] Cross-browser validation (Chrome, Firefox, Safari)

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

### Definition of Done for Framework

- [x] Page Object Model implemented
- [x] E2E checkout flow passing
- [x] API tests with contract validation
- [ ] CI/CD pipeline operational
- [ ] Cross-browser testing enabled
- [ ] Visual regression suite
- [ ] Performance baseline established
- [ ] 80%+ critical path coverage

### Definition of Done for Individual Tests

- [x] Test follows POM pattern
- [x] Uses TypeScript with proper typing
- [x] Passes linting checks
- [x] Includes assertions and validations
- [ ] Has retry logic for flaky operations
- [ ] Documents edge cases
- [ ] Runs in <30s

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
