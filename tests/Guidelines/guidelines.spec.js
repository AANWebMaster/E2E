const { test, expect } = require("@playwright/test");
const APP_URLS = require("../../utilities/url.config");
const { userLogin } = require("../../utilities/user-flows")

test('Test Guideline About Page Status', async ({ page }) => {

    // Go to https://www.aan.com/practice/guidelines
    await page.goto(APP_URLS.GUIDELINES);
  
    // Click text=Learn more about Guidelines
    await page.locator('text=Learn more about Guidelines').click();
    await expect(page).toHaveURL(APP_URLS.AANDOTCOM + '/practice/what-are-clinical-practice-guidelines');
  
    // Click header >> text=Guidelines FAQ
    await page.locator('text=Guidelines FAQ').click();

    await page.screenshot({ path: 'GuidelinesExpanded.png' });
  
    // Click text=Guidelines Under Development
    await page.locator('text=Guidelines Under Development').click();
    await expect(page).toHaveURL(APP_URLS.AANDOTCOM + '/practice/guidelines-under-development');
  
    // Click h1:has-text("Guidelines Under Development")
    let text = page.locator('h1:has-text("Guidelines Under Development")');

    await expect(text).toBeVisible();

    await page.close();
  
  });

  test('Test Guildlines Search Functionality by Keyword and Filter', async ({ page }) => {

    // Go to https://www.aan.com/practice/guidelines
    await page.goto(APP_URLS.GUIDELINES);
  
    // Click [placeholder="Search Guidelines"]
    await page.locator('input[name="GuidelinesSearchTerm"]').click();
  
    // Fill [placeholder="Search Guidelines"]
    await page.locator('input[name="GuidelinesSearchTerm"]').fill('Migraine');
  
    // Press Enter
    await page.locator('input[name="GuidelinesSearchTerm"]').press('Enter');
    await expect(page).toHaveURL(APP_URLS.AANDOTCOM + '/Guidelines/Home/Search');
  
    // Click text=Update: Pharmacologic Treatment for Episodic Migraine Prevention in Adults Publi
    let searchText = await page.locator('a >> text= Migraine ').first().innerText();
  
    await expect(searchText).toContain("Migraine");

    await page.close();
  });

  test('Test Guildelines Article Display', async ({ page }) => {

    // Go to https://www.aan.com/practice/guidelines
    await page.goto(APP_URLS.GUIDELINES);

    // Take a screenshot of the homepage
    await page.screenshot({ path: 'homepage.png' });
  
    // Click a:has-text("Epilepsy and Seizures")
    await page.locator('a:has-text("Epilepsy and Seizures")').click();
    await expect(page).toHaveURL(APP_URLS.AANDOTCOM + '/Guidelines/home/Search?topic=Epilepsy');
  
    // Click [placeholder="Search Guidelines"]
    await page.locator('input[name="SearchTerm"]').click();
  
    // Fill [placeholder="Search Guidelines"]
    await page.locator('input[name="SearchTerm"]').fill('Seizure');
  
    // Press Enter
    await page.locator('input[name="SearchTerm"]').press('Enter');
    await expect(page).toHaveURL(APP_URLS.AANDOTCOM + '/Guidelines/Home/Search');
  
    // Click text=Antiseizure medication withdrawal in seizure-free patients practice advisory upd
    await page.locator('text=Antiseizure medication withdrawal in seizure-free patients practice advisory upd').click();
    //await expect(page).toHaveURL(APP_URLS.AANDOTCOM + '/Guidelines/home/GuidelineDetail/995');

    // Take a screenshot of the article
    await page.screenshot({ path: 'seizureArticle.png' });
  
    await expect(page).toHaveTitle('Antiseizure medication withdrawal in seizure-free patients practice advisory update');
  
  });