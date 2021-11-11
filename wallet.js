const { chromium, context } = require('playwright');
const { test, expect } = require('@playwright/test');



(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const key = "chair image turkey crime typical then day city define comfort vacant equip";
  const password = "Changeme1!";
  const pathToExtension = require('path').join(__dirname, 'extensionChrome/app');
  const userDataDir = 'C:Users/Yousaf/AppData/Local/Google/Chrome/User Data/Default';
  const browserContext = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ]
  });
  const backgroundPage = browserContext.backgroundPages();
  // Test the background page as you would any other page.
  // await browserContext.newPage();  it open new tab

  extensionPage = await browserContext.waitForEvent("page");
  //await page.waitForNavigation('chrome-extension://bjcjcofbnaojipghcbpajdjnipiikeej/notification.html#unlock');
  const welcomeUrl = await extensionPage.url();
  console.log("here=" + welcomeUrl);
  await extensionPage.waitForNavigation({ waitUntil: 'networkidle0' });

  if (await extensionPage.$("text=Get Started") !== null) {

    console.log("First time flow");
    await extensionPage.click("text=Get Started");
    await extensionPage.click("text=Import wallet");
    await extensionPage.click("text=I Agree");
    await extensionPage.click('#app-content > div > div.main-container-wrapper > div > div > form > div.first-time-flow__textarea-wrapper > div.MuiFormControl-root.MuiTextField-root.first-time-flow__textarea.first-time-flow__seedphrase > div');
    await extensionPage.type('#app-content > div > div.main-container-wrapper > div > div > form > div.first-time-flow__textarea-wrapper > div.MuiFormControl-root.MuiTextField-root.first-time-flow__textarea.first-time-flow__seedphrase > div', key);
    await extensionPage.type('#password', password);
    await extensionPage.type('#confirm-password', password)
    await extensionPage.click('#app-content > div > div.main-container-wrapper > div > div > form > div.first-time-flow__checkbox-container > div');
    await extensionPage.click('#app-content > div > div.main-container-wrapper > div > div > form > button');

    await extensionPage.click('#app-content > div > div.main-container-wrapper > div > div > button');
    const butt = await extensionPage.waitForSelector("section.popover-wrap.whats-new-popup__popover button.fas.fa-times.popover-header__button");
    await butt.click();

    await extensionPage.click('div[role="button"]:has-text("Ethereum Mainnet")');
    await extensionPage.click('text=Goerli Test Network');
    
  }
  else {
    await extensionPage.waitForSelector('#password');
    await extensionPage.type('#password', password);
    await extensionPage.click("text=UNLOCK");
    const butt = await extensionPage.waitForSelector("section.popover-wrap.whats-new-popup__popover button.fas.fa-times.popover-header__button");
    await butt.click();
    //   await extensionPage.waitForSelector('#app-content > div > div.app-header.app-header--back-drop > div > div.app-header__account-menu-container > div.app-header__network-component-wrapper > div > span');
    //  await extensionPage.click('#app-content > div > div.app-header.app-header--back-drop > div > div.app-header__account-menu-container > div.app-header__network-component-wrapper > div > span');
    //  await extensionPage.click('#app-content > div > div.menu-droppo-container.network-droppo > div > li:nth-child(7) > span', { delay: 1000 });
  }

  const newtab = await browserContext.newPage();
  try {
    await newtab.goto('https://goerli-test.zed.run', { waitUntil: "networkidle" }, { timeout: 30000 });
  }
  catch{
  }
  const getUrl = await newtab.url();
  console.log("pageURL=" + getUrl);
  await expect(newtab).toHaveURL('https://goerli-test.zed.run');
  await newtab.click('button:has-text("Start")');
  await expect(newtab).toHaveURL('https://goerli-test.zed.run/home/start');
  await newtab.click('text=Metamask');
  await extensionPage.reload();

  await extensionPage.waitForNavigation({ waitUntil: 'networkidle0' });

  if (await extensionPage.$('text=Next') !== null) {
    await extensionPage.click('text=Next');
    await extensionPage.click('[data-testid="page-container-footer-next"]');
  }
  else {
    await extensionPage.click('[data-testid="request-signature__sign"]');
  }

  await newtab.click('.header-container > .header > .header-content > .right-part > .balance-part')
  await newtab.click('text=Deposit');
  await newtab.click('[placeholder="Enter Amount..."]', { delay: 5000 });
  await newtab.fill('[placeholder="Enter Amount..."]', '0.02');
  await newtab.click('text=Deposit to WETH Balance', { delay: 3000 });
  await newtab.click('button:has-text("Confirm")', { delay: 5000 });
  await newtab.waitForSelector('#app > div > div.header-container > header > div.sidebar-wrapper.balance-sidebar.custom-scroll.opened > div.sidebar-content > div.dw-content-container > div.primary-text.warning.m-3.text-center');
  await extensionPage.reload();
  await extensionPage.waitForNavigation({ waitUntil: 'networkidle0' });
  await extensionPage.click('[data-testid="page-container-footer-next"]');

  //logout from the application
  await newtab.waitForSelector('.user-part > .menu-button > .icon-part > .icon-arrow > .icon')
  await newtab.click('.user-part > .menu-button > .icon-part > .icon-arrow > .icon')
  await newtab.waitForSelector('div > div:nth-child(4) > .primary-text > .icon-part > span')
  await newtab.click('div > div:nth-child(4) > .primary-text > .icon-part > span')



  // await page.newPage.goto('chrome-extension://bjcjcofbnaojipghcbpajdjnipiikeej/notification.html#');
  // await page.waitForNavigation('chrome-extension://bjcjcofbnaojipghcbpajdjnipiikeej/notification.html#');

  console.log();



  //  await page.goto('chrome-extension://bjcjcofbnaojipghcbpajdjnipiikeej/notification.html#confirm-transaction/', {delay: 30000});
  // await page.waitUntil('[data-testid="request-signature__sign"]');

  //  page.click('[data-testid="request-signature__sign"]')






  // await page.goto('chrome-extension://bjcjcofbnaojipghcbpajdjnipiikeej/notification.html#confirm-transaction');
  // page.click('[data-testid="request-signature__sign"]')





  //const page1 = await context.newPage();
  // await page1.goto('chrome-extension://bjcjcofbnaojipghcbpajdjnipiikeej/notification.html');
  // await page1.goto('chrome-extension://bjcjcofbnaojipghcbpajdjnipiikeej/notification.html#connect/dec420c6-e397-4e02-aff4-71a75a615083');
  // await page1.click('text=Next');
  // await Promise.all([
  //   page1.waitForNavigation(/*{ url: 'chrome-extension://bjcjcofbnaojipghcbpajdjnipiikeej/notification.html#confirm-transaction/304626331308500/signature-request' }*/),
  //   page1.click('[data-testid="page-container-footer-next"]')
  // ]);
  // Click [data-testid="request-signature__sign"]
  // await Promise.all([
  //   page1.waitForNavigation(/*{ url: 'chrome-extension://bjcjcofbnaojipghcbpajdjnipiikeej/notification.html#' }*/),
  //   page1.click('[data-testid="request-signature__sign"]')
  // ]);
  // Close page
  // await page1.close();
  // Go to https://goerli-test.zed.run/stable
  //await page.goto('https://goerli-test.zed.run/stable');
  // Go to https://goerli-test.zed.run/stable/stable-94224685
  //await page.goto('https://goerli-test.zed.run/stable/stable-94224685');








  // // Get page after a specific action (e.g. clicking a link)

  // await newPage.waitForLoadState();
  // console.log(await newPage.title());
  // await page.click('button:has-text("Next")');
  // await page.click('button:has-text("Connect")');






  // await extensionPage.click("text=Get Started");
  // await extensionPage.click("text=Import wallet");
  // await extensionPage.click("text=I Agree");
  // await extensionPage.click('#app-content > div > div.main-container-wrapper > div > div > form > div.first-time-flow__textarea-wrapper > div.MuiFormControl-root.MuiTextField-root.first-time-flow__textarea.first-time-flow__seedphrase > div');
  // await extensionPage.type('#app-content > div > div.main-container-wrapper > div > div > form > div.first-time-flow__textarea-wrapper > div.MuiFormControl-root.MuiTextField-root.first-time-flow__textarea.first-time-flow__seedphrase > div', key);
  // // await page.type('#password',password);
  // // await page.type('#confirm-password',password)
  // await extensionPage.click('#app-content > div > div.main-container-wrapper > div > div > form > div.first-time-flow__checkbox-container > div');
  // await extensionPage.click('#app-content > div > div.main-container-wrapper > div > div > form > button');


  // //  await page.click('#password');
  // //  await page.type('#password' , password);
  // await extensionPage.click('#app-content > div > div.main-container-wrapper > div > div > div > button > span');
  // await extensionPage.click('#app-content > div > div.menu-droppo-container.network-droppo > div > li:nth-child(7) > span');


  // await page.click('#app-content > div > div.app-header > div > div.app-header__account-menu-container > div > div')

  await browserContext.close();
})();
