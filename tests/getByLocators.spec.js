const {test, expect} = require("@playwright/test");

test("Playwright special locators", async ({page})=>{
// we can add timeout for test levels also  so it dont effect to the globaly 
  const slowExpect = expect.configure({timeout: 9000});
  page.setDefaultTimeout(9000); //this is replace all global and testlevel timeouts without steplevel it cannot replace step level

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Employed").check();

    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button",{name:'Submit'}).click();
    //await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:10_000});//This is a step level timeout added// override the default time out 5000 in step level
    await page.getByRole("link", {name:"Shop"}).click();
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();

});

