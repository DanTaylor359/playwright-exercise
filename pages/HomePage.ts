import { BasePage } from './BasePage';

export class HomePage extends BasePage {

  async dismissCookiesIfPresent() {
    const overlay = this.page.locator('.fc-dialog-overlay');
    const consentButton = this.page.getByRole('button', { name: /consent/i });
  
    // Small delay for WebKit rendering to ensure the overlay is present if it exists
    await this.page.waitForTimeout(300);
  
    if (await overlay.isVisible()) {
      await consentButton.click().catch(() => {});
      await overlay.waitFor({ state: 'hidden' }).catch(() => {});
    }
  }
  
  async goToHome() {
    await this.page.goto('https://automationexercise.com');
  }

  async clickNavigationLabel(label: string) {
    await this.dismissCookiesIfPresent();
    await this.page.getByRole('link', { name: label }).click();
    
    // OPTION A — Simple if‑based structure (currently active)
    // Useful for small navigation sets or when conditions are minimal.
    if (label === 'Products') {
      await this.page.waitForSelector('.features_items');
    }
  
    if (label === 'Cart') {
      await this.page.waitForSelector('#cart_info_table');
    }

    if (label === 'Contact us') {
    await this.page.waitForSelector('#contact-page'); 
    }
    
    // OPTION B — Switch‑based structure (alternative design)
    // Preferred when navigation grows or when adding more page‑specific waits.
    //
    //switch (label) {
    //  case 'Products':
    //    await this.page.waitForSelector('.features_items');
    //    break;
    //
    //  case 'Cart':
    //    await this.page.waitForSelector('#cart_info_table');
    //    break;
    //
    //  case 'Contact us':
    //    await this.page.waitForSelector('#contact-page');
    //    break;
    //
    //  case 'Home':
    //    await this.page.waitForSelector('.carousel-inner'); // optional but nice
    //    break;
    //}
  }

  isTabActive(label: string) {
    return this.page.locator('li.active > a', { hasText: label });
  }
}