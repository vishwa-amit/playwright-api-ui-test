import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addBackpackToCart() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async assertInventoryLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.page.locator('.title')).toHaveText('Products');
  }

  async assertCartBadgeCount(count: string) {
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toHaveText(count);
  }

  async assertItemInCart(itemName: string) {
    await expect(this.page.locator('[data-test="inventory-item-name"]')).toContainText(itemName);
  }
}