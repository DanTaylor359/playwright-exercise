import { test, expect } from '@playwright/test';
import { TransreportHomePage } from '../pages/TransreportHomePage';

test('Select "Case studies" via navigation', async ({ page }) => {
  const home = new TransreportHomePage(page);

  await test.step('Navigate to "Case studies" page', async () => {
    await home.goToHome();
    await home.clickNavigationLabel('Case studies');  // verifies the selected nav item (green text) via current-menu-item class
  });

  await test.step('Verify "Case studies" page content', async () => {
    await expect(page).toHaveURL('https://www.transreport.co.uk/case-studies/');
    await home.verifyOurProductPage(
      'Real results, real impact',
      'CASE STUDIES' // not in order on page
      //'Discover how our solutions have empowered our clients and transformed customer experiences.' // paragraph, to create objective test, but not in order on page
    );
  });

});