/// <reference types="cypress" />

import AboutPage from "../pages/AboutPage";

describe("About Us Page Tests", () => {
  beforeEach(() => {
    cy.visit("https://www.demoblaze.com/index.html");
  });

  it("Verify About Us Modal Opens and Closes", () => {
    AboutPage.openAboutUs();
    AboutPage.closeAboutUs();
  });
});
