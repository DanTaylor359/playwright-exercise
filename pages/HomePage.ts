import { BasePage } from './BasePage';

export class HomePage extends BasePage {

  //async dismissCookiesIfPresent() {
  //  const popup = this.page.locator('.fc-dialog-overlay');
  //  if (await popup.isVisible()) {
  //    await this.page.locator('button:has-text("Consent")').click().catch(() => {});
  //  }
  //}

  async dismissCookiesIfPresent() {
    const overlay = this.page.locator('.fc-dialog-overlay');
    const consentButton = this.page.getByRole('button', { name: /consent/i });
  
    // Wait a moment for WebKit (Safari engine)
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
  }

  isTabActive(label: string) {
    return this.page.locator('li.active > a', { hasText: label });
  }
}