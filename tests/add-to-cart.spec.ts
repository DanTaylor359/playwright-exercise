import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';

test('Add to Cart — add two products', async ({ page }) => {
  const home = new HomePage(page);
  const products = new ProductsPage(page);

  await test.step('Navigate to Products page', async () => {
    await home.goToHome();
    await home.clickNavigationLabel('Products');
  });

  await test.step('Add two products to the cart', async () => {
    const productIndexes = [0, 1];  

    for (const index of productIndexes) {
      await products.addProductToCart(index);
      await products.continueShopping();
    }
  });

  await test.step('Open Cart page', async () => {
    await home.clickNavigationLabel('Cart');
    await expect(products.cartTable).toBeVisible();
  });

  await test.step('Verify cart contains 2 items', async () => {
    const count = await products.getCartItems().count();
    expect(count).toBe(2);
  });
});