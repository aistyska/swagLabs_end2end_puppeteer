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
        await page.waitForSelector('.inventory_details_desc_container');
        const title = await productPage.getName();
        assert.equal(title, "Sauce Labs Backpack");
        const description = await productPage.getDescription();
        assert.exists(description);
        assert.isNotEmpty(description);
        const price = await productPage.getPrice();
        assert.match(price, /^\$\d+\.\d{2}$/);
        const addBtn = await productPage.getAddToCartButtonText();
        assert.equal(addBtn, "Add to cart");
        assert.isTrue(await productPage.imageExists(), "Image doesn't exist");
    });

    it("Go back to all products", async () => {
        await productPage.clickBackToProductsButton();
        assert.equal(page.url(), allProductsPage.url);
        const title = await allProductsPage.getPageTitle();
        assert.equal(title, "Products");
    });

    after("Close browser", async function() {
        await browser.close();
    });

});