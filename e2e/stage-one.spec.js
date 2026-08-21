import { expect, test } from '@playwright/test';

test.describe('GWBoard stage one shell', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
  });

  test('loads from the GitHub Pages base path without browser errors', async ({ page }) => {
    const browserErrors = [];
    page.on('pageerror', (error) => browserErrors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') {
        browserErrors.push(message.text());
      }
    });

    await page.goto('./');

    await expect(page).toHaveTitle('GWBoard — 無限白板');
    await expect(page.locator('[data-testid="tool-palette"]')).toBeVisible();
    await expect(page.locator('[data-engine-status="shell"]')).toHaveAttribute('data-background', 'plain');
    await expect(page.getByRole('button', { name: '鋼筆', exact: true })).toHaveAttribute('aria-pressed', 'true');
    expect(browserErrors).toEqual([]);
  });

  test('selects the compass and exposes its planned geometry sequence', async ({ page }) => {
    await page.getByRole('button', { name: '圓規', exact: true }).click();

    await expect(page.getByRole('button', { name: '圓規', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.tool-options')).toContainText('圓心');
    await expect(page.locator('.tool-options')).toContainText('半徑');
    await expect(page.locator('.tool-options')).toContainText('預覽圓');
  });

  test('switches board backgrounds and returns to plain on a second click', async ({ page }) => {
    const board = page.locator('[data-engine-status="shell"]');
    const gridButton = page.getByRole('button', { name: '網格', exact: true });

    await gridButton.click();
    await expect(board).toHaveAttribute('data-background', 'grid');
    await expect(gridButton).toHaveAttribute('aria-pressed', 'true');

    await gridButton.click();
    await expect(board).toHaveAttribute('data-background', 'plain');
  });

  test('opens the media shell and supports focus mode', async ({ page }) => {
    await page.getByRole('button', { name: '加入', exact: true }).click();
    await expect(page.getByRole('complementary', { name: '加入內容' })).toBeVisible();
    await page.getByRole('button', { name: '關閉加入內容面板' }).click();

    await page.getByRole('button', { name: '專注模式' }).click();
    await expect(page.locator('.gwboard-shell')).toHaveClass(/is-focus-mode/);
    await expect(page.getByRole('button', { name: '離開專注模式' })).toBeVisible();
    await page.getByRole('button', { name: '離開專注模式' }).click();
    await expect(page.locator('.gwboard-shell')).not.toHaveClass(/is-focus-mode/);
  });

  test('fits an iPad landscape viewport without document overflow', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 1024 });
    await page.reload();

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      clientHeight: document.documentElement.clientHeight,
      scrollHeight: document.documentElement.scrollHeight,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    expect(dimensions.scrollHeight).toBeLessThanOrEqual(dimensions.clientHeight);
    await expect(page.locator('[data-testid="tool-palette"]')).toBeVisible();
    await expect(page.getByRole('navigation', { name: '空白畫布快捷功能' })).toBeVisible();
  });
});
