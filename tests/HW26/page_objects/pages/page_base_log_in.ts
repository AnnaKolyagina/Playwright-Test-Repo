import { Page } from '@playwright/test';
import { BasePage } from './page_base';
import { Header } from '../elements/header';
import { Footer } from '../elements/footer';

export class BaseLoginPage extends BasePage {
  readonly header: Header;
  readonly footer: Footer;
  
constructor(page: Page, url: string = '') {
   super(page, url);
   this.header = new Header(page);
   this.footer = new Footer(page);   
 }

async logOut() {
   await this.header.burgerMenu.open();
   await this.header.burgerMenu.logout();;    
} 
}