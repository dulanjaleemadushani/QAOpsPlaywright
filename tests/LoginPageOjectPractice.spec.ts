
import { test, expect } from '@playwright/test';
import { POManager } from '../pageObjects_ts/POManager';
import dataSet from "../Utils_ts/pageObjecttesttestData.json";
import { customTest } from '../Utils_ts/test-base'


for (const data of dataSet) {
    test(`verify Client App Login for ${data.productName}`, async ({ page }) => {
        const poManager = new POManager(page);


        const carttitle = page.locator(".card-body b");
        const loginpage = poManager.getLoginPage();

        await loginpage.goToURL();
        await loginpage.validLogin(data.userName, data.password);

        await carttitle.first().waitFor(); // this is alternative
        const alltexttitle = await carttitle.allTextContents();
        console.log(alltexttitle);

    })

    test(`OrderplaceandVerify ${data.productName}`, async ({ page }) => {

        const poManager = new POManager(page);
        const dashboard = poManager.getDashboardPage();
        const loginpage2 = poManager.getLoginPage();




        await loginpage2.goToURL();
        await loginpage2.validLogin(data.userName, data.password);

        await dashboard.searchProduct(data.productName);
        await dashboard.gotoCart();

        await page.locator("div li").first().waitFor();
        const bool = page.locator("h3:has-text('" + data.productName + "')").isVisible();
        expect(await bool).toBeTruthy();

        //Checkout Page

        const checkoutpage = poManager.getCheckoutPage();
        await checkoutpage.checkout(data.country);

        //Thankyou page
        const orderverify = poManager.getOrderHistoryPage();
        await orderverify.verifywithThanxMsg();
        const cleanOrderId = await orderverify.navigatetoOrderHistoryPage();
        await orderverify.verifyOrderIdisCorrect(cleanOrderId);


    })
}

// using test-base file -- this is creating custom features file and get testdata 
customTest("OrderPlace", async ({ page, testdataforOrder }) => {

    const poManager = new POManager(page);
    const dashboard = poManager.getDashboardPage();
    const loginpage2 = poManager.getLoginPage();

    await loginpage2.goToURL();
    await loginpage2.validLogin(testdataforOrder.userName, testdataforOrder.password);

    await dashboard.searchProduct(testdataforOrder.productName);
    await dashboard.gotoCart();

    const product = page.locator(
        `h3:has-text("${testdataforOrder.productName}")`
    );

    await expect(product).toBeVisible();
})
