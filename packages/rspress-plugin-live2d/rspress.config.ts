import * as path from 'path';
import { defineConfig } from '@rspress/core';
import live2d from 'rspress-plugin-live2d';

export default defineConfig({
  root: path.join(import.meta.dirname, 'docs'),
  title: 'Rspress x Live2d Example',
  plugins: [
    live2d({
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
