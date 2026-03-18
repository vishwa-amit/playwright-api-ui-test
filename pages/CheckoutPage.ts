import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async assertCheckoutPageLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-one/);
    await expect(this.page.locator('.title')).toHaveText('Checkout: Your Information');
  }

  async fillCheckoutInfo(firstName: string, lastName: string, zipCode: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(zipCode);
  }

  async clickContinue() {
    await this.page.locator('[data-test="continue"]').click();
  }

  async proceedToCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}
