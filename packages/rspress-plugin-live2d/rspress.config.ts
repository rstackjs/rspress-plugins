import * as path from 'path';
import { defineConfig } from '@rspress/core';
import live2d from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x Live2d Example',
  plugins: [
    live2d({
      libraryUrls: {
        complete: 'https://e2e.local/complete.js',
      },
      sayHello: false,
      transitionTime: 0,
      models: [
        {
          path: 'https://model.oml2d.com/HK416-1-normal/model.json',
          position: [0, 60],
          scale: 0.08,
          stageStyle: {
            height: 450,
          },
        },
      ],
    }),
  ],
});
