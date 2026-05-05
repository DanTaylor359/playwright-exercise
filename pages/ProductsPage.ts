import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {

  resultsContainer = this.page.locator('.features_items');
  productNames = this.page.locator('.productinfo.text-center p');
  cartTable = this.page.locator('#cart_info_table');

  async search(term: string) {
    await this.page.waitForSelector('#search_product');
    await this.page.fill('#search_product', term);
    await this.page.click('#submit_search');
  }

  async addProductToCart(index: number) {
    const product = this.page.locator('.productinfo.text-center').nth(index);
    await product.hover(); // Required for WebKit
    await product.locator('a.add-to-cart').click();
  }

  async continueShopping() {
    await this.page.locator('.btn.btn-success.close-modal').click();
  }

  async goToCartViaModal() {
    await this.page.getByRole('link', { name: 'View Cart' }).click();
  }

  getCartItems() {
    return this.page.locator('#cart_info_table tbody tr');
  }
}