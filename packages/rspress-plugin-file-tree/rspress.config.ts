import * as path from 'path';
import { defineConfig } from '@rspress/core';
import fileTree from 'rspress-plugin-file-tree';

export default defineConfig({
  root: path.join(import.meta.dirname, 'docs'),
  title: 'Rspress x FileTree Example',
  markdown: {
    shiki: {
      langAlias: {
        tree: 'text',
      },
    },
  },
  plugins: [
    fileTree({
      initialExpandDepth: 1,
    }),
  ],
});
