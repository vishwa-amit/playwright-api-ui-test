import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { users } from '../../test-data/users';

test.describe('Sauce Demo UI', () => {
   test('standard user can add a product to cart and complete checkout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.gotoUrl();
    await loginPage.login(users.standard.username, users.standard.password);

    await inventoryPage.assertInventoryLoaded();
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openCart();
    
    await checkoutPage.proceedToCheckout();
    await checkoutPage.assertCheckoutPageLoaded();
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
  });
});