const { test, expect } = require("@playwright/test");
const APP_URLS = require("../../utilities/url.config");

test("AAN Homepage Google Analytics Configuration", async ({ page }) => {

    await page.route(new RegExp(".*gtm\.js.*", "i"), (route, request) => {
        let scriptRequest = request.url().split("/").at(-1)
        expect(scriptRequest).toEqual("gtm.js?id=GTM-TL7VTW")
        route.continue();
    })

    await page.goto(APP_URLS.AANDOTCOM);

});

test("Brain and Life Homepage Google Analytics Configuration", async ({ page }) => {

    await page.route(new RegExp(".*gtm\.js.*", "i"), (route, request) => {
        let scriptRequest = request.url().split("/").at(-1)
        expect(scriptRequest).toEqual("gtm.js?id=GTM-P3379VF")
        route.continue();
    })

    await page.goto(APP_URLS.BRAINANDLIFE);

});


