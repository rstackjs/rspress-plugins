import * as path from 'path';
import { defineConfig } from '@rspress/core';
import alignImage from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x Align Image Example',
  plugins: [
    alignImage({
      justify: 'right',
      containerClassNames: ['e2e-align-image'],
    }),
  ],
});
