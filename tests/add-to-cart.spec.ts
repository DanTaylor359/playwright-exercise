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

// Future validation ideas to implement:
// - Verify specific products are in the cart by name
// - Validate product prices match the product listing
// - Validate quantity defaults to 1 for each added item
// - Validate cart total equals the sum of all line items
// - Validate removing an item updates totals and item count
// - Validate cart persists after page refresh
// - Validate cart icon counter updates correctly
// - Validate navigating to Cart always lands on the correct page
// - Validate empty-cart state after removing all items