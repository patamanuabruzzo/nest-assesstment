# NEST Assessment - QA Automation Developer

This project was created for the Patagonian NEST Assessment 2021 for the QA Automation Developer.

The objective is to enroll in a [Udemy](https://www.udemy.com/) course, selected form a filtered list, and check if the selected course appears in a fetched list of courses from the [Udemy API](https://www.udemy.com/developers/affiliate/).

For this, the first step is to login on the [Udemy web page](https://www.udemy.com/). The provided email and password are used in this step. Once the user is logged in, it's redirected to the homepage by the website, and there the script selects a category from the category menu found in the header. For this test, the chosen category is **Development**. This makes available a list of courses and a filter sidebar. In the sidebar, the scripts selects the **English Language** and **Free Price** filters. Once the course list is filtered, the script choose the second course available to enroll in it.

After the enrollment, an API request is send to the Udemy API Client using the provided authentication keys. The request fetches a list of courses, in English, and with free price. The enrolled course name is then searched on the fetched list to find a match.

## Usage

Create a `.env` file following the `.env.example` structure.

The `EMAIL` and `PASSWORD` fields are needed to log into the platform to enroll in a course. An account can be created at the [Udemy login page](https://www.udemy.com/join/login-popup/).

The `CLIENT_ID` and `CLIENT_SECRET` fields are needed to authenticate the Udemy API requests. They can be obtained at the [Udemy API Client](https://www.udemy.com/user/edit-api-clients).

## To run your tests

- `npm run test` to runs all tests.
- `PWDEBUG=1 npm run test` to runs all tests with an step-by-step console.
- `npm run test <feature name>` to run the single feature.
- `BROWSER=firefox npm run test` to run all test using Firefox.

## Browser selection

Firefox, Chromium, or Webkit can be used to run the project. Firefox is already set in the `BROWSER` field because has less chances to show a captcha page when attempting to login on Udemy. If the field is left blank, Chromium will be used as default.

## To add your owns tests

Add a Gherkin feature in the 'features' folder. In the 'steps' folder, you can create a steps file to detail the steps of your test.

`ICustomWorld` is used to share the browser and api context between all the steps of the test. To modify it, you can found in the `custom-world.ts` file. The `ICustomWorld` configuration is made in the before steps in `common-hooks.ts` file. Both files are found at the 'support' folder.

## Reports

A report is created automatically at the end of every run. It can be found at `reports › report.html`.

## References

This repository is based on the [Cucumber-Playwright](https://github.com/Tallyb/cucumber-playwright) repo.