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
        await this.page.waitForSelector('span.title');
        return await getText(this.page, 'span.title');
    }

    async clickBackpackImg() {
        await this.page.waitForSelector('#item_4_img_link');
        await this.page.click('#item_4_img_link');
    }
}


export default AllProductsPage;