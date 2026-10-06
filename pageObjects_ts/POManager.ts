import { expect, type Locator, type Page } from '@playwright/test';

import {LoginPage} from './LoginPage';

import {DashboardPage} from './DashboardPage';

import {CheckoutPage} from './CheckoutPage';

import {OrderHistory} from './OrderHistory';


export class POManager{
    page:Page;
    
    dashboard:DashboardPage;
    loginpage:LoginPage;
    checkoutpage:CheckoutPage;
    orderHistoryPage:OrderHistory;


constructor(page:Page){
    this.page = page
    this.dashboard = new DashboardPage(this.page);
    this.loginpage = new LoginPage(this.page);
    this.checkoutpage = new CheckoutPage(this.page);
    this.orderHistoryPage = new OrderHistory(this.page);

}


getLoginPage(){
    return this.loginpage
}

getDashboardPage(){
    return this.dashboard
}

getCheckoutPage(){
    return this.checkoutpage 
}

getOrderHistoryPage(){
    return this.orderHistoryPage
}


}
module.exports = {POManager}