import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';

test('Product Search — search for Dress', async ({ page }) => {
  const home = new HomePage(page);
  const products = new ProductsPage(page);

  // Navigate to home
  await home.goToHome();

  // Go to Products page
  await home.clickNavigationLabel('Products');

  // Search for "Dress"
  await products.search('Dress');

  // Assert results are visible
  expect(await products.isResultsVisible()).toBeTruthy();

  // Assert all product names contain "Dress" (case-insensitive)
  const names = await products.getSearchResults().allTextContents();

  for (const name of names) {
    expect(name.toLowerCase()).toContain('dress');
  }
});