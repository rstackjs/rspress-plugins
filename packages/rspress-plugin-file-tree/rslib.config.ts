import { defineConfig } from '@rslib/core';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: 'es2021',
      autoExtension: true,
      bundle: false,
      dts: true,
      source: {
        entry: {
          index: ['./src/**/*.{tsx,ts,less}', '!./src/**/*.test.{ts,tsx}'],
        },
      },
    },
  ],
  output: {
    target: 'web',
    distPath: {
      root: './dist',
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
      '@rspress/core/runtime': '@rspress/core/runtime',
    },
    filename: {
      js: '[name].js',
    },
  },
  plugins: [pluginReact(), pluginLess()],
});
