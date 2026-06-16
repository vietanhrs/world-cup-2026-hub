import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('locks completed matches and keeps future predictions editable', async ({ page }) => {
  const completedCard = page.locator('.match-card').filter({ hasText: 'MEX' }).filter({ hasText: 'RSA' });
  await expect(completedCard).toContainText('FT');
  await expect(completedCard.locator('input').first()).toBeDisabled();
  await expect(completedCard.locator('input').first()).toHaveValue('2');
  await expect(completedCard.locator('input').nth(1)).toHaveValue('0');

  const futureCard = page.locator('.match-card').filter({ hasText: 'CZE' }).filter({ hasText: 'RSA' });
  await expect(futureCard.locator('input').first()).toBeEnabled();
  await futureCard.locator('input').first().fill('3');
  await expect(futureCard.locator('input').first()).toHaveValue('3');
});

test('shares a prediction URL after editing an upcoming match', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);

  const futureCard = page.locator('.match-card').filter({ hasText: 'CZE' }).filter({ hasText: 'RSA' });
  await futureCard.locator('input').first().fill('3');
  await futureCard.locator('input').nth(1).fill('1');

  await page.getByRole('button', { name: /share prediction/i }).click();

  const shareUrl = await page.evaluate(() => navigator.clipboard.readText());
  expect(shareUrl).toContain('#p=');
});
