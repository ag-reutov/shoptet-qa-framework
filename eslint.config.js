const globals = require('globals');
const js = require('@eslint/js');
const ts = require('typescript-eslint');
const prettier = require('eslint-config-prettier');
const playwright = require('eslint-plugin-playwright');

module.exports = [
  js.configs.recommended,
  ...ts.configs.recommended,
  prettier,
  {
    files: ['test/**/*.ts', 'src/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
  },
  {
    files: ['test/**/*.ts'],
    plugins: { playwright },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-skipped-test': 'warn',
      'playwright/no-conditional-in-test': 'warn',
      'playwright/expect-expect': 'off',
      'playwright/no-wait-for-timeout': 'warn',
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**', 'test-results/**', 'playwright-report/**'],
  },
];
