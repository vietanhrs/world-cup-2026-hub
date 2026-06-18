import { expect, test } from '@playwright/test';

const scoreboardFixture = {
  events: [
    {
      id: '760415',
      date: '2026-06-11T19:00Z',
      competitions: [
        {
          status: { type: { completed: true, name: 'STATUS_FULL_TIME', shortDetail: 'FT' } },
          competitors: [
            { homeAway: 'home', score: '2', team: { displayName: 'Mexico' } },
            { homeAway: 'away', score: '0', team: { displayName: 'South Africa' } },
          ],
        },
      ],
    },
  ],
};

const summaryFixture = {
  rosters: [
    {
      homeAway: 'home',
      team: { displayName: 'Mexico' },
      roster: [
        { starter: true, jersey: '1', athlete: { displayName: 'Raúl Rangel' }, position: { abbreviation: 'G' } },
        { starter: true, jersey: '16', athlete: { displayName: 'Julián Quiñones' }, position: { abbreviation: 'LM' } },
      ],
    },
    {
      homeAway: 'away',
      team: { displayName: 'South Africa' },
      roster: [{ starter: true, jersey: '1', athlete: { displayName: 'Ronwen Williams' }, position: { abbreviation: 'G' } }],
    },
  ],
  keyEvents: [
    {
      id: 'goal-1',
      type: { text: 'Goal', type: 'goal' },
      shortText: 'Julián Quiñones Goal',
      clock: { value: 513, displayValue: "9'" },
      scoringPlay: true,
      team: { displayName: 'Mexico' },
      participants: [{ athlete: { displayName: 'Julián Quiñones' } }],
    },
    {
      id: 'sub-1',
      type: { text: 'Substitution', type: 'substitution' },
      text: 'Substitution, South Africa. Thalente Mbatha replaces Lyle Foster.',
      clock: { value: 3356, displayValue: "56'" },
      team: { displayName: 'South Africa' },
    },
  ],
  boxscore: {
    teams: [
      {
        homeAway: 'home',
        statistics: [
          { name: 'possessionPct', displayValue: '60.5' },
          { name: 'totalShots', displayValue: '16' },
          { name: 'shotsOnTarget', displayValue: '4' },
        ],
      },
      {
        homeAway: 'away',
        statistics: [
          { name: 'possessionPct', displayValue: '39.5' },
          { name: 'totalShots', displayValue: '3' },
          { name: 'shotsOnTarget', displayValue: '2' },
        ],
      },
    ],
  },
};

test.beforeEach(async ({ page }) => {
  await page.route('https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard**', async (route) => {
    await route.fulfill({ json: scoreboardFixture });
  });
  await page.route('https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary**', async (route) => {
    await route.fulfill({ json: summaryFixture });
  });
  await page.goto('/');
});

test('locks completed matches and keeps future predictions editable', async ({ page }) => {
  const completedCard = page.locator('.match-card').filter({ hasText: 'MEX' }).filter({ hasText: 'RSA' });
  await expect(completedCard).toContainText('FT');
  await expect(completedCard.getByRole('button', { name: /open match details/i })).toHaveText(/2-0 FT/);
  await expect(completedCard.locator('input')).toHaveCount(0);

  const futureCard = page.locator('.match-card').filter({ hasText: 'CZE' }).filter({ hasText: 'RSA' });
  await expect(futureCard.locator('input').first()).toBeEnabled();
  await futureCard.locator('input').first().fill('3');
  await expect(futureCard.locator('input').first()).toHaveValue('3');
});

test('opens completed match details from a score click', async ({ page }) => {
  const completedCard = page.locator('.match-card').filter({ hasText: 'MEX' }).filter({ hasText: 'RSA' });
  await completedCard.getByRole('button', { name: /open match details/i }).click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('Match 1 details');
  await expect(dialog).toContainText('Starting lineups');
  await expect(dialog).toContainText('Raúl Rangel');
  await expect(dialog).toContainText('Julián Quiñones Goal');
  await expect(dialog).toContainText('Substitution, South Africa');
  await expect(dialog).toContainText('Possession');
  await expect(dialog).toContainText('60.5%');
  await expect(dialog.getByRole('link', { name: /source: espn/i })).toHaveAttribute('href', /gameId\/760415/);
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
