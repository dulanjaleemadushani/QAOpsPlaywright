const { test, expect, request } = require('@playwright/test');
const { customtest } = require('../Utils/fixtures');

customtest("Fixtures demo", async ({ authenticatedPage, createOrder,testDataForOrder }) => {
    await authenticatedPage.goto("https://rahulshettyacademy.com/client/");
    //Login to application/Create order and verify if the order is created from History page 
    const orderBtn = authenticatedPage.locator("button[routerlink*='myorders']");
    await orderBtn.click();

    await authenticatedPage.locator("tbody").waitFor();
    console.log("Order ID:", createOrder.orderId);

    await expect(
        authenticatedPage.getByText(createOrder.orderId)
    ).toBeVisible();
    console.log(testDataForOrder.productName);

})