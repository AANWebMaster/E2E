const { test, expect } = require("@playwright/test");
const APP_URLS = require("../../utilities/url.config");
const { userLogin } = require("../../utilities/user-flows");

test('Test Guidelines Edit Functionality', async ({ page }) => {

    test.setTimeout(85000);

    await userLogin(page, APP_URLS.GUIDELINES);

    // Go to https://webdev.aan.com/guidelines/admin
    await page.goto('https://webdev.aan.com/guidelines/admin');

    // Click input[name="GuidelineAdminSearchModel\.Title"]
    await page.locator('id=GuidelineAdminSearchModel_Title').click();

    // Fill input[name="GuidelineAdminSearchModel\.Title"]
    await page.locator('id=GuidelineAdminSearchModel_Title').fill('Migraine');

    // Click label:has-text("Guidelines")
    await page.locator('label:has-text("Guidelines")').click();

    // Click button:has-text("Search Guidelines")
    await page.locator('button:has-text("Search Guidelines")').click();
    await expect(page).toHaveURL('https://webdev.aan.com/Guidelines/Admin/Guidelines');

    // Click text=Practice Guideline Update: Acute Treatment of Migraine in Children and Adolescen
    await page.locator('text=Practice Guideline Update: Acute Treatment of Migraine in Children and Adolescen').click();
    await expect(page).toHaveURL('https://webdev.aan.com/Guidelines/Admin/Guidelines/Edit/966');

    // Triple click [placeholder="mm\/dd\/yyyy"]
    await page.locator('id=GuidelineInstance_PublicationDate').click();

    // Fill [placeholder="mm\/dd\/yyyy"]
    await page.locator('id=GuidelineInstance_PublicationDate').fill('10/24/2015');

    // Click text=Save Guideline
    await page.locator('text=Save Guideline').click();
    await page.goto('https://webdev.aan.com/Guidelines/Home/GuidelineDetail/966/');

    // Click text=Guideline, October 2015
    await page.locator('text=Guideline, October 2015').click();

    // Go to https://webdev.aan.com/Guidelines/Admin
    await page.goto('https://webdev.aan.com/Guidelines/Admin');

    // Click input[name="GuidelineAdminSearchModel\.Title"]
    await page.locator('id=GuidelineAdminSearchModel_Title').click();

    // Fill input[name="GuidelineAdminSearchModel\.Title"]
    await page.locator('id=GuidelineAdminSearchModel_Title').fill('Migraine');

    // Click button:has-text("Search Guidelines")
    await page.locator('button:has-text("Search Guidelines")').click();
    await expect(page).toHaveURL('https://webdev.aan.com/Guidelines/Admin/Guidelines');

    // Click text=Guideline Practice Guideline Update: Acute Treatment of Migraine in Children and >> a
    await page.locator('text=Guideline Practice Guideline Update: Acute Treatment of Migraine in Children and >> a').click();
    await expect(page).toHaveURL('https://webdev.aan.com/Guidelines/Admin/Guidelines/Edit/966');

    // Click text=Publication Date
    await page.locator('text=Publication Date').click();

    // Click [placeholder="mm\/dd\/yyyy"]
    await page.locator('id=GuidelineInstance_PublicationDate').click();

    // Fill [placeholder="mm\/dd\/yyyy"]
    await page.locator('id=GuidelineInstance_PublicationDate').fill('8/14/2019');

    // Click text=Save Guideline
    await page.locator('text=Save Guideline').click();
    await expect(page).toHaveURL('https://webdev.aan.com/Guidelines/Admin/Guidelines/Edit/966');

    await page.close();
    });

test('Test creating a guideline tool type', async ({ page }) => {

    await userLogin(page, APP_URLS.GUIDELINES);

    // Go to https://webdev.aan.com/Guidelines/Admin/ToolTypes
    await page.goto('https://webdev.aan.com/Guidelines/Admin/ToolTypes');

    // Click text=New Tool Type
    await page.locator('text=New Tool Type').click();
    await expect(page).toHaveURL('https://webdev.aan.com/Guidelines/Admin/ToolTypes/Edit');

    // Click input[name="ToolType\.Name"]
    await page.locator('id=ToolType_Name').click();

    // Fill input[name="ToolType\.Name"]
    await page.locator('id=ToolType_Name').fill('This is a test tool type');

    // Select 3
    await page.locator('id=ToolType_ClassificationID').selectOption('3');

    // Click text=Save Tool Type
    await page.locator('text=Save Tool Type').click();
    await expect(page).toHaveURL('https://webdev.aan.com/Guidelines/Admin/ToolTypes');

    // Click a:has-text("This is a test tool type")
    await page.locator('a:has-text("This is a test tool type")').first().click();
    // Click text=Delete
    page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
    });
    await page.locator('text=Delete').click();

    await page.close();
});

test('Test generating a guideline report', async ({ page }) => {

    await userLogin(page, APP_URLS.GUIDELINES);
  
    // Go to https://webdev.aan.com/Guidelines/Admin/Guidelines/WebStats
    await page.goto('https://webdev.aan.com/Guidelines/Admin/Guidelines/WebStats');
  
    // Click input[name="Guidelines\.StartDate"]
    await page.locator('id=Guidelines_StartDate').click();
  
    // Fill input[name="Guidelines\.StartDate"]
    await page.locator('id=Guidelines_StartDate').fill('8/26/2000');
  
    // Check text=Epilepsy >> input[name="selectedTopics"]
    await page.locator('text=Epilepsy >> input[name="selectedTopics"]').check();

    const [ download ] = await Promise.all([
        // Start waiting for the download
        page.waitForEvent('download'),
        // Perform the action that initiates download
        page.locator('text=Guideline Views Start Date End Date >> button[name="save"]').click(),
      ]);
      
      // assert filename
      expect(download.suggestedFilename()).toBe("GuidelineExcelExport.xls");

    await page.close();
  
});

// test.describe.fixme('Guideline Admin Broken Functionality Tests', () => {

//     test('Test creating a guideline topic', async ({ page }) => {

//         await userLogin(page, APP_URLS.GUIDELINES);
    
//         // Go to https://webdev.aan.com/Guidelines/Admin/Topics
//         await page.goto('https://webdev.aan.com/Guidelines/Admin/Topics');
    
//         // Click text=New Topic
//         await page.locator('text=New Topic').click();
//         await expect(page).toHaveURL('https://webdev.aan.com/Guidelines/Admin/Topics/Edit');
    
//         // Click input[name="Name"]
//         await page.locator('input[name="Name"]').click();
    
//         // Fill input[name="Name"]
//         await page.locator('input[name="Name"]').fill('Test Topic');
    
//         // Press Tab
//         await page.locator('input[name="Name"]').press('Tab');
    
//         // Fill textarea[name="Notes"]
//         await page.locator('textarea[name="Notes"]').fill('Adding a test topic to work with');
    
//         // Click text=Save Topic
//         await page.locator('text=Save Topic').click();
//         await expect(page).toHaveURL('https://webdev.aan.com/Guidelines/Admin/Topics/Edit');
    
//     });
    
//     test('Test creating a guideline product', async ({ page }) => {
    
//         await userLogin(page, APP_URLS.GUIDELINES);
    
//         // Go to https://webdev.aan.com/Guidelines/Admin/Products
//         await page.goto('https://webdev.aan.com/Guidelines/Admin/Products');
    
//         // Click text=New Product
//         await page.locator('text=New Product').click();
//         await expect(page).toHaveURL('https://webdev.aan.com/Guidelines/Admin/Products/Edit/0');
    
//         // Click input[name="Name"]
//         await page.locator('input[name="Name"]').click();
    
//         // Fill input[name="Name"]
//         await page.locator('input[name="Name"]').fill('Test Project');
    
//         // Press Tab
//         await page.locator('input[name="Name"]').press('Tab');
    
//         // Fill textarea[name="Description"]
//         await page.locator('textarea[name="Description"]').fill('This is a test project to get the program working');
    
//         // Click text=Save Product
//         await page.locator('text=Save Product').click();
//         await expect(page).toHaveURL('https://webdev.aan.com/Guidelines/Admin/Products/Edit/0');
    
//     });
// });
