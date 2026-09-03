import { test as baseTest } from '@rstest/playwright';
import type { PlaywrightOptions, PlaywrightTest } from '@rstest/playwright';

export {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
} from '@rstest/playwright';
export type { PlaywrightFixture } from '@rstest/playwright';

export const test: PlaywrightTest = baseTest.extend({
  playwright: {
    contextOptions: {
      viewport: { width: 1440, height: 900 },
    },
    trace: process.env.CI ? 'retain-on-failure' : 'off',
  } satisfies PlaywrightOptions,
});
