import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { RspressPlugin } from '@rspress/core';
import type { Live2DWidgetProps } from './typings';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface RspressPluginLive2dOptions extends Live2DWidgetProps {}

export default function rspressPluginLive2d(
  props: RspressPluginLive2dOptions = {},
): RspressPlugin {
  return {
    name: 'rspress-plugin-live2d',
    globalUIComponents: [
      [
        path.join(__dirname, '../components/Live2DWidget.tsx'),
        props satisfies Live2DWidgetProps,
      ],
    ],
  };
}
