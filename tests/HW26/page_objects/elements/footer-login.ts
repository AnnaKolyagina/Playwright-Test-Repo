import { Page, Locator, expect } from '@playwright/test';

export class FooterLoginPage {
  readonly page: Page;
  readonly footerBlock: Locator;
  readonly passwordBlock: Locator;

  constructor(page: Page) {
    this.page = page;
    // Находим весь футер, содержащий пользователей
    this.footerBlock = page.locator('text=Accepted usernames are:').locator('..'); // родитель heading
    this.passwordBlock = page.locator('text=Password for all users:').locator('..');
  }

async getAllUsernames(): Promise<string[]> {
  return [
    'standard_user',
    'locked_out_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user',
  ];
}

  async getStandardUser(): Promise<string> {
    const users = await this.getAllUsernames();
    const standard = users.find(u => u === 'standard_user');
    if (!standard) throw new Error('standard_user not found!');
    return standard;
  }

  async getPassword(): Promise<string> {
    await expect(this.passwordBlock).toBeVisible();
    const text = await this.passwordBlock.textContent();
    if (!text) throw new Error('Password block is empty!');
    const parts = text.split(':');
    if (parts.length < 2) throw new Error('Password not found!');
    return parts[1].trim();
  }
}
