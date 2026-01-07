import path from 'node:path';

import type { RspressPlugin } from '@rspress/core';
import { PresetConfigMutator } from 'rspress-plugin-devkit';

export const componentsPath = path.join(__dirname, './components');

export default function rspressPlugin_PLUGIN_NAME_(): RspressPlugin {
  return {
    name: 'rspress-plugin-_PLUGIN_NAME_',
    config(config) {
      return new PresetConfigMutator(config).toConfig();
    },
    markdown: {},
  };
}
