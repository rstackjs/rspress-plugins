import * as path from 'path';
import { defineConfig } from '@rspress/core';
import back2Top from 'rspress-plugin-back-to-top';

export default defineConfig({
  root: path.join(import.meta.dirname, 'docs'),
  title: 'Rspress x Back2Top Example',
  plugins: [back2Top({ threshold: 100 })],
});
