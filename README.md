# Shoptet QA Automation Framework

A modern, Playwright-based test automation framework for E-commerce using the Page Object Model (POM) and TypeScript.

## 🚀 Features

- **POM Architecture:** Tests use Page Objects under `src/pages` and Playwright's test runner for clarity and maintainability.
- **Critical Path Testing:** End-to-End coverage of the "Guest Checkout" flow (Add to Cart → Shipping → Payment → Order).
- **Visual Regression:** Pixel-perfect snapshot testing (skipped in CI to avoid OS font mismatches).
- **API Testing:** Built-in API health checks and performance timing.
- **CI/CD:** Automated pipelines for **GitHub Actions** and **Docker** support.
- **Dynamic Data:** Uses `Faker` for unique user data generation.
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

**6. Lint & Format Code**

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
src/
  pages/           # Page Object Models
  utils/           # Utilities (factories, schemas, helpers)
test/
  specs/           # Test specifications
  snapshots/       # Visual regression snapshots
.github/
  workflows/       # GitHub Actions CI/CD
```

## 🔧 Configuration

- **`playwright.config.ts`** — Playwright test configuration with baseURL, retries, reporters, and browser projects.
- **`.env`** — Environment variables (copy from `.env.example` if available).
- **`tsconfig.json`** — TypeScript configuration with strict mode enabled.

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

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Faker.js Docs](https://fakerjs.dev)
- [Zod Documentation](https://zod.dev)

## 📄 License

ISC

---

**Target URL:** https://755742.myshoptet.com
