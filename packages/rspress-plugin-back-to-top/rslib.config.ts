import { pluginLess } from '@rsbuild/plugin-less';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: 'es2021',
      autoExtension: true,
      bundle: true,
      dts: {
        bundle: true,
      },
      source: {
        entry: {
          'components/Back2Top': './src/components/Back2Top.tsx',
        },
      },
      output: {
        target: 'web',
        externals: {
          react: 'module react',
          'react/jsx-runtime': 'module react/jsx-runtime',
          'react-dom': 'module react-dom',
        },
      },
      plugins: [pluginLess()],
    },
    {
      format: 'esm',
      syntax: 'es2021',
      autoExtension: true,
      bundle: true,
      dts: {
        bundle: true,
      },
      source: {
        entry: {
          index: './src/index.ts',
        },
      },
      output: {
        target: 'node',
      },
      shims: {
        esm: {
          __dirname: true,
        },
      },
    },
  ],
});
