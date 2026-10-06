const base = require('@playwright/test');
const {APIutils}=require('./APIUtils.js');
const{request}= require("@playwright/test");

const loginplayLoad = {userEmail:"madu123@gmail.com",userPassword:"Abc@1234+"}
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};


exports.customtest = base.test.extend(
    {
        authenticatedPage: async ({ browser }, use) => {
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
            const email = page.locator("#userEmail");
            const password = page.locator("#userPassword");
            const signinBtn = page.locator("#login");
            const carttitle = page.locator(".card-body b");

            await email.fill("anshika@gmail.com");
            await password.fill("Iamking@000");
            await signinBtn.click();
            await page.waitForLoadState("networkidle");
            await use(page);
            //tear down
            await context.close();
        },
        createOrder: async ({ }, use) => {
            const apiContext = await request.newContext();
            const apiUtils = new APIutils(apiContext, loginplayLoad);
            const response = await apiUtils.createOrder(orderPayLoad);
            await use(response);

            await apiContext.dispose();

        },
        testDataForOrder:{ //data driven  
            productName: 'ADIDAS ORIGINAL'
        }
    }
)
