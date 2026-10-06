// We are planing now all storage sessions cookies all the things copied to the json file and then inject the the browser

//LoginUI --> .json
//test browser --> .json cart order, order details, order history 

const {test, expect} = require('@playwright/test');

let webContext;

test.beforeAll(async({browser})=>
{
    const context =await browser.newContext();
    const page =await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signinBtn = page.locator("#login");


    await email.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await signinBtn.click();
    await page.waitForLoadState("networkidle");
    
    await context.storageState({path:'state.json'}); // we are creating json file in test folder and store storage details in this file we should store it context level not page level
    // Now we should inject this json state file to new context

    webContext= await browser.newContext({storageState: 'state.json'});
});



test("Product add to the cart", async ()=>{

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/")
    const products = page.locator(".card-body b");
    const mainProductBox = page.locator(".card-body");
    const productName = "ZARA COAT 3";

    
    const productCount = await products.count();

    for (let i=0; i<productCount; ++i){
        if(await products.nth(i).textContent() === productName){
            // add to the cart
            await mainProductBox.nth(i).locator("text = Add To Cart").click();
            break;
        }
    }

    const cartElement = page.locator("[routerlink*='cart']");
    await cartElement.click();
    await page.locator("div li").first().waitFor();
    const bool= page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect (await bool).toBeTruthy();

    const checkoutbtn = page.locator("text='Checkout'");
    await checkoutbtn.click();

    const selectCountry = page.locator("[placeholder*='Country']");
    await selectCountry.pressSequentially("Ind", {delay:150}); // delay 150 millisecound between each key press

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    const optioncount = await dropdown.locator("button").count();  // count the options

    for (let i=0; i<optioncount; ++i){
        const allcountries = await dropdown.locator("button").nth(i).textContent();
        if(allcountries=== " India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    const email1 = "anshika@gmail.com";
    const emaillocator = page.locator(".user__name [type='text']");

    await expect(emaillocator.first()).toHaveText(email1);
    const placeOrderBtn = page.locator(".action__submit");
    await placeOrderBtn.click();

    const txtmsg = page.locator(".hero-primary");
    const thnksmsg = " Thankyou for the order. ";
    await expect(txtmsg).toHaveText(thnksmsg);

    const orderIDLocator = page.locator(".em-spacer-1 .ng-star-inserted");
    const orderId = await orderIDLocator.textContent();
    const cleanOrderId = orderId.replace(/\|/g, "").trim();

    console.log(cleanOrderId);

    const orderBtn = page.locator("button[routerlink*='myorders']");
    await orderBtn.click();

    await page.locator("tbody").waitFor();

    const raws = page.locator("tbody tr");
    const rowCount = await raws.count();


    for(let i=0; i<rowCount; i++){
        const row = raws.nth(i);
        const roworderID   = await row.locator("th").textContent();

        console.log("Expected Order ID:", cleanOrderId);
        console.log("Current Row Order ID:", roworderID);
        
        if( roworderID?.includes(cleanOrderId)){
            console.log("Order found");
            await row.locator("button").first().click();
            break;
        }
    }
    await page.locator(".col-text").waitFor();

    const orderIDdetails = await page.locator(".col-text").textContent();
    expect(orderIDdetails).toContain(cleanOrderId);
   

})

test("Testcase-2",async()=>
{
    const page =await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.waitForLoadState("networkidle");
    const products = page.locator(".card-body b");
    await products.first().waitFor();
    const title =await products.allTextContents();
    console.log(title);
});