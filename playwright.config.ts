import { defineConfig } from '@playwright/test';

export default defineConfig({
  testMatch: 'packages/**/*.spec.ts',
  timeout: 60000,
  use: {
    trace: 'on-first-retry',
  },
  reporter: 'html',
});
