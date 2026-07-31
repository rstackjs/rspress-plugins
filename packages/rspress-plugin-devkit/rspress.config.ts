import * as path from 'node:path';
import { defineConfig } from '@rspress/core';
import { RemarkCodeBlockToGlobalComponentPluginFactory } from './src';

const codeBlock = new RemarkCodeBlockToGlobalComponentPluginFactory({
  components: [
    {
      lang: 'devkit',
      componentPath: path.join(__dirname, 'components/DevkitCode.tsx'),
      propsProvider: (code) => ({ code }),
    },
  ],
});

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress Plugin Devkit Example',
  markdown: {
    remarkPlugins: [codeBlock.remarkPlugin],
    globalComponents: codeBlock.mdxComponents,
  },
  builderConfig: codeBlock.builderConfig,
});
