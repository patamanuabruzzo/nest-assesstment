import { Page } from '@playwright/test';

/**
 * Redirects the page to a given url.
 *
 * @export
 * @param {Page} page
 * @param {string} url
 */
export async function navigate(page: Page, url: string) {
  await page.goto(url, { timeout: 0, waitUntil: 'load' });
}

/**
 * Creates the authorization string, encoding the CLIENT_ID and the CLIENT_SECRET on a base64 format.
 *
 * @export
 * @return {string}
 */
export async function getAuthorizationBasic() {
  if (!process.env.CLIENT_ID) throw new Error('No clientId provided for authentication');
  if (!process.env.CLIENT_SECRET) throw new Error('No clientSecret provided for authentication');

  const encodedData = Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString(
    'base64',
  );
  return 'Basic ' + encodedData;
}
