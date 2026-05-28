# Incubyte Assignment - Playwright + Cucumber + Allure

This repository contains a Playwright and Cucumber test automation project with Allure reporting support.

## Project Overview

- `features/`: Cucumber feature files for registration and login scenarios.
- `features/step_definitions/`: Step implementation for feature steps.
- `features/support/`: Cucumber hooks and test setup files.
- `pages/`: Page object models for `LoginPage` and `RegisterPage`.
- `test-results/`: Placeholder for test output and reports.
- `cucumber.js`: Cucumber configuration for test execution and formatters.
- `package.json`: NPM scripts, dependencies, and Allure report commands.

## Prerequisites

- Node.js 18+ installed
- Git (optional, for cloning)
- A Windows shell (PowerShell or CMD) is recommended because scripts use Windows-style environment settings.

## Install Dependencies

```bash
cd C:\Users\anand\OneDrive\Desktop\Incubyte_Assignment
npm install --legacy-peer-deps
```

> If `npm install` fails due to peer dependency compatibility with `allure-cucumberjs` and `@cucumber/cucumber`, use `--legacy-peer-deps`.

## Install Playwright Browsers

```bash
npm run install:browsers
```

## Available NPM Scripts

- `npm run test` - Runs all feature files in headless mode.
- `npm run test:login` - Runs only `features/login.feature` in headless mode.
- `npm run test:login:headed` - Runs only `features/login.feature` in headed mode.
- `npm run test:all` - Runs both `register.feature` and `login.feature` in headless mode.
- `npm run test:all:headed` - Runs all features in headed mode.
- `npm run test:all:report` - Runs all features in headed mode, then generates and opens the Allure report.
- `npm run allure:generate` - Generates the Allure HTML report from `allure-results` into `allure-report`.
- `npm run allure:open` - Opens the generated Allure report.

## Run Tests in Headed Mode with Allure Report

To execute all tests in headed mode and automatically generate and open the Allure report:

```bash
npm run test:all:report
```

## Allure Reporting Details

- **Results directory**: `allure-results`
- **Generated report directory**: `allure-report`
- The Allure reporter is configured in `cucumber.js`.
- Hooks in `features/support/hooks.js` attach a screenshot and page HTML for failed scenarios.

## Cucumber Configuration

`cucumber.js` is configured to:

- Load support and step definition files from `features/support/**/*.js` and `features/step_definitions/**/*.js`
- Run feature files in order: `features/register.feature`, then `features/login.feature`
- Use both the console `progress` formatter and the Allure reporter.

## Folder Structure

```
.
├── cucumber.js
├── package.json
├── README.md
├── features
│   ├── login.feature
│   ├── register.feature
│   ├── step_definitions
│   │   ├── loginSteps.js
│   │   └── registerSteps.js
│   └── support
│       ├── hooks.js
│       ├── registeredCredentials.json
│       └── testData.js
├── pages
│   ├── LoginPage.js
│   └── RegisterPage.js
└── test-results
```

## Notes

- This project already includes Allure dependencies in `package.json`.
- If the browser window does not appear, confirm `set HEADLESS=false` is included in the script.
- Use `npm run allure:open` after report generation to view the report manually.

## Troubleshooting

- If Allure generation fails, ensure `allure-results` exists and contains JSON/result files.
- If `npx allure` cannot be found, verify installation and run `npm install --legacy-peer-deps` again.
- If Cucumber warns about CLI paths and config file paths, the current scripts intentionally include paths; future Cucumber versions may change this behavior.
