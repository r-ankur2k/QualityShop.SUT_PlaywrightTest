import { Page } from "@playwright/test";

export class orderConfirmPage{
    page:Page;
    constructor(page : Page){
        this.page = page;
    }
    
    async getOrderId(){
        await this.page.locator("span.font-mono").innerText();
    }

    async downloadInvoice(){
        await this.page.click('[data-test-id="download-invoice"]');
    }

    async viewOrders(){
        await this.page.click('[data-test-id="view-orders"]');
    }

    async continueShopping(){
        await this.page.click('[data-test-id="continue-shopping"]');
    }

    async getAllItems(){
        const allItems =await this.page.locator('.list-disc.pl-6 li').allInnerTexts();
        console.log(allItems);
        
    }

    async confirmMsg(){
        const confirmation = this.page.locator("div.text-lg.font-bold");
        console.log(await confirmation.innerText());
        
    }
}