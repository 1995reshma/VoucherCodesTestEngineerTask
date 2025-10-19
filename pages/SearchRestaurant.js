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

  async clickrestaurantCategory() {
    await this.categories.click();
    await this.restaurantCategory.click();
  }

  async verifyHeading(){
    await expect(this.restaurantHeading).toHaveText(testData.expectedheaderMessage);
  }

  async searchVouchersForRestaurants(){
    await this.location.fill(testData.locationData);
    await this.day.selectOption({label : testData.dayValue});
    await this.people.selectOption({label : testData.noOfPeople});
    await this.findRestaurantVoucherBtn.click();
  }

  async verifyPageTitle(){
    await expect(this.page).toHaveTitle(testData.expectedrestaurantVoucherTitle);
  }

  async verifygetVoucherButtonsExist(){
    let voucherButtonCount = await this.getVoucherBtns.count();
    await expect(voucherButtonCount).toBeGreaterThan(0);
  }


}


