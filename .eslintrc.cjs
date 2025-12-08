module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: ['@typescript-eslint', 'playwright'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:playwright/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'playwright/no-skipped-test': 'warn',
    'playwright/no-conditional-in-test': 'warn',
  },
};
