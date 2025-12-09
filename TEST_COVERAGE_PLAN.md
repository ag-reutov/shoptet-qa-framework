# Test Coverage Plan (Focused)

**Date:** December 9, 2025  
**Status:** Planning Phase  
**Target Branch:** `recreate-playwright`

---

## Scope (What We Will Cover)

### Customer Flows — Priority 1 Only

1. **New User Registration**
2. **Returning Customer Flow** (login + checkout)
3. **Product Search & Filter**

### Admin/CMS Flows — Priority 1 Only

1. **Admin Login** (`https://755742.myshoptet.com/admin/login/` — login: `ag.reutov@proton.me`, pass: `jikig-ovub-udog`)
2. **Add Product**
3. **Edit Product**
4. **Delete Product**

Everything else is out of scope for now.

---

## Current Coverage (Baseline)

| Area           | Status | Notes                             |
| -------------- | ------ | --------------------------------- |
| Guest checkout | ✅     | End-to-end guest checkout passing |
| Smoke tests    | ✅     | Homepage + add to cart            |
| API health     | ✅     | Basic endpoint checks             |

---

## New Coverage Plan (Actionable)

### Customer Flows

- [ ] New User Registration
  - Create account, validate success message, verify login works.
- [ ] Returning Customer Flow
  - Login existing user, add product, checkout.
- [ ] Product Search & Filter
  - Search keyword, apply category filter, apply sort, verify results.

### Admin/CMS Flows

- [ ] Admin Login
  - Page Object: `AdminLoginPage` (URL above).
- [ ] Add Product
  - Page Object: `AdminProductPage` (create flow).
- [ ] Edit Product
  - Reuse product page to modify name/price/visibility and save.
- [ ] Delete Product
  - Remove the created product and verify it disappears from catalog.

---

## Page Objects to Add

```
src/pages/
├── CustomerRegistrationPage.ts   # Registration form
├── CustomerLoginPage.ts          # Login for returning users
├── SearchResultsPage.ts          # Search, filters, sort

src/pages/admin/
├── AdminLoginPage.ts             # Admin login
├── AdminProductPage.ts           # Add/Edit/Delete product
```

---

## Test Data & Accounts

- Use Faker for unique emails; store created user in test context for reuse in returning flow.
- Use stable product data for search/filter assertions (or tagged test products).
- Admin credentials: `ag.reutov@proton.me` / `jikig-ovub-udog`.
- Prefer cleanup: delete test products created in admin flows.

---

## Execution Notes

- Keep customer tests parallelizable; admin tests sequential to avoid data collisions.
- Visual tests already skip in CI; keep them separate from these flows.
- Tagging suggestion:
  - `@customer-reg`, `@customer-returning`, `@search-filter`
  - `@admin-login`, `@admin-product-add`, `@admin-product-edit`, `@admin-product-delete`

---

## Next Steps (Short List)

1. Implement page objects listed above.
2. Add three customer tests (registration, returning checkout, search/filter).
3. Add four admin CMS tests (login, add, edit, delete product) and ensure cleanup.
4. Wire admin credentials via env/secret for CI.
5. Run locally, then enable in CI once stable.

---

_This focused plan replaces broader scope items. Only the bullets above are in scope now._
