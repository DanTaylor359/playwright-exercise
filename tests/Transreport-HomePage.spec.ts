import { test, expect } from '@playwright/test';
import { TransreportHomePage } from '../pages/TransreportHomePage';

// Tests all navigation links on the Transreport homepage to ensure they are displayed and selectable, and that they navigate to the correct URLs.
// Possible deletion as specific tests for each navigation link already exist, but this test is useful for quickly checking all links in one go.
test('Navigation is displayed and selectable', async ({ page }) => {
  const home = new TransreportHomePage(page);

  await test.step('Click navigation links', async () => {
    await home.goToHome();

    const links = [
      //{ label: 'Transreport', url: 'https://www.transreport.co.uk' }, // TO DO acts as Home button?
      { label: 'Our product', url: 'https://www.transreport.co.uk/our-product/' },
      { label: 'About us', url: 'https://www.transreport.co.uk/about-us/' },
      { label: 'Case studies', url: 'https://www.transreport.co.uk/case-studies/' },
      //{ label: 'Transreport Japan', url: 'https://www.transreport.co.jp' }  // TO DO opens a new tab
      //{ label: 'Request a briefing', url: 'https://www.transreport.co.uk/get-in-touch/' } // TO DO displays different to the others
    ];
    
    for (const { label, url } of links) {
      await home.clickNavigationLabel(label);
    
      if (label === 'Transreport Japan') {
        const pages = page.context().pages();
        const newTab = pages[pages.length - 1];
        await expect(newTab).toHaveURL(url);
      } else {
        await expect(page).toHaveURL(url);
      }
    }

  });
});