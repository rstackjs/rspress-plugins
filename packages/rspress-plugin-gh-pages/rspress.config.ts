import * as path from 'path';
import { defineConfig } from '@rspress/core';
import ghpages from 'rspress-plugin-gh-pages';

export default defineConfig({
  root: path.join(import.meta.dirname, 'docs'),
  title: 'Rspress x GHPages Example',
  plugins: [
    ghpages({
      repo: 'https://github.com/linbudu599/rspress-plugins.git',
      branch: 'website',
    }),
  ],
});
