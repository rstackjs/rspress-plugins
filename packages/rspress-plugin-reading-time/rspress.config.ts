import * as path from 'path';
import { defineConfig } from '@rspress/core';
import readingTime from 'rspress-plugin-reading-time';

export default defineConfig({
  root: path.join(import.meta.dirname, 'docs'),
  title: 'Rspress x ReadingTime Example',
  plugins: [
    readingTime({
      defaultLocale: 'zh-CN',
    }),
  ],
});
