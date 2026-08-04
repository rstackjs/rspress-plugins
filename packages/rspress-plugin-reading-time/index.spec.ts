import { describe, expect, test } from '../../e2e/test.ts';
import { useRspressDevServer } from '../../e2e/utils.ts';

const pageUrl = useRspressDevServer(import.meta.dirname);

describe('rspress-plugin-reading-time', () => {
  // Covers locale fallback and the short-content estimate.
  test('renders a localized short reading-time estimate', async ({ page }) => {
    await page.goto(pageUrl('/short'));

    await expect(page.locator('.rp-reading-time')).toHaveText(
      '预计阅读时间: 小于 1 分钟',
    );
  });

  // Covers long-content estimation and placement after the first heading.
  test('renders a longer estimate after the heading', async ({ page }) => {
    await page.goto(pageUrl('/long'));

    const heading = page.getByRole('heading', {
      name: 'RSPress x ReadingTime LONG',
    });
    const readingTime = page.locator('.rp-reading-time');
    await expect(readingTime).toHaveText(/预计阅读时间: \d+ 分钟/);
    expect(
      await heading.evaluate(
        (element, target) =>
          Boolean(
            element.compareDocumentPosition(target as Node) &
            Node.DOCUMENT_POSITION_FOLLOWING,
          ),
        await readingTime.elementHandle(),
      ),
    ).toBe(true);
  });
});
