
const { test, browser, expect } = require('@playwright/test');
const { chromium } = require('playwright');

test('basic test', async ({ page }) =>{  
await page.goto('https://goerli-test.zed.run')
await browser.close();
}
);


