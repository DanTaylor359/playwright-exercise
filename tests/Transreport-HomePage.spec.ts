import { test, expect } from '@playwright/test';
import { TransreportHomePage } from '../pages/TransreportHomePage';

test('Navigation is displayed and selectable', async ({ page }) => {
  const home = new TransreportHomePage(page);

  await test.step('Click navigation links', async () => {
    await home.goToHome();

    //const labels = [
    //  'Our product',
    //  'About us',
    //  'Case studies',
    //  'Transreport Japan'
    //];
//
    //for (const label of labels) {
    //  await home.clickNavigationLabel(label);
    //}

    const links = [
      { label: 'Our product', url: 'https://www.transreport.co.uk/our-product/' },
      { label: 'About us', url: 'https://www.transreport.co.uk/about-us/' },
      { label: 'Case studies', url: 'https://www.transreport.co.uk/case-studies/' },
      //{ label: 'Transreport Japan', url: 'https://www.transreport.co.jp' }  // TO DO opens a new tab
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