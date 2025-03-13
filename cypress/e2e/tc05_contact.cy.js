/// <reference types="cypress" />

import ContactPage from "../pages/ContactPage";

describe("Contact Us Page Tests", () => {
  beforeEach(() => {
    cy.visit("https://www.demoblaze.com/index.html");
  });

  it("Verify Contact Us Form Submission", () => {
    ContactPage.openContactUs();
    ContactPage.fillContactForm("ram@gmail.com", "Ram", "This is a test message.");
    ContactPage.submitContactForm();
  });
});
