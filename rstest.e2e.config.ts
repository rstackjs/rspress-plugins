import { defineConfig } from '@rstest/core';

export default defineConfig({
  projects: [
    {
      name: 'e2e',
      include: ['packages/**/*.spec.ts'],
      testEnvironment: 'node',
      testTimeout: 60_000,
      hookTimeout: 60_000,
      retry: process.env.CI ? 3 : 0,
    },
    './packages/*/rstest.browser.config.ts',
  ],
  isolate: false,
  pool: {
    maxWorkers: process.platform === 'win32' ? 2 : 3,
  },
});
