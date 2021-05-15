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

}


export default AllProductsPage;