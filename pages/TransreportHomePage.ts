import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class TransreportHomePage extends BasePage {
  
  async goToHome() {
    await this.page.goto('https://www.transreport.co.uk');
  }

  async clickNavigationLabel(label: string) {
    //await this.dismissCookiesIfPresent();
    //await this.page.getByRole('link', { name: label }).click();
    await this.page.locator('#menu-main-menu').getByRole('link', { name: label }).click();

    // Validate the selected navigation item (green text)
    await expect(
      this.page.locator('#menu-main-menu li.current-menu-item span.menu-item-text')
    ).toHaveText(label);
  
    // Page‑specific validation   
    if (label === 'Our product') {
      await this.page.waitForSelector('h1');
      await expect(this.page.locator('h1')).toContainText('Passenger Assistance management system');
    }
  
    if (label === 'About us') {
      await this.page.waitForSelector('h1');
      await expect(this.page.locator('h1')).toContainText('A trusted partner to rail operators');
    }

    if (label === 'Case studies') {
      await this.page.waitForSelector('h1');
      await expect(this.page.locator('h1')).toContainText('Real results, real impact'); 
    }
  }

  async verifyOurProductPage(h1Text: string, h5Text: string) {
    await this.page.waitForSelector('h1');
    await expect(this.page.locator('h1')).toContainText(h1Text);
    await expect(
      this.page.locator('h5').filter({ hasText: h5Text }) // there are multiple h5 elements, so filter by text
    ).toBeVisible();
 }


  isTabActive(label: string) {
    return this.page.locator('li.active > a', { hasText: label });
  }
}