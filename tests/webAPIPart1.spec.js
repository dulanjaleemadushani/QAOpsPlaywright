const{test,expect,request}= require("@playwright/test");
const {APIutils}=require('../Utils/APIUtils');

let response;

const loginplayLoad = {userEmail:"madu123@gmail.com",userPassword:"Abc@1234+"}
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

test.beforeAll( async()=>{
 
   const apiContext = await request.newContext();
   const apiUtils =new APIutils(apiContext,loginplayLoad);
   response =await apiUtils.createOrder(orderPayLoad);
   
});


test("place the order", async ({page})=>{

    page.addInitScript( value =>{
    window.localStorage.setItem('token',value);

    },response.token);


    await page.goto("https://rahulshettyacademy.com/client/");

    const orderBtn = page.locator("button[routerlink*='myorders']");
    await orderBtn.click();

    await page.locator("tbody").waitFor();

    const raws = page.locator("tbody tr");
    const rowCount = await raws.count();


    for(let i=0; i<rowCount; i++){
        const row = raws.nth(i);
        const roworderID   = await row.locator("th").textContent();

        console.log("Expected Order ID:", response.orderId);
        console.log("Current Row Order ID:", roworderID);
        
        if( roworderID?.includes(response.orderId)){
            console.log("Order found");
            await row.locator("button").first().click();
            break;
        }
    }
    await page.locator(".col-text").waitFor();

    const orderIDdetails = await page.locator(".col-text").textContent();
    expect(orderIDdetails).toContain(response.orderId);
   
 

}) 