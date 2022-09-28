# AAN E2E Testing

This project aims to provide an accessible place to create/maintain end-to-end tests 
for AAN applications, both new and legacy. 

It resides within a separate repository in order to be less disruptive to current workflows and to maintain a strong separation of concerns. 

## [Playwright.dev](https://playwright.dev/)

These tests are built upon the [Playwright](https://playwright.dev/) framework by Microsoft. 
This repository utilizes the node.js library in order to maintain strong interoperability with online test automation services.

**Documentation and Tutorials:** [playwright.dev/docs/intro](https://playwright.dev/docs/intro)

**API Reference:** [playwright.dev/docs/api/class-playwright](https://playwright.dev/docs/api/class-playwright)
## Creating Test Suites

All the e2e tests should be organized by application in the /tests folder. 

**Create a New Test Suite:**

To create a new test suite, make a new directory in the /tests folder under your application name. *(Eg. /tests/fellowship)*

**Create a New Test:**

To create a new test file, create a TypeScript file following the naming convention: test.spec.ts and place it within the appropriate application folder

Inside this test file, you can begin creating your tests. Refer to the [Playwright documentation](https://playwright.dev/docs/writing-tests) for how to get started. 

**Using Test Generator:**

To use the built-in code generator, execute <code>npx playright codegen aan.com</code> inside your terminal. The URL is optional and can be replaced with the specific url you want to test.

From there, you can record a manual test flow and copy the generated playwright script into a local test file. Make sure to adapt any brittle locators you identify to stronger ones based on id's, attributes, or css classes so that the tests can continue run despite changes in the html structure/text. 

[Test Generator Documentation](https://playwright.dev/docs/codegen)

## Running Test Suites

To specify which environment you would like to run your tests against, make sure to modify the .env with your environment of choice.
You can also temporarily set the environment variable in the PowerShell terminal using <code>$env:TEST_ENV='DEV'</code>

**Options**
- LOCAL *(localhost)*
- DEV   *(webdev.ann.com)*
- PROD  *(aan.com)*

**Run all tests**: <code>npx playwright test</code> 

**Run specific folder**: <code>npx playwright test ./tests/folder_name</code> 

**Run test file**: <code>npx playwright test ./tests/folder_name/test.spec.js</code> 

**Run test by name** <code>npx playwright test -g "navigate to aan.com"</code> 

[Test Runner Documentation](https://playwright.dev/docs/running-tests)

## Debugging Test Suites

Playwright offers a variety of tools and options to use while debugging your tests.

**Run tests with browser visible**: <code>npx playwright test --headed</code>

**View the test results** <code>npx playwright show-report</code>

**Run tests in debug mode** <code>npx playwright test --debug</code>

[Test Debug Documentation](https://playwright.dev/docs/debug)

You can also record and view test traces by modifying the config file or the individual test file. For more information, read the [trace documentation](https://playwright.dev/docs/trace-viewer)

## Config Options

There are a number of helpful config options for setting up your tests. Read the [test configuration documentation](https://playwright.dev/docs/test-configuration) for more details
You can set these in the config file or override them in your test file using <code>test.use()</code>

Here are a few of them for future reference. Feel free to add your own!

*Configure Headless Mode:* <code>headless: false</code>

*Enable Video Playback:* <code>video: 'retain-on-failure'</code>

*Enable Screenshots:* <code>screenshot: 'only-on-failure'</code>

*Enable Trace Recording* <code>trace: 'retain-on-failure'</code>

You can also specify which browsers you would like to test against. Read the [browser configuration documentation](https://playwright.dev/docs/test-configuration#multiple-browsers)