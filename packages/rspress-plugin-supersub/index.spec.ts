import { describe, expect, test } from '../../e2e/test.ts';
import { useRspressDevServer } from '../../e2e/utils.ts';

const pageUrl = useRspressDevServer(import.meta.dirname);

describe('rspress-plugin-supersub', () => {
  // Covers superscript conversion for simple and equation content.
  test('renders superscript content', async ({ page }) => {
    await page.goto(pageUrl());

    await expect(page.locator('sup')).toHaveText(['10', '2', '2', '2']);
  });

  // Covers subscript conversion in simple and delimiter-rich content.
  test('renders subscript content across the example syntaxes', async ({
    page,
  }) => {
    await page.goto(pageUrl());

    await expect(page.locator('sub')).toHaveText(['2', 'H', 'N', 'O']);
    await expect(page.locator('em')).toHaveText('8H10N4O2');
  });
});
