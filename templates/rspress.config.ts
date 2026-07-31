import * as path from 'path';
import { defineConfig } from '@rspress/core';
import _PLUGIN_NAME_ from 'rspress-plugin-_PLUGIN_NAME_';

export default defineConfig({
  root: path.join(import.meta.dirname, 'docs'),
  title: 'Rspress x _PLUGIN_NAME_ Example',
  plugins: [_PLUGIN_NAME_()],
});
