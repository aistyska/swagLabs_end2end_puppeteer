import {getText} from '../utils/helpers.js';

class AllProductsPage {
    url = "https://www.saucedemo.com/inventory.html";

    constructor(page) {
        this.page = page
    }

    get url() {
        return this.url;
    }

    async open() {
        await this.page.goto(this.url); 
    }

    async getPageTitle() {
        return await getText(this.page, 'span.title');
    }

    async clickBackpackImg() {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click('#item_4_img_link')
        ]);
    }
}


export default AllProductsPage;