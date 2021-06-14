import LoginPage from '../pages/LoginPage.js';
import AllProductsPage from '../pages/AllProductsPage.js';
import {assert} from 'chai';
import {openPage} from '../utils/helpers.js';
import addContext from 'mochawesome/addContext.js';

describe("Login Testing", () => {
    let loginPage;
    let allProductsPage;
    let page;
    before("Launch browser", async function() {
        page = await openPage();
        loginPage = new LoginPage(page);
        allProductsPage = new AllProductsPage(page);
    });

    beforeEach("Go to login page", async function() {
        await loginPage.open();
    })

    it("Login as Standard User with invalid credentials", async () => {
        await loginPage.enterUserName('standard_user1');
        await loginPage.enterPassword('secret');
        await loginPage.clickLoginButtonNoWait();
        const errorMessage = await loginPage.getErrorMessage();
        assert.equal(errorMessage, "Epic sadface: Username and password do not match any user in this service");
    });

    it("Login as Standard User with valid credentials", async () => {
        await loginPage.enterUserName('standard_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.clickLoginButton();
        assert.equal(page.url(), allProductsPage.url);
        assert.equal(await allProductsPage.getPageTitle(), "Products");
    });

    afterEach("Take a screenshot for a failed test", async function() {
        if (this.currentTest.state === 'failed') {
            let title = this.currentTest.title.replace(/\s/g, "_");
            console.log("Taking a screenshot...");
            await page.screenshot({
                path: `./screenshots/${title}.png`,
                fullPage: true
            });
            addContext(this, `../screenshots/${title}.png`);
        }
    });

    after("Close browser", async function() {
        await page.browser().close();
    });

});
