# Voucher Codes TestEngineer Task

# 🚀 Overview
This project is an end to end automation testing framework built with playwright, javascript, and Page Object Model (POM).

## 📌 Tech Stack
- **Playwright** - End-to-end test framework for modern web apps
- **Page Object Model (POM)** - Enhances maintainability and reusability
- **allure-reporting** - Generates rich test reports
---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/1995reshma/VoucherCodesTestEngineerTask.git
```

### 2️⃣ Install playwright with javascript and allure reporting dependencies

#### **Step 1: Install playwright**
```sh
npm init playwright@latest
```

#### **Step 2: Configure allure reports (The allure-commandline package provides the CLI tools to generate and open reports.)**
Run these commands in your project root:

```sh
npm install --save-dev allure-playwright allure-commandline
```

#### **Step 3: Update your playwright.config.js**

Replace your reporter section with:

```javascript
reporter: [
['list'],
['allure-playwright']
],
```

Your full config might look like this:

```javascript
// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
testDir: './tests',
fullyParallel: true,
forbidOnly: !!process.env.CI,
retries: process.env.CI ? 2 : 0,
workers: process.env.CI ? 1 : undefined,

reporter: [
['list'], // Console output
['allure-playwright'], // Allure report output
],

use: {
baseURL: 'https://www.vouchercodes.co.uk/',
headless: false,
screenshot: 'on', // Capture screenshots on failure
video: 'on', // Record video on 
trace: 'retain-on-failure', // Keep trace for failed tests
},

projects: [
{
name: 'chromium',
use: { ...devices['Desktop Chrome'] },
},
],
});
```


#### **Step 4: Create the Test (`searchRestaurant.spec.js`)**
Create a spec file with the following content: Have tagged the tests as smoke and regression. The script to run the tests based on tags can be found in the package.json 

```javascript
import { test } from '../testFixture/testFixtures';
test.describe('search restaurants with discounts on the voucher code website', () => {
  test('search for voucher code for restaurants', {tag: ['@smoke','@regression']}, async ({ searchPage }) => {
       await searchPage.clickrestaurantCategory();
       await searchPage.verifyHeading();
       await searchPage.searchVouchersForRestaurants();
       await searchPage.verifyPageTitle();
       await searchPage.verifygetVoucherButtonsExist();
  });
});
```

#### **Step 5: (Optional) Organizing Tests with Page Object Model (POM)**
To keep your tests modular and reusable, use the Page Object Model (POM).

Create `pages/SearchRestaurant.js` and define methods like below:

```javascript
import { expect } from '@playwright/test';
import testData  from '../testData/restaurantData';

export default class SearchRestaurant {
  constructor(page){
    this.page = page;
    this.categories = page.locator('#categories-dialog');
    this.restaurantCategory = page.locator('section a[href="/restaurant-vouchers.html"]');
    this.restaurantHeading = page.locator('h1[data-qa="el:restaurantHeading"]');
    this.location = page.locator('input[data-qa="el:locationDropdown enabled:true"]');
    this.day = page.locator('select#day-select');
    this.people = page.locator('select#people-select');
    this.findRestaurantVoucherBtn = page.locator('[data-qa="el:findRestaurantsVoucherButton"]');
    this.getVoucherBtns = page.locator('button[data-qa="el:offerPrimaryButton"]');
  }

  async navigatetoApp(){
    await this.page.goto('/')
  }
}
```

---
#### **Step 6: Create the Utilities and testData folder for organizing the tests and enhancing maintainability **

#### **Step 7: (Optional) Use Custom fixtures**
Fixtures are used for set up and tear down before running a test. This helps to prevent duplication of code accross multiple tests and keeps the spec files clean

```javascript
import { test as base } from '@playwright/test';
import SearchRestaurant from '../pages/SearchRestaurant';
import acceptCookiePopUp from '../Utilities/util.js';

export const test = base.extend({
  searchPage: async ({ page }, use) => {
       const searchPage  = new SearchRestaurant(page);
       await searchPage.navigatetoApp();
       await acceptCookiePopUp(page);
       await use(searchPage);
  },
});
```


## 3️⃣ Run Playwright Tests

### 📌 Run Tests in command Line
```sh
npm run test
```

### 📊 Generating Test Reports (Allure)
After Running tests use below commands to generate reports:
```sh
npm run allure:generate
npm run allure:open
```

After generating the reports and running the open command the Allure report opens up and user can view the logs , screenshots and videos under the suite tab 

<img width="959" height="503" alt="image" src="https://github.com/user-attachments/assets/e4f65247-5190-4355-a1d8-1ac851562ef3" />


### Covering Note (Technology Choices)
I chose playwright + javascript.

Why this stack ?

I chose Playwright + JavaScript + POM because it aligns with the tech stack mentioned in the job description, provides powerful multi-tab and parallel execution capabilities, integrates well with CI/CD and supports building clean, maintainable automation frameworks suitable for scaling future tests.
























