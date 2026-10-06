class DashboardPage {

    constructor(page) {
        this.products = page.locator(".card-body b");
        this.mainProductBox = page.locator(".card-body");
        this.cartElement = page.locator("[routerlink*='cart']");

    }


    async searchProduct(productName) {

        const productCount = await this.products.count();

        for (let i = 0; i < productCount; ++i) {
            if (await this.products.nth(i).textContent() === productName) {
                // add to the cart
                await this.mainProductBox.nth(i).locator("text = Add To Cart").click();
                break;
            }
        }
    }

    async gotoCart() {
        await this.cartElement.click();

    }

} 

module.exports ={DashboardPage}