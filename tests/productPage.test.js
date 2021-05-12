import puppeteer from 'puppeteer';
import {assert} from 'chai';

describe("One product page", () => {
    let browser;
    let page;

    before("Launch browser and login as standard user", async function() {
        browser = await puppeteer.launch({headless: false});
        page = await browser.newPage();
        await page.goto('https://www.saucedemo.com/');
        await page.type('#user-name', 'standard_user');
        await page.type('#password', 'secret_sauce');
        await page.click('#login-button');
    });

    it("Check if product page has required information", async () => {
        await page.waitForSelector('#item_4_img_link');
        await page.click('#item_4_img_link');
        assert.include(page.url(), "?id=4");
        await page.waitForSelector('.inventory_details_desc_container');
        const title = await page.$eval('.inventory_details_name', text => text.textContent);
        assert.equal(title, "Sauce Labs Backpack");
        let description = await page.$('.inventory_details_desc');
        assert.exists(description);
        description = await page.$eval('.inventory_details_desc', text => text.textContent);
        assert.isNotEmpty(description);
        const price = await page.$eval('.inventory_details_price', price => price.textContent);
        assert.match(price, /^\$\d+\.\d{2}$/);
        const addBtn = await page.$eval('#add-to-cart-sauce-labs-backpack', btn => btn.textContent);
        assert.equal(addBtn, "Add to cart");
        const img = await page.$('img.inventory_details_img');
        assert.exists(img);
    });

    it("Go back to all products", async () => {
        await page.click('#back-to-products');
        assert.include(page.url(), "inventory.html");
        await page.waitForSelector('span.title');
        const title = await page.$eval('span.title', text => text.textContent);
        assert.equal(title, "Products");
    });

    after("Close browser", async function() {
        await browser.close();
    });

});