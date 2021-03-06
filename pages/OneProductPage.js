import {getText} from '../utils/helpers.js';

class OneProductPage {

    url = "https://www.saucedemo.com/inventory-item.html?id=";
    backpackId = 4;

    constructor(page) {
        this.page = page
    }

    get url() {
        return this.url;
    }

    async openBackpackPage() {
        await this.page.goto(`${this.url}${this.backpackId}`);
    }

    async getName() {
        return await getText(this.page, '.inventory_details_name');
    }

    async getDescription() {
        return await getText(this.page, '.inventory_details_desc');
    }

    async getPrice() {
        return await getText(this.page, '.inventory_details_price');
    }

    async getAddToCartButtonText() {
        return await getText(this.page, 'button.btn_inventory');
    }

    async clickAddToCartButton() {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click('button.btn_inventory')
        ]);
    }

    async imageExists() {
        return await this.page.$('img.inventory_details_img') !== null;
    }

    async clickBackToProductsButton() {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click('#back-to-products')
        ]);
    }

}


export default OneProductPage;