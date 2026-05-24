const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

setDefaultTimeout(60 * 1000);

const isHeadless = process.env.HEADLESS !== 'false';

Before(async function () {
  this.browser = await chromium.launch({ headless: isHeadless });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (scenario) {
  // On failure, attach screenshot and page HTML to the Cucumber report (picked up by Allure)
  try {
    const status = scenario?.result?.status || (scenario?.result && scenario.result.status);
    if (status === 'FAILED' || status === 'failed') {
      const screenshot = await this.page.screenshot({ type: 'png' });
      await this.attach(screenshot, 'image/png');
      const html = await this.page.content();
      await this.attach(html, 'text/html');
    }
  } catch (e) {
    // ignore attachment errors
  }

  if (this.page && !this.page.isClosed && typeof this.page.close === 'function') {
    try { await this.page.close(); } catch (e) {}
  }
  if (this.context) {
    try { await this.context.close(); } catch (e) {}
  }
  if (this.browser) {
    try { await this.browser.close(); } catch (e) {}
  }
});
