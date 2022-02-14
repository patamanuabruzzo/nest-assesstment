import { ICustomWorld } from '../support/custom-world';
import { navigate } from '../utils/elements';
import { Given } from '@cucumber/cucumber';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

Given('I log in the website', async function (this: ICustomWorld) {
  const { page } = this;
  if (!page) throw new Error('No page awailable');

  // eslint-disable-next-line no-console
  console.log(process.env.BASE_URL);

  navigate(page, process.env.BASE_URL || '', 'Login');

  await page.locator('a:has-text("Log in")').click();
  await page.waitForNavigation({ waitUntil: 'load' });

  const email = page.locator(`[name = 'email']`);
  const password = page.locator(`[name = 'password']`);

  await email.fill(process.env.EMAIL || '');
  await password.fill(process.env.PASSWORD || '');

  await page.locator(`[name="submit"]`).click();
});
