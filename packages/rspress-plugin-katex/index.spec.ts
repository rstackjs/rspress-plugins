import { describe, expect, test } from '../../e2e/test.ts';
import { useRspressDevServer } from '../../e2e/utils.ts';

const pageUrl = useRspressDevServer(import.meta.dirname);

describe('rspress-plugin-katex', () => {
  // Covers conversion of a math code block to display-mode KaTeX.
  test('renders a display math block', async ({ page }) => {
    await page.goto(pageUrl());

    await expect(page.locator('.katex-display .katex-html')).toBeVisible();
    await expect(page.locator('code.language-math')).toHaveCount(0);
  });

  // Covers forwarding configured macros and loading KaTeX styles.
  test('applies the configured macro and KaTeX stylesheet', async ({
    page,
  }) => {
    await page.goto(pageUrl());

    const katex = page.locator('.katex').first();
    await expect(katex).toContainText('f');
    await expect(katex).toContainText('x');
    await expect(katex).toHaveCSS('font-family', /KaTeX/);
  });
});
