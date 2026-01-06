import * as path from 'path';
import { defineConfig } from '@rspress/core';
import katex from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x KateX Example',
  plugins: [
    katex({
      macros: {
        '\\f': '#1f(#2)',
      },
    }),
  ],
});
