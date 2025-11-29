import { Page , expect} from "@playwright/test";


export class LoginPage {
    readonly page;
  constructor(page : Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL!); 
  }

  async logIn(userEmail : string , userPass: string){
    await this.page.fill("#login-email", userEmail);
    await this.page.fill("[data-test-id='input-password']", userPass);
    await this.page.click("[data-test-id='auth-submit-btn']");
  }
}