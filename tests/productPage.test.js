import {loginAsStandardUser, openPage} from '../utils/helpers.js';
import AllProductsPage from '../pages/AllProductsPage.js';
import OneProductPage from '../pages/OneProductPage.js';
import {assert} from 'chai';
import addContext from 'mochawesome/addContext.js';

describe("One product page", () => {
    let page;
    let allProductsPage;
    let productPage;

    before("Launch browser and login as standard user", async function() {
        page = await openPage();
        allProductsPage = new AllProductsPage(page);
        productPage = new OneProductPage(page);
        await loginAsStandardUser(page);
    });

    it("Check if product page has required information", async () => {
        await allProductsPage.clickBackpackImg();
        assert.include(page.url(), productPage.url);
        assert.equal(await productPage.getName(), "Sauce Labs Backpack");
        assert.isNotEmpty(await productPage.getDescription());
        assert.match(await productPage.getPrice(), /^\$\d+\.\d{2}$/);
        assert.equal(await productPage.getAddToCartButtonText(), "Add to cart");
        assert.isTrue(await productPage.imageExists(), "Image doesn't exist");
    });

    it("Go back to all products", async () => {
        await productPage.openBackpackPage();
        await productPage.clickBackToProductsButton();
        assert.equal(page.url(), allProductsPage.url);
        assert.equal(await allProductsPage.getPageTitle(), "Products");
    });

    afterEach("Take a screenshot for a failed test", async function() {
        if (this.currentTest.state === "failed") {
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
