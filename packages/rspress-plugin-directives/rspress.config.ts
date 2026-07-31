import * as path from 'path';
import { defineConfig } from '@rspress/core';
import directives from 'rspress-plugin-directives';

export default defineConfig({
  root: path.join(import.meta.dirname, 'docs'),
  title: 'Rspress x Directives Example',
  plugins: [
    directives({
      directive: 'oops',
      transformer: {
        type: 'globalComponent',
        getComponentName: (meta) => 'Oops',
        componentPath: path.join(import.meta.dirname, './components/Oops.tsx'),
      },
    }),
  ],
});
