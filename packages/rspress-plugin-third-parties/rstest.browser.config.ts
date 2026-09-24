import { fileURLToPath } from 'node:url';
import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rstest/core';

export default defineConfig({
  name: 'third-parties',
  root: import.meta.dirname,
  include: ['tests/**/*.test.tsx'],
  browser: {
    enabled: true,
    provider: 'playwright',
    headless: true,
  },
  plugins: [pluginReact()],
  resolve: {
    alias: {
      '@rspress/core/runtime': fileURLToPath(
        new URL('./tests/rspress-core.ts', import.meta.url),
      ),
    },
  },
});
