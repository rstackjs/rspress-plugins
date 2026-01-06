import * as path from 'path';
import { defineConfig } from '@rspress/core';
import toc from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x Toc Example',
  plugins: [
    toc({
      useOfficialComponent: false,
    }),
  ],
});
