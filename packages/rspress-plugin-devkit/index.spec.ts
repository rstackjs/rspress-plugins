import { describe, expect, test } from '../../e2e/test.ts';
import { useRspressDevServer } from '../../e2e/utils.ts';

const pageUrl = useRspressDevServer(import.meta.dirname);

describe('rspress-plugin-devkit', () => {
  // Covers the code-block factory's component replacement.
  test('replaces a matching code block with a global component', async ({
    page,
  }) => {
    await page.goto(pageUrl());

    await expect(page.getByTestId('devkit-code')).toHaveText(
      'transformed by devkit',
    );
    await expect(page.locator('code.language-devkit')).toHaveCount(0);
  });

  // Covers forwarding source code through the factory's props provider.
  test('forwards code content to the generated component props', async ({
    page,
  }) => {
    await page.goto(pageUrl());

    const output = page.getByTestId('devkit-code');
    await expect(output).toHaveJSProperty('tagName', 'OUTPUT');
    await expect(output).toHaveText(/^transformed by devkit$/);
  });
});
