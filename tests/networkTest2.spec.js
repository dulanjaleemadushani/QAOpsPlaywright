const {test,expect}= require("@playwright/test");

test("Security test request intercept",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signinBtn = page.locator("#login");
    const carttitle = page.locator(".card-body b");

    await email.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await signinBtn.click();
    await page.waitForLoadState("networkidle"); // if this is not work we can use alternative 
    await carttitle.first().waitFor();

    const orderBtn = page.locator("button[routerlink*='myorders']");
    await orderBtn.click();

    // this is doing correct order iD manupulated and send fake id to click view button

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'}))
    await page.locator("button:has-text('View')").first().click();
    await page.pause();


})