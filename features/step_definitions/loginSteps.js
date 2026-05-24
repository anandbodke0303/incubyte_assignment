const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { testData } = require('../support/testData');
const fs = require('fs');
const path = require('path');

Given('I open the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
});

When('I login with valid credentials', async function () {
  
  const credPath = path.resolve(__dirname, '../support/registeredCredentials.json');
  let credentials;
  if (fs.existsSync(credPath)) {
    try {
      const raw = fs.readFileSync(credPath, 'utf8');
      credentials = JSON.parse(raw);
    } catch (e) {
      // fall back to default
    }
  }

  if (!credentials || !credentials.username) {
    throw new Error('Registered credentials not found. Run register scenario first.');
  }

  await this.loginPage.login(credentials.username, credentials.password);
});

Then('I Verify the amount', async function () {
  const amountText = await this.loginPage.verify_The_Amount();
  console.log('Account amount:', amountText?.trim());
  expect(amountText).toBeTruthy();
});
