import { Locator, Page } from "@playwright/test";
//этот файл гоыорит нам, где находятся элементы футера и что с ними можно сделать
export class Footer {
//мы сначала находим весь футер
// потом ищем всё внутри него
// private:
// снаружи никто не должен к нему обращаться
// это внутренняя деталь
// readonly:
// после создания нельзя переписать  
  private readonly footerContainer: Locator;
  readonly socialIconLinks: Locator;
  readonly copyRightText: Locator;
  readonly socialIconTwitter: Locator;
  readonly socialIconFacebook: Locator;
  readonly socialIconLinkedin: Locator;
//конструктор вызовется когда мы в тесте напишем new Footer(page) 
  constructor(page: Page) {
    this.footerContainer = page.locator('[data-test="footer"]');
    this.socialIconLinks = this.footerContainer.locator('.social a');
    this.socialIconTwitter = this.socialIconLinks.locator('[data-test="social-twitter"]');
    this.socialIconFacebook = this.socialIconLinks.locator('[data-test="social-facebook"]');
    this.socialIconLinkedin = this.socialIconLinks.locator('[data-test="social-linkedin"]');
    this.copyRightText = this.footerContainer.locator('[data-test="footer-copy"]');
  }
//this.copyRightText.textContent()
// Playwright читает текст из DOM
// await
// ждём, пока браузер его вернёт
// ?? ''
// если текста нет → вернётся пустая строка
// Это защита от null
  // async getCopyrightText(): Promise<string> {
  //   return (await this.copyRightText.textContent()) ?? '';
  // }

  // async clickTwitter() {
  //   await this.socialIconTwitter.click();
  // }

  // async clickFacebook() {
  //   await this.socialIconFacebook.click();
  // }

  // async clickLinkedin() {
  //   await this.socialIconLinkedin.click();
  // }
}