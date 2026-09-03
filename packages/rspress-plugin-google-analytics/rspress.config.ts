import * as path from 'path';
import { defineConfig } from '@rspress/core';
import ga from 'rspress-plugin-google-analytics';

export default defineConfig({
  root: path.join(import.meta.dirname, 'docs'),
  title: 'Rspress x GA Example',
  plugins: [
    ga({
      id: ['G-E2EPRIMARY', 'G-E2ESECONDARY'],
      anonymizeIP: true,
    }),
  ],
});
