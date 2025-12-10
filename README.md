# Shoptet QA Automation Framework

A modern, Playwright-based test automation framework for Shoptet E-commerce platform using the Page Object Model (POM) and TypeScript.

## 🚀 Features

- **POM Architecture:** Tests use Page Objects under `src/pages` and Playwright's test runner for clarity and maintainability.
- **Critical Path Testing:** End-to-End coverage for Guest and Returning Customer Checkout flow (Add to Cart → Checkout → Order Confirmation).
- **API Testing:** Built-in API health checks with contract validation and performance timing.
- **CI/CD:** Automated pipelines for **GitHub Actions** and **Docker** support.
- **Dynamic Data:** Uses `Faker` for realistic test data (Czech phone numbers, addresses, emails).
- **Reporting:** Playwright HTML + Allure reporters with traces and screenshots on failures.
- **Quality Gates:** ESLint + Prettier + Husky + lint-staged for clean commits.
- **Data Factories:** Typed Faker-backed builders for customers/credentials.
- **API Contracts:** Zod schemas validate JSON responses.

## 🛠️ Tech Stack

- **Framework:** Playwright
- **Language:** TypeScript
- **CI/CD:** GitHub Actions / Docker
- **Assertions:** Playwright Expect
- **Linting:** ESLint + Prettier
- **Reporting:** Allure + HTML Reporter
- **Data Generation:** Faker.js
- **Schema Validation:** Zod

## 🏃‍♂️ Quick Start

**1. Install Dependencies**

```bash
npm install
```

**2. Run Tests**

```bash
npm test
```

**3. Run with UI (Playwright Inspector)**

```bash
npm run test:ui
```

**4. Debug Tests**

```bash
npm run test:debug
```

**5. Run API Tests Only**

```bash
npm run test:api
```

**6. Run Performance Tests (k6)**

```bash
# Run individual performance tests
npm run perf:homepage
npm run perf:checkout
npm run perf:api

# Run all performance tests
npm run perf:all
```

**7. Lint & Format Code**

```bash
npm run lint
npm run format
```

## 📊 Reporting

### Playwright HTML Report

After test runs, open the HTML report:

```bash
npx playwright show-report
```

### Allure Report

Generate and view Allure results:

```bash
npx allure generate --clean allure-results
npx allure open
```

## ⚡ Performance Testing with k6

k6 load testing provides insight into how the application performs under concurrent user load.

### Running Performance Tests

```bash
# Homepage load test
npm run perf:homepage

# Checkout flow simulation
npm run perf:checkout

# API endpoint testing
npm run perf:api

# All performance tests
npm run perf:all
```

### Performance Test Scenarios

| Test                      | VUs | Duration | Purpose                                   |
| ------------------------- | --- | -------- | ----------------------------------------- |
| `performance-homepage.js` | 10  | 50s      | Measure homepage response time under load |
| `performance-checkout.js` | 5   | 20s      | Simulate multi-step checkout flow         |
| `performance-api.js`      | 10  | 30s      | Validate API endpoint performance         |

### Sample Results

```
✓ THRESHOLDS PASSED
  • p(95) response time < 500ms
  • p(99) response time < 1000ms
  • failure rate < 10%
  • custom success_rate > 90%

METRICS
  • homepage load time: avg=138.7ms p(95)=323.3ms
  • requests: 140 successful
  • data received: 7.4 MB
```

See [k6/README.md](./k6/README.md) for detailed performance testing documentation.

## 🐳 Docker

Build and run tests in Docker:

```bash
docker-compose up
```

Or build the image manually:

```bash
docker build -t shoptet-qa .
docker run shoptet-qa
```

## 📁 Project Structure

```
shoptet-qa-framework/
├── src/
│   ├── pages/                         # Page Object Models
│   │   ├── BasePage.ts                # Base page with common methods (open, acceptCookies)
│   │   ├── HomePage.ts                # Homepage actions (search, add to cart, registration)
│   │   ├── CartPage.ts                # Cart page interactions
│   │   ├── CheckoutStep1Page.ts       # Checkout step 1 (delivery method selection)
│   │   ├── CheckoutStep2Page.ts       # Checkout step 2 (contact form)
│   │   ├── OrderConfirmationPage.ts   # Order confirmation page
│   │   ├── CustomerRegistrationPage.ts # New user registration form
│   │   ├── CustomerSettingsPage.ts    # Contact details form
│   │   ├── CustomerLoginPage.ts       # Customer login form
│   │   ├── SearchResultsPage.ts       # Search results and filters
│   │   ├── AdminLoginPage.ts          # Admin authentication
│   │   └── AdminProductsPage.ts       # Admin product CRUD operations
│   └── utils/                         # Utilities (factories, schemas, helpers)
│       ├── dataFactory.ts             # Faker-based test data generators (Customer, Credentials)
│       └── apiSchema.ts               # Zod schemas for API contract validation
├── test/
│   └── specs/                         # Test specifications
│       ├── smoke.spec.ts              # Basic smoke tests (homepage, add to cart)
│       ├── checkout-flow.spec.ts      # E2E guest checkout flow (PASSING ✅)
│       ├── api-health.spec.ts         # API health checks and contract tests
│       ├── debug-checkout.spec.ts     # Debug helpers for checkout troubleshooting
│       ├── customer-registration.spec.ts     # New user registration (PASSING ✅)
│       ├── search-filter.spec.ts              # Product search & filter (PASSING ✅)
│       ├── returning-customer-flow.spec.ts    # Login & add to cart (PASSING ✅)
│       ├── admin-product-management.spec.ts   # Admin add/verify/delete product (PASSING ✅)
│       └── visual-regression.spec.ts  # Visual regression baseline snapshots
├── k6/                                # Performance testing scripts
│   ├── README.md                      # k6 performance testing guide
│   ├── performance-homepage.js        # Load test for homepage
│   ├── performance-checkout.js        # Checkout flow simulation
│   └── performance-api.js             # API endpoint performance testing
├── .github/
│   └── workflows/
│       ├── lint.yml                   # ESLint + Prettier checks
│       ├── playwright-tests.yml       # Cross-browser test execution
│       └── allure-report.yml          # Allure report generation
├── allure-results/                    # Allure report data
├── test-results/                      # Playwright test artifacts (screenshots, videos, traces)
├── test/snapshots/                    # Visual regression baseline images
├── playwright-report/                 # Playwright HTML report output
├── playwright.config.ts               # Playwright configuration
├── tsconfig.json                      # TypeScript configuration
├── eslint.config.js                   # ESLint configuration
├── package.json                       # Dependencies and scripts
├── Dockerfile                         # Docker container for CI/CD
├── docker-compose.yml                 # Docker compose setup
├── TEST_COVERAGE_PLAN.md              # Test coverage strategy and scope
└── README.md                          # This file
```

## 🔧 Configuration

- **`playwright.config.ts`** — Playwright test configuration with baseURL, retries, reporters, and browser projects.
- **`.env`** — Environment variables (currently using default Shoptet demo shop URL).
- **`tsconfig.json`** — TypeScript configuration with strict mode enabled.

## 🧪 Test Coverage

### Current Tests (12 Passing ✅) + Performance Tests

| Test Suite                         | Count | Status | Description                                                |
| ---------------------------------- | ----- | ------ | ---------------------------------------------------------- |
| `smoke.spec.ts`                    | 2     | ✅     | Homepage load, navigation, add to cart                     |
| `checkout-flow.spec.ts`            | 1     | ✅     | Complete guest checkout (cart → personal pickup → order)   |
| `api-health.spec.ts`               | 2     | ✅     | API health checks, contract validation with Zod            |
| `customer-registration.spec.ts`    | 1     | ✅     | New user registration + settings form                      |
| `search-filter.spec.ts`            | 2     | ✅     | Product search + sort/filter by price and name             |
| `returning-customer-flow.spec.ts`  | 1     | ✅     | Login existing customer + add to cart                      |
| `admin-product-management.spec.ts` | 1     | ✅     | Admin: add product → verify on storefront → delete product |
| `visual-regression.spec.ts`        | 5     | 📸     | Visual regression baselines (homepage, cart, checkout)     |
| **k6 Performance Tests**           | **3** | **✅** | **Load testing, checkout flow, API endpoints**             |

### Test Data

- **Czech Phone Numbers:** Generated as `+420 705 XXX XXX` (valid Shoptet format)
- **Addresses:** Faker generates realistic street, city, ZIP data
- **Emails:** Unique emails per test run via Faker
- **Admin Credentials:** `ag.reutov@proton.me` / `jikig-ovub-udog`
- **Test Accounts:** Pre-registered customer: `test.customer@example.com` / `TestPassword123!`

## 📝 Writing Tests

### Example Smoke Test

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test('home loads', async ({ page }) => {
  const home = new HomePage(page);
  await home.open('/');
  await home.acceptCookies();
  await expect(page).toHaveTitle(/Vítejte/i);
});
```

### Using Data Factory

```typescript
import { buildCustomer } from '../../src/utils/dataFactory';

test('customer flow', async ({ page }) => {
  const customer = buildCustomer();
  // Use customer.email, customer.password, etc.
});
```

### API Contract Testing

```typescript
import { validateJson, echoSchema } from '../../src/utils/apiSchema';

test('API response matches schema', async ({ request }) => {
  const response = await request.get('/api/endpoint');
  const data = await validateJson(response, echoSchema);
  expect(data.url).toBeDefined();
});
```

## 🚀 CI/CD Pipeline

GitHub Actions workflows:

- **Lint:** Runs ESLint + Prettier checks on every push/PR.
- **Test:** Runs cross-browser tests (chromium, firefox, webkit) and uploads reports.
- **Artifacts:** Playwright reports and Allure results are retained for 30 days.

Workflows already configured and executing in this repository.

## 🐛 Backlog (Optional Future Work)

- [ ] Negative test scenarios (invalid credentials, edge cases)
- [ ] Mobile/responsive testing
- [ ] Accessibility testing (a11y)
- [ ] API contract testing expansion

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Faker.js Docs](https://fakerjs.dev)
- [Zod Documentation](https://zod.dev)
- [Shoptet Developer Docs](https://developers.shoptet.cz/)

## 📄 License

ISC

---

**Target URL:** https://755742.myshoptet.com  
**Branch:** `recreate-playwright` (to be set as default/main; original project deprecated)
