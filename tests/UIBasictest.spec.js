const {test, expect}= require('@playwright/test');
const { only } = require('node:test');

test.describe.configure({mode:'parallel'});

test ('Browser context playwrite test', async ({browser})=>{ // anonymouse funtion ** no funtion name we can write it using arrow funtion  
const context = await browser.newContext(); // open new incongnitive browser
const page = await context.newPage(); // open new tab in browser

// block some features (images/css styles)
//page.route("**/*.{jpg,png,jpeg}",route=> route.abort());
await page.goto("https://www.google.com/?hl=de")
await expect(page).toHaveTitle("Google");

});

test ('@WEB  page playwright test', async ({page})=>{
const userName = page.locator('input#username');
const password =  page.locator('#password');
const signIn = page.locator('[name="signin"]');
const cardTitle = page.locator(".card-body a");
// block some features (images/css styles)
page.route("**/*.{jpg,png,jpeg}",route=> route.abort());
await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // go to the URL direct using page playwright feature
console.log(await page.title());
await userName.fill("rahulshetty");
await password.fill("Learning@830$3mK2");
await signIn.click();
//console.log(await page.locator("[style*='block']").textContent("incorrectt"));
await expect(page.locator("[style*='block']")).toContainText("Incorrect");
await userName.fill("");
await userName.fill("rahulshettyacademy");
await signIn.click();
console.log(await cardTitle.nth(0).textContent("iphone X"));
//await expect(page.locator(".card-body a").nth(0).toContainText("iphone X")); // this is not work code
});

test("@WEB UI controls", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // go to the URL direct using page playwright feature
    const userName = page.locator('input#username');
    const password =  page.locator('#password');
    const dropdown = page.locator("select.form-control") // dropdown locator 
    const radioBtn = page.locator(".radiotextsty");
    const clickOkbtn = page.locator("#okayBtn");
    const checkbox = page.locator("#terms");
    const documentlink = page.locator("[href*='documents-request']");

    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await dropdown.selectOption("consult"); // dropdown select
    await radioBtn.last().click();
    console.log(await radioBtn.last().isChecked()); // 
    await expect(radioBtn.last()).toBeChecked();
    await clickOkbtn.click();

    await checkbox.click(); // check box clicked
    await expect (checkbox).toBeChecked(); //verify the check box is already checked
    await checkbox.uncheck(); // then unchecked the checkbox
    await expect(checkbox).not.toBeChecked();
    await expect(documentlink).toHaveAttribute("class","blinkingText"); // verify with the attribute of the page blinking link

// we are going to capture elements in new opening form 
//await page.pause(); // stop the window close 

})

test("Child windows handle", async({browser})=>{

    const context = await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const documentlink = page.locator("[href*='documents-request']");

    // All promises work pareraly to fulfill the promises
    const [newPage] = await Promise.all ([
    context.waitForEvent('page'),
    documentlink.click()]);

    //write down the next step in the new page 

    const textPrint = newPage.locator(".red"); // locator
    const textcontent =await textPrint.textContent(); // full text got
    const arrayText =textcontent.split("@"); // split it by @
    const domain =arrayText[1].split(" ")[0]; // again slpit only domain name 
    //console.log(domain);

    const userName = page.locator('input#username');
    await userName.fill(domain);
    await expect(userName).toHaveValue(domain); // entered value verify in the field
});