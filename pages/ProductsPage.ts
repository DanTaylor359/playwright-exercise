import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {

  async search(term: string) {
    await this.page.fill('#search_product', term);
    await this.page.click('#submit_search');
  }

  getSearchResults() {
    return this.page.locator('.productinfo.text-center p');
  }

  async isResultsVisible() {
    return this.page.locator('.productinfo.text-center').first().isVisible();
  }

  async addProductToCart(index: number) {
    const product = this.page.locator('.productinfo.text-center').nth(index);
    await product.hover(); // <-- required for WebKit
    await product.locator('a.add-to-cart').click();
  }

  async continueShopping() {
    await this.page.locator('.btn.btn-success.close-modal').click();
  }

  async goToCartViaModal() {
    await this.page.getByRole('link', { name: 'View Cart' }).click();
  }

  //async goToCartViaNavigation() {
  //  await this.page.getByRole('link', { name: 'Cart' }).click();
  //}

  getCartItems() {
    return this.page.locator('#cart_info_table tbody tr');
  }
}