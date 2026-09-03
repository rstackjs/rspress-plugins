import type { RslibConfig } from 'rstack/lib';
import { pluginPublint } from 'rsbuild-plugin-publint';

export const pluginConfig: RslibConfig = {
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
};
