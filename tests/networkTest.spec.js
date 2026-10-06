const{test,expect,request}= require("@playwright/test");
const {APIutils}=require('../Utils/APIUtils');

let response;

const loginplayLoad = {userEmail:"madu123@gmail.com",userPassword:"Abc@1234+"}
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

const fakePayLoad = {data:[],message:"No Orders"}

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

    // for intercepting purpose -- we should first route 
    // Intercepting response, - API response --> browser --> render data on front end 

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route =>{
            // Intercepting response, - API response -->{playwright fake Response}--> browser --> render data on front end 
             
            //let body= fakePayLoad;  // fakepayload is in Javascript object format so we need to convert it to json format
            let body= JSON.stringify(fakePayLoad);
            await route.fulfill(
                {
                    status: 200,
                    contentType: "application/json",
                    body, 

                })

        }
    );

    page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');

    const orderBtn = page.locator("button[routerlink*='myorders']");
    //await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
    await orderBtn.click();
   
    console.log(await page.locator(".mt-4").textContent());


}) 