const { expect } = require('@playwright/test');

class RegisterPage {
  constructor(page) {
    this.page = page;
    this.registerButton = page.locator('a:has-text("Register")');
    this.firstNameField = page.locator('input[id="customer\\.firstName"]');
    this.lastNameField = page.locator('input[id="customer\\.lastName"]');
    this.addressField = page.locator('input[id="customer\\.address\\.street"]');
    this.cityField = page.locator('input[id="customer\\.address\\.city"]');
    this.stateField = page.locator('input[id="customer\\.address\\.state"]');
    this.zipCodeField = page.locator('input[id="customer\\.address\\.zipCode"]');
    this.phoneField = page.locator('input[id="customer\\.phoneNumber"]');
    this.ssnField = page.locator('input[id="customer\\.ssn"]');
    this.usernameField = page.locator('input[id="customer\\.username"]');
    this.passwordField = page.locator('input[id="customer\\.password"]');
    this.confirmPasswordField = page.locator('input[id="repeatedPassword"]');
    this.registerSubmitButton = page.locator('input[value="Register"]');
    this.successMessage = page.locator('text=Your login information has been created');
    this.logoutLink = page.locator('a:has-text("Logout")');
    this.homeHeading = page.locator('h1:has-text("Accounts Overview")');
  }

  async clickRegisterButton() {
    await this.registerButton.click();
  }

  async fillRegistrationForm(userData) {
    await this.firstNameField.fill(userData.firstName);
    await this.lastNameField.fill(userData.lastName);
    await this.addressField.fill(userData.address);
    await this.cityField.fill(userData.city);
    await this.stateField.fill(userData.state);
    await this.zipCodeField.fill(userData.zipCode);
    await this.phoneField.fill(userData.phone);
    await this.ssnField.fill(userData.ssn);
    await this.usernameField.fill(userData.username);
    await this.passwordField.fill(userData.password);
    await this.confirmPasswordField.fill(userData.password);
  }

  async submitRegistration() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
      this.registerSubmitButton.click()
    ]);
  }

  async isSuccessMessageVisible() {
    return await this.successMessage.isVisible();
  }

  async isHomePageDisplayed() {
    return await this.homeHeading.isVisible();
  }

  async logout() {
    await this.logoutLink.click();
  }
}

module.exports = { RegisterPage };
