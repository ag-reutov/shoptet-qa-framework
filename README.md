# Shoptet QA Automation Framework

A modern, Playwright-based test automation framework for E-commerce using the Page Object Model (POM) and TypeScript.

## 🚀 Features

- **POM Architecture:** Tests use Page Objects under `src/pages` and Playwright's test runner for clarity and maintainability.
- **Critical Path Testing:** End-to-End coverage of the "Guest Checkout" flow (Add to Cart -> Shipping -> Payment -> Order).
- **Visual Regression:** Pixel-perfect snapshot testing (skipped in CI to avoid OS font mismatches).
- **API Testing:** Built-in API health checks and performance timing.
- **CI/CD:** Automated pipelines for **GitHub Actions** and **Docker** support.
- **Dynamic Data:** Uses `Faker` for unique user data generation.

## 🛠️ Tech Stack

* **Framework:** Playwright
* **Language:** TypeScript
* **CI/CD:** GitHub Actions / Docker
* **Assertions:** Jest / Playwright Expect

## 🏃‍♂️ How to Run

**1. Install Dependencies**
```bash
npm install