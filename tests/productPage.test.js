import {loginAsStandardUser} from '../utils/helpers.js';
import AllProductsPage from '../pages/AllProductsPage.js';
import OneProductPage from '../pages/OneProductPage.js';
import puppeteer from 'puppeteer';
import {assert} from 'chai';

describe("One product page", () => {
    let browser;
    let page;
    let allProductsPage;
    let productPage;

    before("Launch browser and login as standard user", async function() {
        browser = await puppeteer.launch({headless: false});
        page = await browser.newPage();
        allProductsPage = new AllProductsPage(page);
        productPage = new OneProductPage(page);
        await loginAsStandardUser(page);
    });

    it("Check if product page has required information", async () => {
        await page.waitForSelector('#item_4_img_link');
        await page.click('#item_4_img_link');
        assert.include(page.url(), productPage.url);
        assert.equal(await productPage.getName(), "Sauce Labs Backpack");
        assert.isNotEmpty(await productPage.getDescription());
        assert.match(await productPage.getPrice(), /^\$\d+\.\d{2}$/);
        assert.equal(await productPage.getAddToCartButtonText(), "Add to cart");
        assert.isTrue(await productPage.imageExists(), "Image doesn't exist");
    });

    it("Go back to all products", async () => {
        await productPage.clickBackToProductsButton();
        assert.equal(page.url(), allProductsPage.url);
        assert.equal(await allProductsPage.getPageTitle(), "Products");
    });

    after("Close browser", async function() {
        await browser.close();
    });

});