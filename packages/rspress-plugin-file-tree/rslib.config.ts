import { defineConfig } from '@rslib/core';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginPublint } from 'rsbuild-plugin-publint';

export default defineConfig({
  plugins: [pluginPublint()],
  lib: [
    {
      format: 'esm',
      syntax: 'es2021',
      autoExtension: true,
      bundle: true,
      dts: {
        tsgo: true,
      },
      source: {
        entry: {
          'components/FileTree/FileTree':
            './src/components/FileTree/FileTree.tsx',
        },
      },
      tools: {
        rspack: {
          optimization: {
            runtimeChunk: false,
          },
        },
      },
      output: {
        target: 'web',
        externals: {
          react: 'module react',
          'react/jsx-runtime': 'module react/jsx-runtime',
          'react/jsx-dev-runtime': 'module react/jsx-dev-runtime',
          'react-dom': 'module react-dom',
        },
      },
      plugins: [pluginReact(), pluginLess()],
    },
    {
      format: 'esm',
      syntax: 'es2021',
      autoExtension: true,
      bundle: true,
      dts: false,
      source: {
        entry: {
          index: './src/index.ts',
        },
      },
      output: {
        target: 'node',
      },
    },
  ],
});
