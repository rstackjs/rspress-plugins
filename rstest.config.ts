import { defineConfig } from '@rstest/core';

export default defineConfig({
  include: ['packages/**/*.test.ts'],
  exclude: ['packages/**/*.spec.ts', 'node_modules/**/*'],
  coverage: {
    provider: 'v8',
  },
});
