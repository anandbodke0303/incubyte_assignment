const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[type="password"]');
    this.submitButton = page.locator('input[type="submit"]');
    this.amount = page.locator('//table[@id="accountTable"]//tbody//tr[2]//td[2]//b');
  }

  async goto() {
    await this.page.goto('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
  }

  async login(username, password) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
      this.submitButton.click()
    ]);
  }

  async verify_The_Amount() {
    await this.amount.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    return await this.amount.textContent();
  }
}

module.exports = { LoginPage };
