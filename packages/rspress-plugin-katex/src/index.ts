import { PresetConfigMutator } from 'rspress-plugin-devkit';

import remarkMath, { Options as RemarkMathOptions } from 'remark-math';
import rehypeKatex, { Options as RehypeKatexOptions } from 'rehype-katex';

import type { RspressPlugin } from '@rspress/core';

export interface RspressPluginKatexOptions
  extends RemarkMathOptions,
    RehypeKatexOptions {}

export default function rspressPluginKatex(
  options: RspressPluginKatexOptions = {},
): RspressPlugin {
  const katexCss = require.resolve('katex/dist/katex.min.css');

  return {
    name: 'rspress-plugin-katex',
    // config not needed for Rspress V2
    globalStyles: katexCss,
    markdown: {
      remarkPlugins: [[remarkMath, options]],
      // @ts-expect-error
      rehypePlugins: [[rehypeKatex, options]],
    },
  };
}
