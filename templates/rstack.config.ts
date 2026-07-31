import { define } from 'rstack';
import { pluginPublint } from 'rsbuild-plugin-publint';

define.lib({
  plugins: [pluginPublint()],
  lib: [
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
