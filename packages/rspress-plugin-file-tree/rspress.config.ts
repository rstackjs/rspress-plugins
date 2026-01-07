import * as path from 'path';
import { defineConfig } from '@rspress/core';
import fileTree from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x FileTree Example',
  plugins: [
    fileTree({
      initialExpandDepth: 1,
    }),
  ],
});
