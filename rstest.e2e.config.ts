import { defineConfig } from '@rstest/core';

export default defineConfig({
  include: ['packages/**/*.spec.ts'],
  testEnvironment: 'node',
  isolate: false,
  testTimeout: 60_000,
  hookTimeout: 60_000,
  retry: process.env.CI ? 3 : 0,
  pool: {
    maxWorkers: process.platform === 'win32' ? 2 : 3,
  },
});
