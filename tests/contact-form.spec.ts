import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ContactUsPage } from '../pages/ContactUsPage';

test('Contact Form — submit successfully', async ({ page }) => {
  const home = new HomePage(page);
  const contact = new ContactUsPage(page);

  await test.step('Navigate to Contact Us page', async () => {
    await home.goToHome();
    await home.clickNavigationLabel('Contact us');
  });

  await test.step('Fill in contact form', async () => {
    await contact.fillName('Daniel Tester');
    await contact.fillEmail('daniel@example.com');
    await contact.fillSubject('Automation Test');
    await contact.fillMessage('This is a test message from Playwright.');
  });

  await test.step('Submit form and verify success message', async () => {
    await contact.submitForm();
    await expect(contact.successMessage()).toBeVisible();
    await expect(contact.successMessage()).toHaveText(
      'Success! Your details have been submitted successfully.'
    );
  });

  // Future validation ideas to implement:
  // - Verify Home button returns user to Home page
  // - Assert Home page text is visible
  // - Assert Home tab is active after navigation
  
  // await contact.clickHomeButton();
  // await expect(page.getByText('Full-Fledged practice website for Automation Engineers')).toBeVisible();
  // await expect(home.isTabActive('Home')).toBeVisible();
});