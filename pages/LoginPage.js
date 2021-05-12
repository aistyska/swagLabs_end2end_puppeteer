import {getText, clearInputField} from '../utils/helpers.js';

class LoginPage {
    constructor(page) {
        this.page = page
    }

    async open() {
        await this.page.goto('https://www.saucedemo.com/'); 
    }

    async enterUserName(userName) {
        await this.page.type('#user-name', userName);
    }

    async enterPassword(password) {
        await this.page.type('#password', password);
    }

    async clickLoginButton() {
        await this.page.click('#login-button');
    }

    async getErrorMessage() {
        return await getText(this.page, '[data-test="error"]');
    }

    async clearUsername() {
        await clearInputField(this.page, '#user-name');
    }

    async clearPassword() {
        await clearInputField(this.page, '#password');
    }
}


export default LoginPage;