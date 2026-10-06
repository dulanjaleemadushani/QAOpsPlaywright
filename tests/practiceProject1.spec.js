const {test, expect} = require('@playwright/test');
const { log } = require('node:console');

test("verify with the user login", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signinBtn = page.locator("#login");
    const carttitle = page.locator(".card-body b");

    await email.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await signinBtn.click();
    await page.waitForLoadState("networkidle"); // if this is not work we can use alternative 
    await carttitle.first().waitFor(); // this is alternative
    //console.log(await carttitle.nth(0).textContent("ADIDAS ORIGINAL"));
    const alltexttitle = await carttitle.allTextContents();
    console.log (alltexttitle);

})

test("Product add to the cart", async ({page})=>{
 await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signinBtn = page.locator("#login");

    const products = page.locator(".card-body b");
    const mainProductBox = page.locator(".card-body");
    const productName = "ZARA COAT 3";

    await email.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await signinBtn.click();

    await page.waitForLoadState("networkidle");
    //await products.first().waitFor();
    //const title =await products.allTextContents();
   // console,log(title);


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


    //const tblbodyorderCoulm = page.locator("tbody tr th");

    

    //const orderID = "6a915ab021054ba465f9ad2d";

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