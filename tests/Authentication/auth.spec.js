const { test, expect } = require("@playwright/test");
const APP_URLS = require("../../utilities/url.config");
const { userLogin } = require("../../utilities/user-flows")

test('Authentication leading to MemberProfile', async ({ page }) => {

  test.setTimeout(100000);
  
  await userLogin(page, APP_URLS.MEMBER_PROFILE);
 
  await page.screenshot({path: "memberprofile.jpg"})

  await page.close();
  
});
