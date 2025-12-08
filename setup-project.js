/**
 * setup-project.js
 * Run this script with: node setup-project.js
 * * Scaffolds: shoptet-qa-framework
 * Stack: Playwright + TypeScript + K6
 * Environment: Optimized for WSL/Linux & CI
 */

const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

// --- 1. Define the Directory Structure ---
// Using Screenplay Pattern structure suitable for Hybrid Testing
const directories = [
    '.github/workflows',         // CI/CD pipelines
    'src',                       // Source code root
    'src/actors',                // The "Actors" (Users)
    'src/tasks/ui',              // High-level UI Tasks
    'src/tasks/api',             // High-level API Tasks
    'src/questions/ui',          // UI Assertions (Questions)
    'src/questions/api',         // API Assertions (Questions)
    'src/ui/targets',            // UI Locators (Selectors only, no logic)
    'src/utils',                 // Helpers (Faker, generic utils)
    'test/specs',                // The Test files (Specs)
    'performance',               // K6 Performance Scripts
];

// --- 2. Define File Contents ---

const packageJson = {
  "name": "shoptet-qa-framework",
  "version": "1.0.0",
  "description": "Comprehensive QA Framework for Shoptet (UI, API, Performance) using Playwright",
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "test:api": "playwright test --grep @api",
    "clean": "rimraf target",
    "perf": "k6 run performance/load-test.js",
    "lint": "eslint src test"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@types/node": "^20.0.0",
    "@faker-js/faker": "^8.0.0",
    "typescript": "^5.0.0",
    "rimraf": "^5.0.0"
  }
};

const tsConfig = {
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "lib": ["DOM", "ESNext"],
    "strict": true,
    "noUnusedLocals": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*.ts", "test/**/*.ts", "playwright.config.ts"],
  "exclude": ["node_modules"]
};

// Playwright Config
const playwrightConfig = `
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test/specs',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['line'],
    ['html', { open: 'never' }], // Native Playwright report
    // Add custom reporters here if needed
  ],
  use: {
    actionTimeout: 0,
    baseURL: 'https://the-internet.herokuapp.com', // Update this to your Shoptet URL later
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
`;

const gitIgnore = `
node_modules/
test-results/
playwright-report/
target/
.env
.DS_Store
`;

const githubWorkflow = `
name: QA Framework Pipeline

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    name: E2E & Functional Tests
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 18
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Tests
      run: npx playwright test
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report
        retention-days: 30
`;

const basicK6Script = `
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '10s',
};

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}
`;

// --- 3. Execution Logic ---

function createDirectory(dirPath) {
    const fullPath = path.join(rootDir, dirPath);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`✅ Created directory: ${dirPath}`);
    }
}

function createFile(filePath, content) {
    const fullPath = path.join(rootDir, filePath);
    fs.writeFileSync(fullPath, content.trim());
    console.log(`📄 Created file: ${filePath}`);
}

console.log("🚀 Initializing Shoptet QA Framework (WSL Edition)...");

// 1. Create Directories
directories.forEach(createDirectory);

// 2. Create Config Files
createFile('package.json', JSON.stringify(packageJson, null, 2));
createFile('tsconfig.json', JSON.stringify(tsConfig, null, 2));
createFile('playwright.config.ts', playwrightConfig);
createFile('.gitignore', gitIgnore);

// 3. Create Placeholder Files (DevOps & Perf)
createFile('.github/workflows/main.yml', githubWorkflow);
createFile('performance/load-test.js', basicK6Script);

console.log("\n🎉 Framework Structure Ready!");
console.log("------------------------------------------------");
console.log("👉 NEXT STEPS (WSL/Ubuntu):");
console.log("1. Run: npm install");
console.log("2. Run: npx playwright install --with-deps");
console.log("   (The --with-deps flag is CRITICAL on WSL to install Linux libraries)");
console.log("------------------------------------------------");