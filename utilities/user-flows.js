const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;

let cookieCache;

async function userLogin(page) {

    if(cookieCache != null) {
      console.debug("Loading user authentication from cache.");
      page.context().addCookies(cookieCache);
      return;
    }

    // Go to https://www.aan.com/
    await page.goto('https://www.aan.com/');
  
    // Click #page-header >> text=Log In
    await page.locator('#page-header >> text=Log In').click();
  
    // Click [placeholder="Email or 6-digit member ID"]
    await page.locator('#Username').click();
  
    // Fill [placeholder="Email or 6-digit member ID"]
    await page.locator('#Username').fill(username);
  
    // Click [placeholder="Password"]
    await page.locator('#Password').click();
  
    // Fill [placeholder="Password"]
    await page.locator('#Password').fill(password);
  
    // Click text=Email or 6-digit member ID Password Remember me Forgot Password? Log In >> button
    await page.locator('button[type="submit" i] >> text=Log In').click();
    await page.waitForURL('https://www.aan.com/');
    console.debug("Setting user authentication cache.");
    cookieCache = await page.context().cookies();
  }
  
  module.exports = {
    userLogin
  }