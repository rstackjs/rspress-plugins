import * as path from 'path';
import { defineConfig } from '@rspress/core';
import supersub from 'rspress-plugin-supersub';

export default defineConfig({
  root: path.join(import.meta.dirname, 'docs'),
  title: 'Rspress x SuperSub Example',
  plugins: [supersub()],
});
