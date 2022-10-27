const { test, expect } = require("@playwright/test");
const APP_URLS = require("../../utilities/url.config");
const { userLogin } = require("../../utilities/user-flows")

test('Search with no parameters', async ({ page }) => {
  
  await userLogin(page, APP_URLS.MEMBER_SEARCH);
  
  // Click button[name="Submit"]
  await page.locator('button[name="Submit"]').click();
  await expect(page).toHaveURL(APP_URLS.MEMBER_SEARCH + '/Home/Results');

  let members = await page.locator('text=Displaying 1 - 20 out of ').first().innerText();
  let membersArray = members.split(" ");
  let membersNumber = parseInt(membersArray[6])

  await expect(membersNumber).toBeGreaterThan(20000);

  await page.close();
  
});

test('Search based on city', async ({ page }) => {

  await userLogin(page, APP_URLS.MEMBER_SEARCH);
  
  // Click input[name="City"]
  await page.locator('input[name="City"]').click();

  // Fill input[name="City"]
  await page.locator('input[name="City"]').fill('Minneapolis');

  // Click button[name="Submit"]
  await page.locator('button[name="Submit"]').click();

  // Click text=Karly Brodersen Minneapolis, MN, United States >> td >> nth=1
  let location = await page.locator('text=Minneapolis, MN, United States').last().innerText();

  await expect(location).toContain('Minneapolis');

  await page.close();

});

test('Search by name and location', async ({ page }) => {

  await userLogin(page, APP_URLS.MEMBER_SEARCH);
  
  // Click input[name="LastName"]
  await page.locator('input[name="LastName"]').click();

  // Fill input[name="LastName"]
  await page.locator('input[name="LastName"]').fill('Kumar');

  // Select India
  await page.locator('select[name="Country"]').selectOption('India');

  // Click button[name="Submit"]
  await page.locator('button[name="Submit"]').click();
  await expect(page).toHaveURL(APP_URLS.MEMBER_SEARCH + '/Home/Results');

  // Click text=Gurugram, India
  let location = await page.locator('text=India').first().innerText();

  // Click text=AAKASH KUMAR
  await page.locator('text=Kumar').first().click();

 // Click text=AAKASH KUMAR
  let name = await page.locator('text=Kumar').first();

  await expect(location).toContain('India');
  await expect(name).toBeVisible();

  await page.close();

});