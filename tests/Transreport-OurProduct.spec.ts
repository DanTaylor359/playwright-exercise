import { test, expect } from '@playwright/test';
import { TransreportHomePage } from '../pages/TransreportHomePage';

test('Select "Our product" via navigation', async ({ page }) => {
  const home = new TransreportHomePage(page);

  await test.step('Navigate to "Our product" page', async () => {
    await home.goToHome();
    await home.clickNavigationLabel('Our product');  // verifies the selected nav item (green text) via current-menu-item class
  });

  await test.step('Verify "Our product" page content', async () => {
    await expect(page).toHaveURL('https://www.transreport.co.uk/our-product/');
    await home.verifyOurProductPage(
      'Passenger Assistance management system',
      'Coordinate requests and delivery across rail operations, with oversight and audit.'
    );
  });

});