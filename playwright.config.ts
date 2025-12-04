import { defineConfig, devices, PlaywrightTestConfig } from '@playwright/test';
import { Actors } from './src/actors/Actors'; 

export default defineConfig<PlaywrightTestConfig>({
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
    
    // 🥳 FINAL CORRECTED ACTORS FIXTURE 🥳
    actors: async ({ browser, contextOptions }, use) => {
        const actorsInstance = new Actors(browser, contextOptions);
        await use(actorsInstance);
    },
    
    defaultActorName: 'Alice',
    crew: [],
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});