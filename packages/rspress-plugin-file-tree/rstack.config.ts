import { pluginLess } from '@rsbuild/plugin-less';
import { pluginReact } from '@rsbuild/plugin-react';
import { define } from 'rstack';
import { pluginPublint } from 'rsbuild-plugin-publint';

define.lib({
  plugins: [pluginPublint()],
  lib: [
    {
      id: 'components',
      bundle: true,
      syntax: 'es2023',
      dts: {
        bundle: true,
      },
      source: {
        entry: {
          'components/FileTree/FileTree':
            './src/components/FileTree/FileTree.tsx',
        },
      },
      output: {
        target: 'web',
        externals: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          'react/jsx-dev-runtime',
        ],
      },
      plugins: [pluginReact(), pluginLess()],
    },
    {
      id: 'plugin',
      bundle: true,
      syntax: 'es2023',
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
        autoExternal: true,
      },
    },
  ],
});

define.doc(async () => (await import('./rspress.config.ts')).default);
