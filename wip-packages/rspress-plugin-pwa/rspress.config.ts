import * as path from 'path';
import { defineConfig } from '@rspress/core';
import mermaid from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x Mermaid Example',
  plugins: [mermaid()],
});
