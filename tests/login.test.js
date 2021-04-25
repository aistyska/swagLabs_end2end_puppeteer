const puppeteer = require('puppeteer');
const assert = require('chai').assert;

describe("Login Testing", () => {
    let browser;
    let page;

    before("Launch browser and go to login page", async function() {
        browser = await puppeteer.launch({headless: false});
        page = await browser.newPage();
        await page.goto('https://www.saucedemo.com/');
    });

    it("Login as Standard User with invalid credentials", async () => {
        await page.type('#user-name', 'standard_user1');
        await page.type('#password', 'secret');
        await page.click('#login-button');
        const errorMessage = await page.$eval('[data-test="error"]', errorMsg => errorMsg.textContent);
        assert.equal(errorMessage, "Epic sadface: Username and password do not match any user in this service");
    });

    it("Login as Standard User with valid credentials", async () => {
        const usernameField = await page.$('#user-name');
        await usernameField.click({clickCount: 3});
        // await page.keyboard.press('Backspace');
        await usernameField.type('standard_user')
        const passwordField = await page.$('#password');
        await passwordField.click({clickCount: 3});
        // await page.keyboard.press('Backspace');
        await passwordField.type('secret_sauce');
        await page.click('#login-button');
        assert.include(page.url(), "inventory.html");
        await page.waitForSelector('span.title');
        const title = await page.$eval('span.title', text => text.textContent);
        assert.equal(title, "Products");
    });

    after("Close browser", async function() {
        await browser.close();
    });

});
