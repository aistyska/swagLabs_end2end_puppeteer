import LoginPage from "../pages/LoginPage.js";
import puppeteer from 'puppeteer';

async function openPage() {
    const browser = await puppeteer.launch({headless: false});
    return await browser.newPage(); 
}

async function getText(page, selector) {
    await page.waitForSelector(selector);
    return await page.$eval(selector, element => element.textContent);
}

async function clearInputField(page, selector){
    const inputField = await page.$(selector);
    await inputField.click({clickCount: 3});
    await page.keyboard.press('Backspace');
}

async function loginAsStandardUser(page) {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.enterUserName('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLoginButton();
}

export {openPage, getText, clearInputField, loginAsStandardUser};