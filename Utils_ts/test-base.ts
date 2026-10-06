

import {test as baseTest} from '@playwright/test';

interface testdataforOrder {
    userName: string;
    password: string;
    productName: string;
    country: string;
}

export const customTest = baseTest.extend<{testdataforOrder:testdataforOrder}>(
    {
    testdataforOrder: {
        userName: "anshika@gmail.com",
        password: "Iamking@000",
        productName: "ZARA COAT 3",
        country: "India"
    }
})