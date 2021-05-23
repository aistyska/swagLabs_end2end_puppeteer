import LoginPage from "../pages/LoginPage.js";

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

export {getText, clearInputField, loginAsStandardUser};