import * as path from 'path';
import { defineConfig } from '@rspress/core';
import back2Top from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x Back2Top Example',
  themeConfig: {
    enableScrollToTop: true,
  },
});
