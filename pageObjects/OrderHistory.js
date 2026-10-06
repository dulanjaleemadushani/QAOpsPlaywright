const { expect } = require("@playwright/test");


class OrderHistory {

    constructor(page) {
        this.page = page
        this.txtmsg = page.locator(".hero-primary");
        this.orderIDLocator = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderBtn = page.locator("button[routerlink*='myorders']");
        this.raws = page.locator("tbody tr");


    }

    async verifywithThanxMsg() {
        const thnksmsg = " Thankyou for the order. ";
        await expect(this.txtmsg).toHaveText(thnksmsg);

    }

    async navigatetoOrderHistoryPage() {

        const orderId = await this.orderIDLocator.textContent();
        const cleanOrderId = orderId.replace(/\|/g, "").trim();
        console.log(cleanOrderId);
        return cleanOrderId;


    }

    async verifyOrderIdisCorrect(cleanOrderId) {
        await this.orderBtn.click();

        await this.page.locator("tbody").waitFor();
        const rowCount = await this.raws.count();

        for (let i = 0; i < rowCount; i++) {
            const row = this.raws.nth(i);
            const roworderID = await row.locator("th").textContent();

            console.log("Expected Order ID:", cleanOrderId);
            console.log("Current Row Order ID:", roworderID);

            if (roworderID?.includes(cleanOrderId)) {
                console.log("Order found");
                await row.locator("button").first().click();
                break;
            }
        }
        await this.page.locator(".col-text").waitFor();

        const orderIDdetails = await this.page.locator(".col-text").textContent();
        expect(orderIDdetails).toContain(cleanOrderId);

    }


}

module.exports = {OrderHistory}




















