import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rstest/core';
import { resolve } from 'node:path';

export default defineConfig({
  browser: {
    enabled: true,
    provider: 'playwright',
  },
  plugins: [pluginReact({})],
  resolve: {
    alias: {
      '@rspress/core/runtime': resolve(__dirname, './tests/rspress-core.ts'),
      '@rspress/core': resolve(__dirname, './tests/rspress-core.ts'),
    },
  },
});
