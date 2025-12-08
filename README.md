# Shoptet QA Automation Framework

A modern, hybrid test automation framework for E-commerce, built with **Playwright**, **Serenity/JS**, and **TypeScript**.

## 🚀 Features

* **Hybrid Architecture:** Combines the **Screenplay Pattern** (Serenity/JS) for complex UI tasks with raw **Playwright** for speed.
* **Critical Path Testing:** End-to-End coverage of the "Guest Checkout" flow (Add to Cart -> Shipping -> Payment -> Order).
* **Visual Regression:** Pixel-perfect snapshot testing (skipped in CI to avoid OS font mismatches).
* **API Testing:** Built-in API health checks and performance timing.
* **CI/CD:** Automated pipelines for **GitHub Actions** and **Docker** support.
* **Dynamic Data:** Uses `Faker` for unique user data generation.

## 🛠️ Tech Stack

* **Framework:** Playwright + Serenity/JS
* **Language:** TypeScript
* **CI/CD:** GitHub Actions / Docker
* **Assertions:** Jest / Playwright Expect

## 🏃‍♂️ How to Run

**1. Install Dependencies**
```bash
npm install