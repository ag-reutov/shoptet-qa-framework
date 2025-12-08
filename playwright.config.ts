import { defineConfig, devices, PlaywrightTestConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig<any>({
  testDir: './test/specs',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['line'],
    ['html', { open: 'never' }]
  ],

  use: {
    actionTimeout: 0,
    baseURL: 'https://755742.myshoptet.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: true,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    launchOptions: {
        args: ['--disable-http2']
    },

    
    // standard Playwright fixtures used by POM-based tests
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});