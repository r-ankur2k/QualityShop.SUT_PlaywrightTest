import { Page } from "@playwright/test";

export class ProductsPage{
    page : Page;
    constructor(page : Page){
        this.page = page;
    }

    async cartButton(productNumber : number){
        const cartButtons = this.page.locator("button[data-test-id^='add-to-cart-']"); 
        await cartButtons.nth(productNumber - 1).click();
    }

    async checkoutCartButton(){
        await this.page.click('[data-test-id="cart-icon"]');
    }

}