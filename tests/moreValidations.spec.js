const {test, expect} = require('@playwright/test');

// If we want to run the test parelly add below code

test.describe.configure({mode:'parallel'});

test("Page backward forward", async ({page})=>{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await page.goto("https://www.google.com/");
await page.goBack(); // go back to prevoiuse page
//await page.goForward(); // go forward next page
await expect(page.locator('#displayed-text')).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator('#displayed-text')).toBeHidden();

// Alert haddle -- in playwright it called dialog---
page.on("dialog", dialog => dialog.accept()); // this is going to okey the dialog ** we should do it previously dialog
await page.locator("#confirmbtn").click(); 
//page.on("dialog", dialog => dialog.dismiss()); // this is going to cancel the dialog 

// hover action
await page.locator("#mousehover").hover();

//Iframe handle

const framsPage = page.frameLocator("#courses-iframe");  // first we need to switch to the Iframe
await framsPage.locator("li a[href*='lifetime-access']:visible").click();
const text = await framsPage.locator(".text h2").textContent();
console.log(text.split(" ")[1]); // break into pieases using spaces 

});

//screenshot ---> store -----> screenshot   (screenshot comparison)

test("visual",async({page})=>{
    await page.goto("https://google.com/");
    expect(await page.screenshot()).toMatchSnapshot("landing.png");

})

