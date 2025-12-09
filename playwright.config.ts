import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const baseURL = process.env.BASE_URL || 'https://755742.myshoptet.com';

export default defineConfig({
  testDir: './test/specs',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['line'], ['html', { open: 'never' }], ['allure-playwright']],
  use: {
    baseURL,
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 0,
    navigationTimeout: 20000,
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'visual-regression',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/visual-regression.spec.ts',
    },
  ],
  snapshotDir: './test/snapshots',
});
