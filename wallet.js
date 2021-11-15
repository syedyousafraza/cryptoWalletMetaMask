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


    // await extensionPage.click('#app-content > div > div.main-container-wrapper > div > div > div > button > span');
    //  await extensionPage.reload();
    //await extensionPage.waitForNavigation({ waitUntil: 'networkidle0' });

    // await extensionPage.click('#app-content > div > div.menu-droppo-container.network-droppo > div > li:nth-child(7) > span');
    // await extensionPage.click('#app-content > div > div.app-header > div > div.app-header__account-menu-container > div > div')
  }
  else {
    await extensionPage.waitForSelector('#password');
    await extensionPage.type('#password', password);
    await extensionPage.click("text=UNLOCK");
  }


  const newtab = await browserContext.newPage();

  try {
    await newtab.goto('https://goerli-test.zed.run/home/start', { waitUntil: "networkidle0" });
  }
  catch (error) {
    console.log(error);
  }

  await newtab.waitForSelector('text=Metamask');
  await newtab.click('text=Metamask');
  await extensionPage.reload();


  if (await extensionPage.$("text=Next") !== null) {
    await extensionPage.click('text=Next');
    await extensionPage.click('[data-testid="page-container-footer-next"]');
    await extensionPage.click('[data-testid="request-signature__sign"]');
  }
  else {
    await extensionPage.click('[data-testid="request-signature__sign"]');
  }


  await newtab.click('.header-container > .header > .header-content > .right-part > .balance-part')
  const prevBalance = await newtab.waitForSelector('#app > div > div.header-container > header > div.sidebar-wrapper.balance-sidebar.custom-scroll.opened > div.sidebar-content > div.balance-box.zed > div.top > div.wallet-price > div.lg-text.bold.green');
  await newtab.waitForSelector('#app > div > div.header-container > header > div.sidebar-wrapper.balance-sidebar.custom-scroll.opened');
  await newtab.click('text=Deposit');
  await newtab.click('[placeholder="Enter Amount..."]', { delay: 5000 });
  await newtab.fill('[placeholder="Enter Amount..."]', '0.02');

  await newtab.waitForSelector('text=Deposit to WETH Balance');
  await newtab.click('text=Deposit to WETH Balance');

  // await newtab.click('.sidebar-content > .dw-content-container > .dw-content > .matic-deposit > .primary-btn')
  await newtab.waitForSelector('.ReactModalPortal > .ReactModal__Overlay > .ReactModal__Content > .buttons-row > .primary-btn')
  await newtab.click('.ReactModalPortal > .ReactModal__Overlay > .ReactModal__Content > .buttons-row > .primary-btn')
  //wait for processing deposit 
  await newtab.waitForSelector('#app > div > div.header-container > header > div.sidebar-wrapper.balance-sidebar.custom-scroll.opened > div.sidebar-content > div.dw-content-container > div.dw-content.open.deposit > div.matic-deposit > button');


  await extensionPage.reload();
  const confirmTransaction = await extensionPage.$$("text='Confirm'");
  if (confirmTransaction.length > 0) {
    await extensionPage.click('[data-testid="page-container-footer-next"]');
  }
  else {
    await extensionPage.reload();
    await extensionPage.click('[data-testid="page-container-footer-next"]');
  }

  const newBalance = await newtab.waitForSelector('#app > div > div.header-container > header > div.sidebar-wrapper.balance-sidebar.custom-scroll.opened > div.sidebar-content > div.balance-box.zed > div.top > div.wallet-price > div.lg-text.bold.green', { waitUntil: "networkidle0" });
  if (prevBalance != newBalance) {
    console.log("WETH balance updated successfully!")
    console.log("previous Balance=" + prevBalance)
  }


  //logout from the application
  // await newtab.waitForSelector('.user-part > .menu-button > .icon-part > .icon-arrow > .icon');
  // await newtab.click('.user-part > .menu-button > .icon-part > .icon-arrow > .icon', { delay: 5000 });
  // await newtab.waitForSelector('div > div:nth-child(4) > .primary-text > .icon-part > span');
  // await newtab.click('div > div:nth-child(4) > .primary-text > .icon-part > span');

  console.log();

  //  await browserContext.close();
})();
