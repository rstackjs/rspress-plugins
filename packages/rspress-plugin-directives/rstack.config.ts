import { define } from 'rstack';
import { pluginConfig } from '../../scripts/rstack/lib.ts';

define.lib(pluginConfig);
define.doc(async () => (await import('./rspress.config.ts')).default);
