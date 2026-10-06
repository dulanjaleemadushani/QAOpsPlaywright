
// Preconditions data creation here  login and Order creation through API command

export class APIutils{
    apiContext:any;
    loginplayLoad:string;


    constructor(apiContext:any,loginplayLoad:string){
        this.apiContext = apiContext;
        this.loginplayLoad = loginplayLoad;


    }

   async  getToken(){

        const loginResponse =await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
                {
                    data:this.loginplayLoad,
                }
            )
            // 200,201
            //expect(loginResponse.ok()).toBeTruthy();
            const loginResponseJson =await loginResponse.json();
            const token =await loginResponseJson.token;
            console.log(token);
            return token;
        
        
    }

    async createOrder(orderplayload:string){
        let response ={token:String,orderId:String}
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data:orderplayload,
        headers:{
            'Authorization': response.token,
            'Content-Type' :'application/json'
        }

    }); 
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson)
    const orderId = orderResponseJson.orders[0];
    response.orderId = orderId;
    return response;
    }

}

module.exports = {APIutils}; // this class should be export to public then can any file can access this class