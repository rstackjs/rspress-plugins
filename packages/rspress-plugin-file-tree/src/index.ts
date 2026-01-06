import path from 'node:path';

import {
  PresetConfigMutator,
  RemarkCodeBlockToGlobalComponentPluginFactory,
} from 'rspress-plugin-devkit';

import { parseInput } from './parser';

import type { RspressPlugin } from '@rspress/core';

interface RspressPluginFileTreeOptions {
  initialExpandDepth?: number;
}

const PACKAGE_ROOT = path.resolve(__dirname, '../');

export default function rspressPluginFileTree(
  options: RspressPluginFileTreeOptions = {},
): RspressPlugin {
  const { initialExpandDepth = 0 } = options;

  const remarkFileTree = new RemarkCodeBlockToGlobalComponentPluginFactory({
    components: [
      {
        lang: 'tree',
        componentPath: path.join(
          PACKAGE_ROOT,
          'dist/components/Tree/FileTreeRender',
        ),
        propsProvider(code) {
          return {
            tree: parseInput(code),
            initialExpandDepth,
          };
        },
      },
    ],
  });

  return {
    name: 'rspress-plugin-file-tree',
    // config not needed for Rspress V2
    globalStyles: path.join(PACKAGE_ROOT, 'dist/components/Tree/index.css'),
    markdown: {
      remarkPlugins: [remarkFileTree.remarkPlugin],
      globalComponents: remarkFileTree.mdxComponents,
    },
    builderConfig: remarkFileTree.builderConfig,
  };
}
