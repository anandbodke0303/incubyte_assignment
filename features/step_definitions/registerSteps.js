const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { RegisterPage } = require('../../pages/RegisterPage');
const { testData } = require('../support/testData');
const fs = require('fs');
const path = require('path');

When('I click on the register button', async function () {
  console.log('Step: Clicking on the register button');
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.clickRegisterButton();
});

When('I enter the all required information', async function () {
  console.log('Step: Entering registration information');
  const userData = { ...testData.register.user1 };
  // generate username with testuser prefix and 4 digit random number
  const fourDigit = Math.floor(1000 + Math.random() * 9000).toString();
  userData.username = `testuser${fourDigit}`;
  userData.password = 'Test@123';

  // Persist credentials to a file so login scenario can use them
  const outPath = path.resolve(__dirname, '../support/registeredCredentials.json');
  try {
    fs.writeFileSync(outPath, JSON.stringify({ username: userData.username, password: userData.password }, null, 2));
  } catch (e) {
    console.error('Failed to write registered credentials:', e);
  }

  // Store in world for immediate access in same run
  this.registeredUsername = userData.username;
  this.registeredPassword = userData.password;

  await this.registerPage.fillRegistrationForm(userData);
});

Then('I click on the register', async function () {
  await this.registerPage.submitRegistration();
  console.log('Registration form submitted successfully');
});

Then('I verify user is redirected on homepage', async function () {
  await this.page.waitForTimeout(2000);
  const expectedWelcomeText = `Welcome ${this.registeredUsername}`;
  const welcomeLocator = this.page.locator(`text=${expectedWelcomeText}`);
  await welcomeLocator.waitFor({ state: 'visible', timeout: 10000 });
  const welcomeText = await welcomeLocator.textContent();
  console.log(`Welcome text after registration: ${welcomeText}`);
  expect(welcomeText.trim()).toBe(expectedWelcomeText);
  console.log('Homepage verification successful');
});

Then('I logout', async function () {
  const logoutLink = this.page.locator('//a[text()="Log Out"]');
  await logoutLink.click();
  await this.page.waitForTimeout(2000);
  const customerLoginHeading = this.page.locator('text=Customer Login');
  await customerLoginHeading.waitFor({ state: 'visible', timeout: 10000 });
  expect(await customerLoginHeading.isVisible()).toBe(true);
  console.log('Logout successful - user redirected to Customer Login page');
});
