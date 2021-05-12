import LoginPage from '../pages/LoginPage.js';
import puppeteer from 'puppeteer';
import {assert} from 'chai';

describe("Login Testing", () => {
    let loginPage;
    let browser; // remove after
    let page; //remove after
    before("Launch browser and go to login page", async function() {
        browser = await puppeteer.launch({headless: false});
        page = await browser.newPage();
        loginPage = new LoginPage(page);
        await loginPage.open();
    });

    it("Login as Standard User with invalid credentials", async () => {
        await loginPage.enterUserName('standard_user1');
        await loginPage.enterPassword('secret');
        await loginPage.clickLoginButton();
        const errorMessage = await loginPage.getErrorMessage();
        assert.equal(errorMessage, "Epic sadface: Username and password do not match any user in this service");
    });

    it("Login as Standard User with valid credentials", async () => {
        await loginPage.clearUsername();
        await loginPage.enterUserName('standard_user')
        await loginPage.clearPassword('#password');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.clickLoginButton();
        assert.include(page.url(), "inventory.html");
        await page.waitForSelector('span.title');
        const title = await page.$eval('span.title', text => text.textContent);
        assert.equal(title, "Products");
    });

    after("Close browser", async function() {
        await browser.close();
    });

});
