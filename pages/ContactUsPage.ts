import { Page } from '@playwright/test';

export class ContactUsPage {
  private nameInput;
  private emailInput;
  private subjectInput;
  private messageInput;
  private submitButton;
  private successAlert;

  constructor(private page: Page) {
    this.nameInput = page.locator('[data-qa="name"]');
    this.emailInput = page.locator('[data-qa="email"]');
    this.subjectInput = page.locator('[data-qa="subject"]');
    this.messageInput = page.locator('[data-qa="message"]');
    this.submitButton = page.locator('[data-qa="submit-button"]');
    this.successAlert = page.locator('.status.alert.alert-success');
  }

  async fillName(name: string) {
    await this.nameInput.fill(name);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillSubject(subject: string) {
    await this.subjectInput.fill(subject);
  }

  async fillMessage(message: string) {
    await this.messageInput.fill(message);
  }

  async submitForm() {
    this.page.once('dialog', dialog => dialog.accept());
    await this.submitButton.click();
  }

  successMessage() {
    return this.successAlert;
  }

  async clickHomeButton() {
    //await this.page.getByRole('link', { name: 'Home' }).click(); // Didn't use this as matches two elements
    await this.page
      .locator('.contact-form')
      .getByRole('link', { name: 'Home' })
      .click();
  }
}