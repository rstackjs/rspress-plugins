import * as path from 'path';
import { defineConfig } from '@rspress/core';
import alignImage from 'rspress-plugin-align-image';

export default defineConfig({
  root: path.join(import.meta.dirname, 'docs'),
  title: 'Rspress x Align Image Example',
  plugins: [
    alignImage({
      justify: 'right',
      containerClassNames: ['e2e-align-image'],
    }),
  ],
});
