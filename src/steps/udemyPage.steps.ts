import { ICustomWorld } from '../support/custom-world';
import { navigate } from '../utils/utils';
import { getCoursesList } from '../endpoints/api';
import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

let course: string;

/**
 * Navigates to the homepage and redirects to the login page.
 * Uses the email and password to login.
 */
Given('I log in the website', async function (this: ICustomWorld) {
  const { page } = this;
  if (!page) throw new Error('No page available');
  if (!process.env.BASE_URL) throw new Error('No web page url provided');
  if (!process.env.EMAIL) throw new Error('No login email provided');
  if (!process.env.PASSWORD) throw new Error('No password provided');

  navigate(page, process.env.BASE_URL);

  await Promise.all([
    await page.waitForSelector('a:has-text("Log in")'),
    await page.locator('a:has-text("Log in")').click(),
  ]);

  await page.waitForSelector('.social-btns--container');
  const email = page.locator(`[name = 'email']`);
  const password = page.locator(`[name = 'password']`);

  await email.fill(process.env.EMAIL);
  await password.fill(process.env.PASSWORD);

  await page.locator(`[name="submit"]`).click();
  await page.waitForURL(process.env.BASE_URL || '');
});

/**
 * Selects the "Development" option from the categories menu, on the homescreen.
 */
Given('I select a category on the homescreen', async function (this: ICustomWorld) {
  const { page } = this;
  if (!page) throw new Error('No page available');

  await page.locator(`button:has-text('Categories')`).hover();
  const dropmenu = page.locator('.js-browse-nav-level-one');
  await dropmenu.locator(`div:has-text('Development')`).first().click();

  await page.waitForURL(new RegExp('.*courses/development/'));
  expect(page.url()).toContain('courses/development');
});

/**
 * Configure filters to "english" and "free" for the list of courses available.
 */
Given('I apply the filters for free and english courses', async function (this: ICustomWorld) {
  const { page } = this;
  if (!page) throw new Error('No page available');

  const filters = page.locator('#filter-form');
  await filters.locator(`button:has-text('Language')`).click();
  await filters.locator(`label:has-text('English')`).first().click();
  await filters.locator(`button:has-text('Price')`).click();
  await filters.locator(`label:has-text('Free')`).click();
});

/**
 * Selects the second option on the list of filtered courses.
 * If the option to enroll in the course isn't available, the step fails.
 * Else, it enrolls in the course and saves the title of the course
 */
When('I select the second result and enroll in the course', async function (this: ICustomWorld) {
  const { page } = this;
  if (!page) throw new Error('No page available');

  const courses = page.locator('.course-list--container--3zXPS');
  await courses.locator('.popper--popper--2r2To >> nth=1').click();

  await page.waitForSelector('.heading');

  try {
    await page.waitForSelector(`.heading button:has-text("Enroll now")`, { timeout: 10000 });
    await page.locator('.heading').locator(`button:has-text("Enroll now")`).click();
    course = await page.locator('.heading h1').innerText();
  } catch (error) {
    throw new Error('Unable to enroll on this course');
  }
});

/**
 * Retrive a list of courses.
 */
When('I request a list of courses from the API', async function (this: ICustomWorld) {
  const { api } = this;
  if (!api?.context) throw new Error('No api context available');

  const response = await getCoursesList(api);
  expect(response.ok()).toBeTruthy();
  api.response = response;
});

/**
 * Checks if the previusly saved course title appears in the response list.
 */
Then('the enrolled course should be in the list', async function (this: ICustomWorld) {
  const { api } = this;
  if (!api?.response) throw new Error('No api response found');

  const courses = (await api.response.json()).results;
  const enrolled = courses.find((entry: { title: string }) => entry.title === course);

  expect(enrolled).toBeTruthy();
});
