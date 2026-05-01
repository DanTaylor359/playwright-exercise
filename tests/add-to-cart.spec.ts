import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';

test('Add to Cart — add two products', async ({ page }) => {
  const home = new HomePage(page);
  const products = new ProductsPage(page);

  // Navigate to home
  await home.goToHome();

  // Go to Products page
  await home.clickNavigationLabel('Products');

  // Add first product
  await products.addProductToCart(0);
  await products.continueShopping();

  // Add second product
  await products.addProductToCart(1);
  await products.continueShopping();

  // Go to Cart
  //await products.goToCartViaNavigation();
  //await products.clickNavigationLabel('ProductsCart');
  await home.clickNavigationLabel('Cart');

  // Assert cart contains 2 items
  const cartItems = await products.getCartItems().count();
  expect(cartItems).toBe(2);
});