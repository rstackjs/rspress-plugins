import * as path from 'path';
import { defineConfig } from '@rspress/core';
import mermaid from 'rspress-plugin-mermaid';

export default defineConfig({
  root: path.join(import.meta.dirname, 'docs'),
  title: 'Rspress x Mermaid Example',
  plugins: [mermaid()],
});
