# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UIBasictest.spec.js >> UI controls
- Location: tests\UIBasictest.spec.js:38:1

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('#terms')
    - locator resolved to <input id="terms" name="terms" type="checkbox"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="myModal" class="modal fade show">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="myModal" class="modal fade show">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    18 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="myModal" class="modal fade show">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - link "Free Access to InterviewQues/ResumeAssistance/Material" [ref=e3] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/documents-request
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e4] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
  - generic [ref=e5]:
    - heading [level=3] [ref=e6]
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]: "Username:"
        - textbox "Username:" [ref=e17]: rahulshettyacademy
      - generic [ref=e18]:
        - generic [ref=e19]: "Password:"
        - textbox "Password:" [ref=e20]: Learning@830$3mK2
      - generic [ref=e22]:
        - generic [ref=e23] [cursor=pointer]:
          - text: Admin
          - radio "Admin" [ref=e24]
        - generic [ref=e26] [cursor=pointer]:
          - text: User
          - radio "User" [checked] [ref=e27]
      - combobox [ref=e30]:
        - option "Student"
        - option "Teacher"
        - option "Consultant" [selected]
      - generic [ref=e31]:
        - generic [ref=e32]:
          - checkbox "I Agree to the terms and conditions" [ref=e34]
          - generic [ref=e35]:
            - text: I Agree to the
            - link "terms and conditions" [ref=e36] [cursor=pointer]:
              - /url: "#"
        - button "Sign In" [ref=e37] [cursor=pointer]
      - paragraph [ref=e39]:
        - text: (username is
        - generic [ref=e40]: rahulshettyacademy
        - text: and Password is
        - generic [ref=e41]: Learning@830$3mK2
        - text: )
  - generic [ref=e43]:
    - paragraph [ref=e45]: You will be limited to only fewer functionalities of the app. Proceed?
    - generic [ref=e46]:
      - button "Cancel" [ref=e47] [cursor=pointer]
      - button "Okay" [active] [ref=e48] [cursor=pointer]
```

# Test source

```ts
  1  | const {test, expect}= require('@playwright/test');
  2  | const { only } = require('node:test');
  3  | 
  4  | test.describe.configure({mode:'parallel'});
  5  | 
  6  | test ('Browser context playwrite test', async ({browser})=>{ // anonymouse funtion ** no funtion name we can write it using arrow funtion  
  7  | const context = await browser.newContext(); // open new incongnitive browser
  8  | const page = await context.newPage(); // open new tab in browser
  9  | 
  10 | // block some features (images/css styles)
  11 | //page.route("**/*.{jpg,png,jpeg}",route=> route.abort());
  12 | await page.goto("https://www.google.com/?hl=de")
  13 | await expect(page).toHaveTitle("Google");
  14 | 
  15 | });
  16 | 
  17 | test ('page playwright test', async ({page})=>{
  18 | const userName = page.locator('input#username');
  19 | const password =  page.locator('#password');
  20 | const signIn = page.locator('[name="signin"]');
  21 | const cardTitle = page.locator(".card-body a");
  22 | // block some features (images/css styles)
  23 | page.route("**/*.{jpg,png,jpeg}",route=> route.abort());
  24 | await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // go to the URL direct using page playwright feature
  25 | console.log(await page.title());
  26 | await userName.fill("rahulshetty");
  27 | await password.fill("Learning@830$3mK2");
  28 | await signIn.click();
  29 | //console.log(await page.locator("[style*='block']").textContent("incorrectt"));
  30 | await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  31 | await userName.fill("");
  32 | await userName.fill("rahulshettyacademy");
  33 | await signIn.click();
  34 | console.log(await cardTitle.nth(0).textContent("iphone X"));
  35 | //await expect(page.locator(".card-body a").nth(0).toContainText("iphone X")); // this is not work code
  36 | });
  37 | 
  38 | test("UI controls", async ({page})=>{
  39 |     await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // go to the URL direct using page playwright feature
  40 |     const userName = page.locator('input#username');
  41 |     const password =  page.locator('#password');
  42 |     const dropdown = page.locator("select.form-control") // dropdown locator 
  43 |     const radioBtn = page.locator(".radiotextsty");
  44 |     const clickOkbtn = page.locator("#okayBtn");
  45 |     const checkbox = page.locator("#terms");
  46 |     const documentlink = page.locator("[href*='documents-request']");
  47 | 
  48 |     await userName.fill("rahulshettyacademy");
  49 |     await password.fill("Learning@830$3mK2");
  50 |     await dropdown.selectOption("consult"); // dropdown select
  51 |     await radioBtn.last().click();
  52 |     console.log(await radioBtn.last().isChecked()); // 
  53 |     await expect(radioBtn.last()).toBeChecked();
  54 |     await clickOkbtn.click();
  55 | 
> 56 |     await checkbox.click(); // check box clicked
     |                    ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  57 |     await expect (checkbox).toBeChecked(); //verify the check box is already checked
  58 |     await checkbox.uncheck(); // then unchecked the checkbox
  59 |     await expect(checkbox).not.toBeChecked();
  60 |     await expect(documentlink).toHaveAttribute("class","blinkingText"); // verify with the attribute of the page blinking link
  61 | 
  62 | // we are going to capture elements in new opening form 
  63 | //await page.pause(); // stop the window close 
  64 | 
  65 | })
  66 | 
  67 | test("Child windows handle", async({browser})=>{
  68 | 
  69 |     const context = await browser.newContext();
  70 |     const page= await context.newPage();
  71 |     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  72 | 
  73 |     const documentlink = page.locator("[href*='documents-request']");
  74 | 
  75 |     // All promises work pareraly to fulfill the promises
  76 |     const [newPage] = await Promise.all ([
  77 |     context.waitForEvent('page'),
  78 |     documentlink.click()]);
  79 | 
  80 |     //write down the next step in the new page 
  81 | 
  82 |     const textPrint = newPage.locator(".red"); // locator
  83 |     const textcontent =await textPrint.textContent(); // full text got
  84 |     const arrayText =textcontent.split("@"); // split it by @
  85 |     const domain =arrayText[1].split(" ")[0]; // again slpit only domain name 
  86 |     //console.log(domain);
  87 | 
  88 |     const userName = page.locator('input#username');
  89 |     await userName.fill(domain);
  90 |     await expect(userName).toHaveValue(domain); // entered value verify in the field
  91 | });
```