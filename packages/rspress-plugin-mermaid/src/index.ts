import path from 'node:path';

import {
  PresetConfigMutator,
  RemarkCodeBlockToGlobalComponentPluginFactory,
} from 'rspress-plugin-devkit';

import type { RspressPlugin } from '@rspress/core';
import type { MermaidConfig } from 'mermaid';
import type { MermaidRendererProps } from './typings';

interface RspressPluginMermaidOptions {
  mermaidConfig?: MermaidConfig;
}

export default function rspressPluginMermaid(
  options: RspressPluginMermaidOptions = {},
): RspressPlugin {
  const { mermaidConfig = {} } = options;

  const remarkMermaid = new RemarkCodeBlockToGlobalComponentPluginFactory({
    components: [
      {
        lang: 'mermaid',
        componentPath: path.join(
          __dirname,
          '../components',
          'MermaidRender.tsx',
        ),
        childrenProvider() {
          return [];
        },
        propsProvider(code) {
          return {
            code,
            config: mermaidConfig,
          } satisfies MermaidRendererProps;
        },
      },
    ],
  });

  return {
    name: 'rspress-plugin-mermaid',
    // config not needed for Rspress V2
    markdown: {
      remarkPlugins: [remarkMermaid.remarkPlugin],
      globalComponents: remarkMermaid.mdxComponents,
    },
    builderConfig: remarkMermaid.builderConfig,
  };
}
