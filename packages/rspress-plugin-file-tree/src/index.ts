import path from 'node:path';

import { RemarkCodeBlockToGlobalComponentPluginFactory } from 'rspress-plugin-devkit';

import { parseTreeContent } from './components/tree-parser/tree-parser';

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
          'dist/components/FileTree/FileTree',
        ),
        propsProvider(code) {
          return {
            nodes: parseTreeContent(code).nodes,
            initialExpandDepth,
          };
        },
      },
    ],
  });

  return {
    name: 'rspress-plugin-file-tree',
    markdown: {
      remarkPlugins: [remarkFileTree.remarkPlugin],
      globalComponents: remarkFileTree.mdxComponents,
    },
    builderConfig: remarkFileTree.builderConfig,
  };
}
