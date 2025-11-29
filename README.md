# QualityShop.SUT_PlaywrightTest

End-to-end test suite for QualityShop using Playwright + TypeScript.

# Repository Performance

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/r-ankur2k/QualityShop.SUT_PlaywrightTest/playwright.yml?label=CI%20Tests)
![Playwright Version](https://img.shields.io/badge/Playwright-latest-blue?logo=playwright)
![Node Version](https://img.shields.io/badge/Node.js-LTS-brightgreen?logo=node.js)
![License](https://img.shields.io/github/license/r-ankur2k/QualityShop.SUT_PlaywrightTest)
![Last Commit](https://img.shields.io/github/last-commit/r-ankur2k/QualityShop.SUT_PlaywrightTest)

## 💡 What is this

This repo contains automated UI test cases for QualityShop — covering login, product selection, checkout, and order confirmation flows.  
It uses Playwright Test Runner, a Page Object Model (POM) structure, fixtures, and reusable utilities for clean, maintainable, and robust tests.  

## 📂 Project structure

/
├── tests/ Test spec files (E2E scenarios)
├── pages/ Page Object Model classes
├── fixtures/ Reusable fixtures (login, flows, page objects)
├── utils/ Pure helpers: parsing, totals, formatting
├── test-data/ JSON test data: products, payments, addresses
├── playwright.config.ts Global Playwright configuration
├── package.json Dependencies & scripts
├── .env Environment variables (email, password)
└── README.md Project documentation


## 🚀 Setup & run tests locally

```md
# Clone repo
git clone https://github.com/r-ankur2k/QualityShop.SUT_PlaywrightTest.git
cd QualityShop.SUT_PlaywrightTest

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps

# Create `.env` file with credentials
#   USER_EMAIL=your_email
#   USER_PASSWORD=your_password

# Run full test suite (headless)
npx playwright test

# Run tests in headed mode (browser visible)
npx playwright test --headed

# Generate HTML report (default)

