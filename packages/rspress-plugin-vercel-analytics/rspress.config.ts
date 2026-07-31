import * as path from 'path';
import { defineConfig } from '@rspress/core';
import vercelAnalytics from 'rspress-plugin-vercel-analytics';

export default defineConfig({
  root: path.join(import.meta.dirname, 'docs'),
  title: 'Rspress x Vercel Analytics Example',
  plugins: [
    vercelAnalytics({
      endpoint: '/e2e-insights',
      disableAutoTrack: true,
    }),
  ],
});
