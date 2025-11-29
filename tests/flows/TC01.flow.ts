import {test , expect, Page } from "@playwright/test"
import { LoginPage } from "../pages/Login.page";
import { ProductsPage } from "../pages/Products.page";
import { products } from "../test-data/products";
import { checkoutPage } from "../pages/checkout.page";
import payment from "../test-data/payments.json";
import address from "../test-data/address.json";
import { orderConfirmPage } from "../pages/confirmation.page";

test.describe.serial("TC01 - Simple Flow" , ()=>{
    let page : Page;
    test.beforeAll(async ({browser})=>{
        page = await browser.newPage();
        const login = new LoginPage(page);
        await login.goto();
        await login.logIn(process.env.USER_EMAIL! , process.env.USER_PASSWORD!);
        await page.waitForLoadState('load');
        expect(page.locator('[data-test-id="user-greeting"]')).toContainText("Hi, user");

    })
    test("Add Products" , async ()=>{
        const addProductToCart = new ProductsPage(page);
        const itemsCount = page.locator('[data-test-id="cart-count"]');
        await addProductToCart.cartButton(3);
        expect(itemsCount).toHaveText("1");
        await addProductToCart.cartButton(5);
        expect(itemsCount).toHaveText("2");
        await addProductToCart.cartButton(7);
        expect(itemsCount).toHaveText("3");
        await addProductToCart.cartButton(9);
        expect(itemsCount).toHaveText("4");
        await addProductToCart.cartButton(1);
        expect(itemsCount).toHaveText("5");
        console.log("Total Items : " + await itemsCount.innerText());
        await addProductToCart.checkoutCartButton();
    })


    test("Validate product prices", async () => {
        const productTitles = page.locator('h3.font-semibold');
        const count = await productTitles.count();
        for (let i = 0; i < count; i++) {
            const title = await productTitles.nth(i).innerText();
            const price = await productTitles
                .nth(i)
                .locator('xpath=following-sibling::div[1]')
                .innerText();

            expect(products[title as keyof typeof products]).toBe(price);
            console.log(`✔ ${title} → ${price}`);
        }
        // 1. Get all UI titles
        const uiTitles = await page.locator('h3.font-semibold').allInnerTexts();

        // 2. Use only titles present both in UI and JSON
        const totalJSON = uiTitles
        .map(t => products[t])                           // get price string "$199.99"
        .filter(Boolean)                                 // remove undefined if any mismatch
        .map(p => Number(p.replace(/[^0-9.]/g, "")))     // convert to number
        .reduce((sum, val) => sum + val, 0);

        // 3. Keep dollar sign
        const finalPrice = `$${totalJSON.toFixed(2)}`;
        expect(finalPrice).toBe("$" + totalJSON)
        console.log("Total Based on Visible Items:", finalPrice);
        
    });

    test("Checkout" , async()=>{
        const checkout = new checkoutPage(page);
        await checkout.chekckoutButton();
        await checkout.addShipDetails(
            address.address1.name,
            address.address1.address,
            address.address1.postalCode,
            address.address1.city,
            address.address1.country
        );
        await checkout.addCouponCode("DISCOUNT10");
        await checkout.paymentDetails(
            payment["American Express"].cardNumber,
            payment["American Express"].expiry,
            payment["American Express"].cvv
        );
        await checkout.placeOrder()
        await page.waitForTimeout(5000);
    });

    test("Confirmation" , async ()=>{
        const confirm = new orderConfirmPage(page);
        await confirm.confirmMsg();
        await confirm.getAllItems();
        await confirm.continueShopping();
    })
});