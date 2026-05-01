import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ContactUsPage } from '../pages/ContactUsPage';

test('Contact Form — submit successfully', async ({ page }) => {
  const home = new HomePage(page);
  const contact = new ContactUsPage(page);

  // Navigate to home
  await home.goToHome();

  // Go to Products page
  await home.clickNavigationLabel('Contact us');

  // Fill in the form
  await contact.fillName('Daniel Tester');
  await contact.fillEmail('daniel@example.com');
  await contact.fillSubject('Automation Test');
  await contact.fillMessage('This is a test message from Playwright.');

  // Submit
  await contact.submitForm();

  // Assert success message is visible
  await expect(contact.successMessage()).toBeVisible();
  await expect(contact.successMessage()).toHaveText(
    'Success! Your details have been submitted successfully.'
 );

  await contact.clickHomeButton();
  //await expect(page.getByText('Full-Fledged practice website for Automation Engineers')).toBeVisible()
  await expect(home.isTabActive('Home')).toBeVisible(); //NEED TO FIX: this assertion is not working as expected, it should check if the "Home" tab is active after clicking the Home button, but it seems to be failing. We may need to debug the selector or the logic in the isTabActive method.
});