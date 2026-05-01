import { Page } from '@playwright/test';

export class ContactUsPage {
  constructor(private page: Page) {}

  async fillName(name: string) {
    await this.page.getByPlaceholder('Name').fill(name);
  }

  async fillEmail(email: string) {
    //await this.page.getByPlaceholder('Email').fill(email); // <-- matches two elements
    await this.page.locator('.contact-form').getByPlaceholder('Email').fill(email);  // <-- more specific selector to target the correct input
  }

  async fillSubject(subject: string) {
    await this.page.getByPlaceholder('Subject').fill(subject);
  }

  async fillMessage(message: string) {
    await this.page.getByPlaceholder('Your Message Here').fill(message);
  }

  async submitForm() {
    this.page.once('dialog', dialog => dialog.accept());
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  successMessage() {
    return this.page.locator('.status.alert.alert-success');
  }

//  async clickHomeButton() {
//    await this.page.getByRole('link', { name: 'Home' }).click(); // <-- matches two elements
//  }
//}

  async clickHomeButton() {
      //await this.page.getByRole('link', { name: 'Home' }).click(); // <-- matches two elements
      await this.page
      .locator('.contact-form')
      .getByRole('link', { name: 'Home' })
      .click();
  }
}