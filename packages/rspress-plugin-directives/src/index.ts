import {
  ensureArray,
  remarkParseDirective,
  remarkTransformDirective,
  PresetConfigMutator,
  type MaybeArray,
  type RemarkDirectiveTransformer,
} from 'rspress-plugin-devkit';

import type { RspressPlugin } from '@rspress/core';

type RspressPluginDirectivesOptions = MaybeArray<
  RemarkDirectiveTransformer<
    {},
    {
      componentPath: string;
    }
  >
>;

export default function rspressPluginDirectives(
  options: RspressPluginDirectivesOptions = [],
): RspressPlugin {
  const transformers = ensureArray(options);

  const mdGlobalComponents = <string[]>transformers
    .map((t) => t.transformer)
    .flat()
    .map((transformer) =>
      transformer.type === 'globalComponent' ? transformer.componentPath : null,
    )
    .filter(Boolean);

  return {
    name: 'rspress-plugin-directives',
    // config not needed for Rspress V2
    markdown: {
      remarkPlugins: [
        remarkParseDirective,
        [remarkTransformDirective, options],
      ],
      globalComponents: mdGlobalComponents,
    },
  };
}
