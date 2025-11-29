import { Page } from "@playwright/test";

export class checkoutPage{
    page : Page;
    constructor(page :Page){
        this.page =page;
    }

    async chekckoutButton(){
        await this.page.click('[data-test-id="checkout-btn"]');
    }

    async addShipDetails(
        name : string , address : string , 
        postalCode : string , city : string , 
        coutry : string){

        await this.page.fill('[data-test-id="ship-name"]', name);
        await this.page.fill('[data-test-id="ship-address"]' , address);
        await this.page.fill('[data-test-id="ship-city"]', city);
        await this.page.fill('[data-test-id="ship-postal"]', postalCode);
        await this.page.fill('[data-test-id="ship-country"]', coutry);
    }

    async addCouponCode(code : string){
        await this.page.fill('[data-test-id="coupon-code"]' , code);
        await this.page.click('[data-test-id="apply-coupon-btn"]');
    }

    async paymentDetails(cardNumber: string , expiry : string , cvv : string){
        await this.page.fill('[data-test-id="card-number"]' , cardNumber);
        await this.page.fill('[data-test-id="card-exp"]' , expiry);
        await this.page.fill('[data-test-id="card-cvv"]' , cvv);
    }

    async placeOrder(){
        await this.page.click('[data-test-id="place-order-btn"]');
    }

}