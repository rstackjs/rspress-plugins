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
          index: './src/index.ts',
        },
      },
      output: {
        target: 'node',
      },
    },
  ],
});
