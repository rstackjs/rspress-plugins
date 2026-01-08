import { defineConfig } from '@playwright/test';

export default defineConfig({
  testMatch: 'packages/rspress-plugin-*/index.spec.ts',
  timeout: 60000,
  use: {
    trace: 'on-first-retry',
  },
  reporter: 'html',
});
