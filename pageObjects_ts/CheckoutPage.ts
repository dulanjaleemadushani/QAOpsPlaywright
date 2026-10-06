import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
    
    checkoutbtn:Locator;
    selectCountry:Locator;
    dropdown:Locator;
    emaillocator:Locator;
    placeOrderBtn:Locator;

    constructor(page:Page) {
        this.checkoutbtn = page.locator("text='Checkout'");
        this.selectCountry = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.emaillocator = page.locator(".user__name [type='text']");
        this.placeOrderBtn = page.locator(".action__submit");

    }

    async checkout(country:string) {


        await this.checkoutbtn.click();

        await this.selectCountry.pressSequentially(country, { delay: 150 }); // delay 150 millisecound between each key press

        await this.dropdown.waitFor();


        const optioncount = await this.dropdown.locator("button").count();  // count the options

        for (let i = 0; i < optioncount; ++i) {
            const allcountries:any = await this.dropdown.locator("button").nth(i).textContent();
            if (allcountries.trim() === country) {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }

        //await expect(this.emaillocator.first()).toHaveText(email1);

        await this.placeOrderBtn.click();


    }

}

module.exports = {CheckoutPage}