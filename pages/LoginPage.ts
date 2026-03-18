import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.locator('[data-test="login-button"]').click();
  }

  async assertLoginError(message: string) {
    await expect(this.page.locator('[data-test="error"]')).toContainText(message);
  }
}