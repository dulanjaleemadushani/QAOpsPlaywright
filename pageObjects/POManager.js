const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CheckoutPage} = require('./CheckoutPage');
const {OrderHistory} = require('./OrderHistory');


class POManager{

constructor(page){
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