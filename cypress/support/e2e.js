// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "cypress-xpath";
import addContext from "mochawesome/addContext";

Cypress.on("uncaught:exception", (err) => {
  console.log(err);
  return false;
});

Cypress.on("test:after:run", (test, runnable) => {
  if (test.state === "failed") {
    const screenshot = `assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;
    addContext({ test }, screenshot);
  }
});

// Cypress.on("test:after:run", (test, runnable) => {
//   if (test.state === "failed") {
//     const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`;
//     const screenshotPath = `cypress/screenshots/${Cypress.spec.name}/${screenshotFileName}`;

//     Cypress.env("mochawesome_screenshots", Cypress.env("mochawesome_screenshots") || []);
//     Cypress.env("mochawesome_screenshots").push({
//       testTitle: test.title,
//       path: screenshotPath,
//     });

//     // Log the screenshot path for debugging
//     console.log(`Screenshot captured for failed test: ${screenshotPath}`);
//   }
// });
