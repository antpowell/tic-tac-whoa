import { test, expect } from '@playwright/test';

// test('Page loads correctly', async ({ page }) => {
//   await page.goto('http://localhost:3000/');

//   // Expect a title "to contain" a substring.
//   await expect(page.getByRole('heading', { name: 'Find an opponent' })).toBeVisible();
// });

// test('User can join waiting room', async ({ page }) => {
//   await page.goto('http://localhost:3000/');

//   const displayName = 'John Doe';

//   await page.getByPlaceholder('Display Name').click();
//   await page.getByPlaceholder('Display Name').fill(displayName);
//   await page.getByRole('button', { name: 'Search' }).click();

//   await expect(page.getByText('Waiting...')).toBeVisible();
//   await expect(page.getByText(displayName)).toBeVisible();
// });

// test('Leader board is displayed', async ({ page }) => {
//   await page.goto('http://localhost:3000/');

//   await expect(page.getByRole('heading', { name: 'Leader Board' })).toBeVisible();
// });

test('player1 and player2 can connect to game instance', async ({ browser }) => {
  // Create two isolated browser contexts
  const p1Context = await browser.newContext();
  const p2Context = await browser.newContext();

  const p1Page = await p1Context.newPage();
  const p2Page = await p2Context.newPage();

  await p1Page.goto('http://localhost:3000/');
  await p2Page.goto('http://localhost:3000/');

  await expect(p1Page.getByRole('heading', { name: 'Find an opponent' })).toBeVisible();
  await expect(p2Page.getByRole('heading', { name: 'Find an opponent' })).toBeVisible();

  const p1DisplayName = 'Player 1';
  const p2DisplayName = 'Player 2';

  await p1Page.getByPlaceholder('Display Name').click();
  await p1Page.getByPlaceholder('Display Name').fill(p1DisplayName);
  await p1Page.getByRole('button', { name: 'Search' }).click();

  await p2Page.getByPlaceholder('Display Name').click();
  await p2Page.getByPlaceholder('Display Name').fill(p2DisplayName);
  await p2Page.getByRole('button', { name: 'Search' }).click();

  await expect(p1Page.locator('div').filter({ hasText: p1DisplayName }).nth(3)).toBeVisible();
  await expect(p1Page.locator('div').filter({ hasText: p2DisplayName }).nth(3)).toBeVisible();

  await expect(p2Page.locator('div').filter({ hasText: p1DisplayName }).nth(3)).toBeVisible();
  await expect(p2Page.locator('div').filter({ hasText: p2DisplayName }).nth(3)).toBeVisible();
});

/* 
await page.locator('div:nth-child(5)').click();
  await page.locator('div:nth-child(4)').click();
  await page.locator('div:nth-child(8)').click();
  await page.locator('div:nth-child(7)').click();
  await page.locator('div:nth-child(4)').click();
*/
