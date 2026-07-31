import * as path from 'path';
import { defineConfig } from '@rspress/core';
import back2Top from './dist/index.js';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x Back2Top Example',
  plugins: [back2Top({ threshold: 100 })],
});
