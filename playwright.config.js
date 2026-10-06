// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({

  testDir: './tests',
  testMatch:'**/*.spec.js',
  retries:1,
  /* Run tests in files in parallel */
  timeout:40 *1000, // maximum time one test can run for
  expect: {
    timeout: 40 * 1000, // use this for assertions 
  },

reporter:'html',
projects:[{
  name:'Chrome',
  use: {
   
    browserName : 'chromium', 
    headless:false,
    actionTimeout: 10*1000,
    navigationTimeout: 30*1000,
    screenshot:'on',
    //trace: 'retain-on-failur',
    trace : 'on',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
   
  },

},]


  

});
module.exports = config