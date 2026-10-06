import { expect, type Locator, type Page } from '@playwright/test';

let message1:string ="hello";
message1:25;

console.log(message1);

let age:number =32;
let isactive : boolean = true;

let numberArray:number[] = [1,3.6]

let data : any = "dfssdfd"
data=45;


// there is a function we can express like this way

function add (a:number,b:number): number
{
    return a+b;
}

add(2,6);


let user:{name:string,age:number,location:string} = {name:"Bob", age:34,location:"Germany"};

user.location = "Greifswald";

console.log(user);


class LoginPage{
    page:Page;
    email:Locator;
    password:Locator;
    signinBtn:Locator;



constructor(page:Page){
    this.page = page
    this. email = page.locator("#userEmail");
    this. password = page.locator("#userPassword");
    this.signinBtn = page.locator("#login");

}

async goToURL(){
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
}

async validLogin(username:string,password:any){  
    await this.email.fill(username);
    await this.password.fill(password);
    await this.signinBtn.click();
    await this.page.waitForLoadState("networkidle");
}

}