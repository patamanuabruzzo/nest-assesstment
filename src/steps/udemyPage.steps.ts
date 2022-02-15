import { ICustomWorld } from '../support/custom-world';
import { navigate } from '../utils/elements';
import { Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

Given('I log in the website', async function (this: ICustomWorld) {
  const { page } = this;
  if (!page) throw new Error('No page available');

  //TODO: validate defined BASE_URL
  navigate(page, process.env.BASE_URL || '');

  await Promise.all([
    await page.waitForNavigation({ waitUntil: 'load' }),
    await page.locator('a:has-text("Log in")').click(),
  ]);

  await page.waitForSelector('.social-btns--container');
  const email = page.locator(`[name = 'email']`);
  const password = page.locator(`[name = 'password']`);

  //TODO: validate defined EMAIL
  await email.fill(process.env.EMAIL || '');
  //TODO: validate defined PASSWORD
  await password.fill(process.env.PASSWORD || '');

  await page.locator(`[name="submit"]`).click();
  await page.waitForNavigation({ waitUntil: 'load' });
});

Given('I select a category on the homescreen', async function (this: ICustomWorld) {
  const { page } = this;
  if (!page) throw new Error('No page available');

  await page.locator(`button:has-text('Categories')`).hover();
  const dropmenu = page.locator('.js-browse-nav-level-one');
  await dropmenu.locator(`div:has-text('Development')`).first().click();

  await page.waitForNavigation({ waitUntil: 'load' });
  expect(page.url()).toContain('courses/development');
});

Given('I apply the filters for free and english courses', async function (this: ICustomWorld) {
  const { page } = this;
  if (!page) throw new Error('No page available');

  const filters = page.locator('#filter-form');
  await filters.locator(`button:has-text('Language')`).click();
  await filters.locator(`label:has-text('English')`).click();
  await filters.locator(`button:has-text('Price')`).click();
  await filters.locator(`label:has-text('Free')`).click();
  await page.waitForNavigation({ waitUntil: 'networkidle' });
});
