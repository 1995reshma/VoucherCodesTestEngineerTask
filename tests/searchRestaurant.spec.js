import { test } from '../testFixture/testFixtures';

test.describe('search restaurants with discounts on the voucher code website', () => {
  test('search for voucher code for restaurants', {tag: ['@smoke','@regression']}, async ({ searchPage }) => {
       await searchPage.clickrestaurantCategory();
       await searchPage.verifyHeading();
       await searchPage.searchVouchersForRestaurants();
       await searchPage.verifyPageTitle();
       await searchPage.verifygetVoucherButtonsExist();
  });

  test('Negative test to search for voucher code for restaurants', {tag: '@regression'}, async ({ searchPage }) => {
       await searchPage.verifyPageTitle();
  });
});