import { Locator, Page } from '@playwright/test';

export class LoginPage{
    page:Page;
    email:Locator;
    password:Locator;
    signinBtn:Locator;

constructor(page:Page){
    this.page = page
    this. email = page.locator("#userEmail");
    this. password = page.locator("#userPassword");
    this.signinBtn = page.locator("#login");

}

async goToURL(){
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
}

async validLogin(username:string,password:string){  
    await this.email.fill(username);
    await this.password.fill(password);
    await this.signinBtn.click();
    await this.page.waitForLoadState("networkidle");
}

}

module.exports = {LoginPage}