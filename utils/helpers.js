async function getText(page, selector) {
    return await page.$eval(selector, element => element.textContent);
}

async function clearInputField(page, selector){
    const inputField = await page.$(selector);
    await inputField.click({clickCount: 3});
    await page.keyboard.press('Backspace');
}

export {getText, clearInputField};