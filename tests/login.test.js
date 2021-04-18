const puppeteer = require('puppeteer');
const assert = require('chai').assert;

describe("Login Testing", () => {
    it("Login as Standard User with valid credentials", async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto('https://www.saucedemo.com/');
      await page.type('#user-name', 'standard_user');
      await page.type('#password', 'secret_sauce');
      await page.click('#login-button');
      assert.include(page.url(), "inventory.html");
      await browser.close();
    })
})
