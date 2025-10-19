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