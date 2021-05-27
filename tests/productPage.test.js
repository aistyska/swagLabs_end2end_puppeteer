import {loginAsStandardUser, openPage} from '../utils/helpers.js';
import AllProductsPage from '../pages/AllProductsPage.js';
import OneProductPage from '../pages/OneProductPage.js';
import {assert} from 'chai';

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

    after("Close browser", async function() {
        await page.browser().close();
    });

});