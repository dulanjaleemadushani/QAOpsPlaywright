const base = require('@playwright/test');

exports.customTest = base.test.extend({
    testdataforOrder: {
        userName: "anshika@gmail.com",
        password: "Iamking@000",
        productName: "ZARA COAT 3",
        country: "India"
    }
})