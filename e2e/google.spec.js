
const { test, browser, expect } = require('@playwright/test');
const { chromium } = require('playwright');


test('basic test', async ({ page }) =>{  

//const page = await browser.newPage();
await page.goto('https://google.com')


//await navigationPromise

await page.screenshot({ path: 'screenshot_1.png', fullPage: true })

await page.waitForSelector('.left-part > .icon-part-wrap:nth-child(3) > .text-part > a > .primary-text')
await page.click('.left-part > .icon-part-wrap:nth-child(3) > .text-part > a > .primary-text')

await page.waitForSelector('.header-content > .right-part > .start-part > .primary-btn > .primary-text')
await page.click('.header-content > .right-part > .start-part > .primary-btn > .primary-text')

await page.waitForSelector('#login-modal > .login-modal-start > .login-options > .metamask-login > .white')
await page.click('#login-modal > .login-modal-start > .login-options > .metamask-login > .white')

await browser.close();

}
);


