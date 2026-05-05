import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';

test('Product Search — search for Dress', async ({ page }) => {
  const home = new HomePage(page);
  const products = new ProductsPage(page);

  await test.step('Navigate to Products page', async () => {
    await home.goToHome();
    await home.clickNavigationLabel('Products');
  });

  await test.step('Search for "Dress"', async () => {
    await products.search('Dress');
    await expect(products.resultsContainer).toBeVisible();
  });

  await test.step('Verify all results contain "dress"', async () => {
    const names = await products.productNames.allTextContents();

    for (const name of names) {
      expect(name.toLowerCase()).toContain('dress');
    }
  });
});