import { fileURLToPath } from 'node:url';
import { pluginReact } from '@rsbuild/plugin-react';
import { define } from 'rstack';
import { pluginConfig } from '../../scripts/rstack/lib.ts';

define.lib({
  ...pluginConfig,
  lib: [
    {
      ...pluginConfig.lib![0],
      id: 'plugin',
      source: {
        entry: { plugin: './src/plugin.ts' },
      },
    },
    {
      id: 'components',
      bundle: true,
      syntax: 'es2023',
      dts: true,
      source: {
        entry: {
          index: './src/index.ts',
          GlobalGoogleAnalytics:
            './src/components/GoogleAnalytics/GlobalGoogleAnalytics.tsx',
        },
      },
      output: {
        target: 'web',
        autoExternal: true,
      },
      plugins: [pluginReact({ reactCompiler: { target: '18' } })],
    },
  ],
});

define.doc(async () => (await import('./rspress.config.ts')).default);

define.test({
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
