import { pluginLess } from '@rsbuild/plugin-less';
import { define } from 'rstack';
import { pluginPublint } from 'rsbuild-plugin-publint';

define.lib({
  plugins: [pluginPublint(), pluginLess()],
  lib: [
    {
      bundle: true,
      syntax: 'es2023',
      dts: true,
      source: {
        entry: {
          'components/Back2Top': './src/components/Back2Top.tsx',
        },
      },
      output: {
        target: 'web',
        autoExternal: true,
        externals: ['react', 'react-dom', 'react/jsx-runtime'],
      },
    },
    {
      bundle: true,
      syntax: 'es2023',
      dts: true,
      source: {
        entry: {
          index: './src/index.ts',
        },
      },
      output: {
        target: 'node',
        autoExternal: true,
      },
      shims: {
        esm: {
          __dirname: true,
        },
      },
    },
  ],
});

define.doc(async () => (await import('./rspress.config.ts')).default);
