import { PresetConfigMutator } from 'rspress-plugin-devkit';
import {
  remarkParseSuperSubScript,
  type RemarkParseSuperSubScriptOptions,
} from './remark-plugins/parse-super-sub-script';

import type { RspressPlugin } from '@rspress/core';

export interface RspressPluginSupersubOptions
  extends RemarkParseSuperSubScriptOptions {}

export default function rspressPluginSupersub(
  options: RemarkParseSuperSubScriptOptions = {},
): RspressPlugin {
  return {
    name: 'rspress-plugin-supersub',
    // config not needed for Rspress V2
    markdown: {
      remarkPlugins: [
        [remarkParseSuperSubScript, <RemarkParseSuperSubScriptOptions>options],
      ],
    },
  };
}
