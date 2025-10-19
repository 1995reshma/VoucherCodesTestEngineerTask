# VoucherCodesTestEngineerTask

npx playwright test --headed

Install Allure dependencies

Run these commands in your project root:

npm install --save-dev allure-playwright allure-commandline

(The allure-commandline package provides the CLI tools to generate and open reports.)

⚙️ 2️⃣ Update your playwright.config.js

Replace your reporter section with:

reporter: [
['list'],
['allure-playwright']
],

Your full config might look like this:

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
video: 'on-first-retry', // Record video on first retry
trace: 'retain-on-failure', // Keep trace for failed tests
},

projects: [
{
name: 'chromium',
use: { ...devices['Desktop Chrome'] },
},
],
});

🧾 3️⃣ Run your tests

Run Playwright normally:

npx playwright test

After the run, Allure will generate raw results in the folder:

allure-results/

🧱 4️⃣ Generate the Allure HTML Report

After tests complete, generate and open the report:

npx allure generate allure-results --clean -o allure-report
npx allure open allure-report

✅ This opens a rich Allure dashboard in your browser.

You’ll see:

Test history

Step-by-step logs

Screenshots and videos

Traces (if configured)

Retries and attachments

Verify Allure captures screenshots, videos & traces

Because of your Playwright use settings:

screenshot: 'on',
video: 'on-first-retry',
trace: 'retain-on-failure'

Playwright automatically attaches those artifacts.
Allure will show them under each failed or retried test.

⚙️ 6️⃣ Optional: Add npm scripts

In your package.json, add these scripts for convenience:

"scripts": {
"test": "npx playwright test",
"allure:generate": "allure generate allure-results --clean -o allure-report",
"allure:open": "allure open allure-report"
}

Then you can just run:

npm run test
npm run allure:generate
npm run allure:open

BAD practice to repeat steps

import { test } from '@playwright/test';
import SearchRestaurant from '../pages/SearchRestaurant';
import acceptCookiePopUp from '../Utilities/util.js';

test.describe('search restaurants with discounts on the voucher code website', () => {
test('search for voucher code for restaurants', async ({ page }) => {
const searchPage = new SearchRestaurant(page);
await searchPage.navigatetoApp();
await page.waitForLoadState('networkidle');
await acceptCookiePopUp(page);
await searchPage.clickrestaurantCategory();
await searchPage.verifyHeading();
await searchPage.searchVouchersForRestaurants();
await searchPage.verifyPageTitle();
});

test('Negative test to search for voucher code for restaurants', async ({ page }) => {
const searchPage = new SearchRestaurant(page);
await searchPage.navigatetoApp();
await page.waitForLoadState('networkidle');
await acceptCookiePopUp(page);
await searchPage.verifyPageTitle();
});
});
