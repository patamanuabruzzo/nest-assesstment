import { ICustomWorld } from '../support/custom-world';
import { navigate } from '../utils/elements';
import { Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

Given('I log in the website', async function (this: ICustomWorld) {
  const { page } = this;
  if (!page) throw new Error('No page awailable');

  //TODO: validate defined BASE_URL
  navigate(page, process.env.BASE_URL || '');

  await Promise.all([
    await page.waitForNavigation(),
    await page.locator('a:has-text("Log in")').click(),
  ]);

  const email = page.locator(`[name = 'email']`);
  const password = page.locator(`[name = 'password']`);

  //TODO: validate defined EMAIL
  await email.fill(process.env.EMAIL || '');
  //TODO: validate defined PASSWORD
  await password.fill(process.env.PASSWORD || '');

  await page.locator(`[name="submit"]`).click();
  expect(await page.title()).toContain('Online Courses');
});
