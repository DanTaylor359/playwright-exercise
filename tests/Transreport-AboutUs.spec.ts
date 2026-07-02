import { test, expect } from '@playwright/test';
import { TransreportHomePage } from '../pages/TransreportHomePage';

test('Select "About us" via navigation', async ({ page }) => {
  const home = new TransreportHomePage(page);

  await test.step('Navigate to "About us" page', async () => {
    await home.goToHome();
    await home.clickNavigationLabel('About us');  // verifies the selected nav item (green text) via current-menu-item class
  });

  await test.step('Verify "About us" page content', async () => {
    await expect(page).toHaveURL('https://www.transreport.co.uk/about-us/');
    await home.verifyOurProductPage(
      'A trusted partner to rail operators',
      'We want to create a world where everyone has access to travel, everywhere.'
    );
  });

});