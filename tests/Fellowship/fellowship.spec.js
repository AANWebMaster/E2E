const { test, expect } = require("@playwright/test");
const APP_URLS = require("../../utilities/url.config");

test("fellowship application is online", async ({ page }) => {
  await page.goto(APP_URLS.FELLOWSHIP);
  await expect(page).toHaveTitle("Neurology Fellowships Directory");

  await page.close();

});

test("search fellowships by state button", async ({ page }) => {
  await page.goto(APP_URLS.FELLOWSHIP);

  // Click #states >> text=WI
  await page.locator("[for='chkState_WI']").click();

  //Click MS Topic
  await page.locator("[for='chkTopic_181']").click();

  // Click text=Start Search >> nth=0
  await page.locator("text=Start Search").first().click();
  await expect(page).toHaveURL(
    new RegExp(APP_URLS.FELLOWSHIP + "/Home/Search", "i")
  );
  // Click text=Medical College of Wisconsin
  await page.locator("text=Medical College of Wisconsin").first().click();
  await expect(page).toHaveURL(
    APP_URLS.FELLOWSHIP +
      "/Home/ListingView/1862?searchString=1%7C%7CWI%7C181%7Cname"
  );
  // Click text=Milwaukee, WI
  let location = page.locator("text=Milwaukee, WI");
  await expect(location).toBeVisible();

  await page.close();

});

test("search fellowships by topic button", async ({ page }) => {
  // Go to https://www.aan.com/fellowship
  await page.goto(APP_URLS.FELLOWSHIP);

  // Click text=Epilepsy
  await page.locator("text=Epilepsy").click();

  // Click text=Start Search >> nth=0
  await page.locator("text=Start Search").first().click();
  await expect(page).toHaveURL(APP_URLS.FELLOWSHIP + "/Home/Search");

  // Click text=George Washington University
  await page.locator("text=George Washington University").click();
  await expect(page).toHaveURL(
    APP_URLS.FELLOWSHIP +
      "/Home/ListingView/1683?searchString=1%7C%7C%7C75%7Cname"
  );

  // Click text=Primary Topic: Epilepsy >> td
  let topic = page.locator('text=Primary Topic: Epilepsy');
  await expect(topic).toBeVisible();

  await page.close();

});

test("back to search results page", async ({ page }) => {
    
    // Go to Fellowship Application
    await page.goto(APP_URLS.FELLOWSHIP + "/Home/Index");
       
    // Click [placeholder="Search Fellowships"]
    await page.locator('input[name="Name"]').click();
  
    // Fill [placeholder="Search Fellowships"]
    await page.locator('input[name="Name"]').fill('New York');
  
    // Click text=Fellowship Name: Start Search >> input[type="submit"]
    await page.locator('input[type="submit"]').first().click();
    await expect(page).toHaveURL(APP_URLS.FELLOWSHIP + '/Home/Search');
  
    // Check the first search result location
    let location = await page.locator("text=New York, NY").first()
    await expect(location).toContainText("NY")
  
    // Click the first search result
    await page.locator("text=New York Presbyterian Hospital").first().click();
    await expect(page).toHaveURL(new RegExp(APP_URLS.FELLOWSHIP + '/Home/ListingView/.*', "i"));
  
    // Click text=Back to Search Results
    await page.locator('text=Back to Search Results').click();

    // Check the first search result location
    location = await page.locator("text=New York, NY").first()
    await expect(location).toBeVisible();
    
    // Click the first location on the list
    await page.locator("text=New York Presbyterian Hospital").first().click();
    
    await expect(page).toHaveURL(new RegExp(APP_URLS.FELLOWSHIP + '/Home/ListingView/.*', "i"));
  
    await page.close();

  });


test('search fellowships by topic input', async ({ page }) => {

  // Go to https://aan.com/fellowship
  await page.goto(APP_URLS.FELLOWSHIP + "/Home/Index");

  // Click [placeholder="Search by topic"]
  await page.locator('[placeholder="Search by topic"]').click();

  // Fill [placeholder="Search by topic"]
  await page.locator('[placeholder="Search by topic"]').type('Epilepsy', {delay: 50});

  // Click text=Fellowship Name: Start Search >> input[type="submit"]
  await page.locator('input[type="submit"]').first().click();
  await expect(page).toHaveURL(APP_URLS.FELLOWSHIP + '/Home/Search');

  // Click text=Next >> nth=1
  await page.locator('text=Next').first().click();
  await expect(page).toHaveURL(APP_URLS.FELLOWSHIP + '/Home/SearchPage?name=&searchStates=&searchTopics=176%2c75&currentPage=2&orderBy=name');

  // Click text=Next >> nth=1
  await page.locator('text=Next').first().click();
  await expect(page).toHaveURL(APP_URLS.FELLOWSHIP + '/Home/SearchPage?name=&searchStates=&searchTopics=176%2c75&currentPage=3&orderBy=name');

  // Click text=Wayne State University/Detroit Medical Center
  await page.locator('text=Wayne State University/Detroit Medical Center').click();
  await expect(page).toHaveURL(new RegExp(APP_URLS.FELLOWSHIP + '/Home/ListingView/1267.*', "i"));

  // Click text=Back to Search Results
  await page.locator('text=Back to Search Results').click();
  await expect(page).toHaveURL(APP_URLS.FELLOWSHIP + '/Home/Search');

  // Click text=George Washington University
  await page.locator('text=George Washington University').click();
  await expect(page).toHaveURL(new RegExp(APP_URLS.FELLOWSHIP + '/Home/ListingView/1683.*', "i"));

  // Click text=Back to Search Results
  await page.locator('text=Back to Search Results').click();
  await expect(page).toHaveURL(APP_URLS.FELLOWSHIP + '/Home/Search');

  // Change ordering to primaryTopic
  await page.locator('select[name="sortBy"]').selectOption('primaryTopic');
  await expect(page).toHaveURL(APP_URLS.FELLOWSHIP + '/Home/SearchPage?name=&searchStates=&searchTopics=176%2c75&currentPage=1&orderBy=primaryTopic');

  await page.close();

});


test('search fellowships by selecting topic and state', async ({ page }) => {

  // Go to https://webdev.aan.com/fellowship
  await page.goto(APP_URLS.FELLOWSHIP);

  // Click text=Vascular neurology (stroke)
  await page.locator('text=Vascular neurology (stroke)').click();

  // Click text=Ontario
  let ontarioInput = page.locator('text=Ontario');
  await expect(ontarioInput).not.toBeChecked();
  await ontarioInput.click();
  await expect(ontarioInput).toBeChecked();

  // Click text=Start Search >> nth=2
  await page.locator('text=Start Search').nth(2).click();
  await expect(page).toHaveURL(APP_URLS.FELLOWSHIP + '/Home/Search');

  // Click text=University of Toronto >> nth=0
  await page.locator('text=University of Toronto').first().click();
  await expect(page).toHaveURL(new RegExp(APP_URLS.FELLOWSHIP + '/Home/ListingView/1739.*', "i"));

  // Expect text=Toronto, ON
  expect(page.locator('text=Toronto, ON')).toBeVisible();

  // Click text=Fellowships
  await page.locator('text=Fellowships').click();
  await expect(page).toHaveURL(new RegExp(APP_URLS.FELLOWSHIP + "/home/index", "i"));

  // Check if text=Vascular neurology (stroke) is cleared
  await expect(page.locator('text=Vascular neurology (stroke)')).not.toBeChecked();

  await page.close();

});

test('creating and editing fellowships', async ({ page }) => {

  // Go to https://aan.com/fellowship
  await page.goto(APP_URLS.FELLOWSHIP);

  // Click text=new listing >> nth=2
  await page.locator('a >> text=new listing').first().click();
  await expect(page).toHaveURL(APP_URLS.FELLOWSHIP + '/Home/ListingForm');

  // Click input[name="FellowshipInfo\.InstitutionName"]
  await page.locator('#FellowshipInfo_InstitutionName').click();

  // Click text=Add New Location
  await page.locator('text=Add Location').click();

  // Click input[name="LocationName"] >> nth=1
  await expect(page.locator('#LocationName').nth(1)).toBeEmpty();

  // Go to https://aan.com/fellowship
  await page.goto(APP_URLS.FELLOWSHIP);

  //Click Movement Disorders Topic
  await page.locator("[for='chkTopic_79']").click();

  // Click [placeholder="Search by name"]
  await page.locator('[placeholder="Search by name"]').click();

  // Fill [placeholder="Search by name"]
  await page.locator('[placeholder="Search by name"]').fill('Wisconsin');

  // Press Enter
  await page.locator('[placeholder="Search by name"]').press('Enter');
  await expect(page).toHaveURL(APP_URLS.FELLOWSHIP + '/Home/Search');

  // Click text=Medical College of Wisconsin
  await page.locator('text=Medical College of Wisconsin').click();
  await expect(page).toHaveURL(new RegExp(APP_URLS.FELLOWSHIP + '/Home/ListingView/1702.*', "i"));

  // Click text=Edit Fellowship
  await page.locator('text=Edit Fellowship').click();
  await expect(page).toHaveURL(APP_URLS.FELLOWSHIP + '/Home/ListingForm/1702');

  // Click input[name="FellowshipInfo_InstitutionName"]
  await expect(page.locator('#FellowshipInfo_InstitutionName')).toHaveValue('Medical College of Wisconsin');

  // Click text=Discard Changes
  await page.locator('text=Discard Changes').click();
  await expect(page).toHaveURL(APP_URLS.FELLOWSHIP + '/Home/ListingView/1702');

  // Click h1:has-text("Medical College of Wisconsin")
  await expect(page.locator('h1 >> text=Medical College of Wisconsin')).toBeVisible();

  await page.close();

});