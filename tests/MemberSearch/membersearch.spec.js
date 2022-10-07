const { test, expect } = require("@playwright/test");
const APP_URLS = require("../../utilities/url.config");

test('test', async ({ page }) => {

  // Go to https://www.aan.com/
  await page.goto('https://www.aan.com/');

});