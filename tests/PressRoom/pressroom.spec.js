const { test, expect } = require("@playwright/test");
const APP_URLS = require("../../utilities/url.config");

test('Search by Specific Year', async ({ page }) => {

    test.setTimeout(60000);

    // Go to https://webdev.aan.com/PressRoom/Home/Archives
    await page.goto(APP_URLS.PRESS_ROOM_ARCHIVES);
  
    // Click text=2015
    await page.locator('text=2015').click();

    await expect(page).toHaveURL(APP_URLS.PRESS_ROOM_ARCHIVES + '?year=2015');
  
    // Click text=December 30, 2015
    let year = page.locator('text=December 30, 2015').first();
    await expect(year).toBeVisible();

    await page.close()
  
});

  test('Search with an input field', async ({ page }) => {

    // Go to https://webdev.aan.com/PressRoom/Home/Archives
    await page.goto(APP_URLS.PRESS_ROOM_ARCHIVES);

    // Click input[name="Keyword"]
    await page.locator('input[name="Keyword"]').click();

    // Fill input[name="Keyword"]
    await page.locator('input[name="Keyword"]').fill('Headache');

    // Click text=Search by Keyword: Search >> button
    await page.locator('.cta-form >> button').click();

    // Click li:has-text("Can Acupuncture Reduce Headaches?")
    let title = page.locator('li:has-text("Headaches")').first();
    await expect(title).toBeVisible();

    await page.close();

});

test('Search button from main page works', async ({ page }) => {

    // Go to https://webdev.aan.com/AAN-Resources/Details/press-room/
    await page.goto(APP_URLS.AANDOTCOM + '/AAN-Resources/Details/press-room/');
  
    // Click text=View Archives Here
    await page.locator('text=View Archives Here').click();
  
    // Click h1:has-text("Press Releases")
    let pageTitle = page.locator('h1:has-text("Press Releases")');
    await expect (pageTitle).toBeVisible();
  
    await page.close()
});