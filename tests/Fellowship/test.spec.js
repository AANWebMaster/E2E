import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to https://www.aan.com/
  await page.goto('https://www.aan.com/');


});