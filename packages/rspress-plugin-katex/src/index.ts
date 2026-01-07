import { PresetConfigMutator } from 'rspress-plugin-devkit';

import remarkMath, { Options as RemarkMathOptions } from 'remark-math';
import rehypeKatex, { Options as RehypeKatexOptions } from 'rehype-katex';

import type { RspressPlugin } from '@rspress/core';

export interface RspressPluginKatexOptions
  extends RemarkMathOptions,
    RehypeKatexOptions {}

import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';

const remarkCodeBlockToMath: Plugin = () => {
  return (tree) => {
    visit(tree, 'code', (node: any) => {
      if (node.lang === 'math') {
        node.data = {
          hName: 'div',
          hProperties: { className: ['math', 'math-display'] },
        };
        delete node.lang;
        delete node.meta;
      }
    });
  };
};

export default function rspressPluginKatex(
  options: RspressPluginKatexOptions = {},
): RspressPlugin {
  const katexCss = require.resolve('katex/dist/katex.min.css');

  return {
    name: 'rspress-plugin-katex',
    // config not needed for Rspress V2
    globalStyles: katexCss,
    markdown: {
      remarkPlugins: [[remarkMath, options], remarkCodeBlockToMath],
      rehypePlugins: [[rehypeKatex, options]],
    },
  };
}
