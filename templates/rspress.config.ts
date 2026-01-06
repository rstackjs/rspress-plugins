import * as path from 'path';
import { defineConfig } from '@rspress/core';
import _PLUGIN_NAME_ from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x _PLUGIN_NAME_ Example',
  plugins: [_PLUGIN_NAME_()],
});
