import { test as base, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/Login.page";
import { ProductsPage } from "../pages/Products.page";
import { checkoutPage } from "../pages/checkout.page";
import { orderConfirmPage } from "../pages/confirmation.page";
import { products } from "../test-data/products";
import payment from "../test-data/payments.json";
import address from "../test-data/address.json";

/**
 * Full fixture typings
 */
type Fixtures = {
  createPage: Page;
  doLogin: Page;

  productsPage: ProductsPage;
  checkoutPage: checkoutPage;
  confirmPage: orderConfirmPage;

  addProduct: (i: number) => Promise<void>;
  goToCheckoutFromCart: () => Promise<void>;

  getUiProducts: ReturnType<Page["locator"]>;
  matchPrice: (title: string) => string | undefined;

  clickCheckout: () => Promise<void>;
  fillShipping: () => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  pay: () => Promise<void>;
  placeOrder: () => Promise<void>;

  confirmMessage: () => Promise<void>;
  getOrderItems: () => Promise<void>;
  continueShopping: () => Promise<void>;
};

/**
 * Fixture implementation
 */
export const test = base.extend<Fixtures>({

  // PAGE
  createPage: async ({ browser }, use) => {
    const page = await browser.newPage();
    await use(page);
    await page.close();
  },

  // LOGIN
  doLogin: async ({ createPage }, use) => {
    const page = createPage;
    const login = new LoginPage(page);

    await login.goto();
    await login.logIn(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

    await expect(page.locator('[data-test-id="user-greeting"]'))
      .toHaveText(/Hi,/);

    await use(page);
  },

  // PAGE OBJECTS
  productsPage: async ({ doLogin }, use) => {
    await use(new ProductsPage(doLogin));
  },

  checkoutPage: async ({ doLogin }, use) => {
    await use(new checkoutPage(doLogin));
  },

  confirmPage: async ({ doLogin }, use) => {
    await use(new orderConfirmPage(doLogin));
  },

  // PRODUCT OPERATIONS
  addProduct: async ({ productsPage }, use) => {
    await use(async (i: number) => {
      await productsPage.cartButton(i);
    });
  },

  goToCheckoutFromCart: async ({ productsPage }, use) => {
    await use(async () => {
      await productsPage.checkoutCartButton();
    });
  },

  // PRICE VALIDATION
  getUiProducts: async ({ doLogin }, use) => {
    const locator = doLogin.locator("h3.font-semibold");
    await use(locator);
  },

  matchPrice: async ({}, use) => {
    await use((title: string) => products[title]);
  },

  // CHECKOUT FLOW
  clickCheckout: async ({ checkoutPage }, use) => {
    await use(async () => {
      await checkoutPage.chekckoutButton();
    });
  },

  fillShipping: async ({ checkoutPage }, use) => {
    await use(async () => {
      const a = address.address1;
      await checkoutPage.addShipDetails(
        a.name,
        a.address,
        a.postalCode,
        a.city,
        a.country
      );
    });
  },

  applyCoupon: async ({ checkoutPage }, use) => {
    await use(async (code: string) => {
      await checkoutPage.addCouponCode(code);
    });
  },

  pay: async ({ checkoutPage }, use) => {
    await use(async () => {
      const card = payment["American Express"];
      await checkoutPage.paymentDetails(
        card.cardNumber,
        card.expiry,
        card.cvv
      );
    });
  },

  placeOrder: async ({ checkoutPage }, use) => {
    await use(async () => {
      await checkoutPage.placeOrder();
    });
  },

  // CONFIRMATION PAGE
  confirmMessage: async ({ confirmPage }, use) => {
    await use(async () => {
      await confirmPage.confirmMsg();
    });
  },

  getOrderItems: async ({ confirmPage }, use) => {
    await use(async () => {
      await confirmPage.getAllItems();
    });
  },

  continueShopping: async ({ confirmPage }, use) => {
    await use(async () => {
      await confirmPage.continueShopping();
    });
  }
});
