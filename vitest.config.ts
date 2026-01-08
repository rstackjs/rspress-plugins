import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['packages/**/*.test.ts'],
    exclude: ['packages/**/*.spec.ts', 'node_modules/**/*'],
  },
});
