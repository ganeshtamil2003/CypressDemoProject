/// <reference types="cypress"/>

import SignupPage from "../pages/SignupPage";

beforeEach(() => {
  cy.visit("https://www.demoblaze.com/index.html");
});

describe("Signup Tests", () => {
  it("Signup with Unique Username and password", () => {
    const randomUsername = `testUser${Math.floor(Math.random() * 1000)}`;
    SignupPage.signup(randomUsername, "finsurge123");
    SignupPage.verifyAlertMessage("Sign up successful.");
  });

  it("Signup with Duplicate Username and password", () => {
    SignupPage.signup("finsurge1", "finsurge123");
    SignupPage.verifyAlertMessage("This user already exist.");
  });

  it("Signup with Username only", () => {
    SignupPage.signup("finsurge1", " ");
    SignupPage.verifyAlertMessage("Please fill out Username and Password.");
  });

  it("Signup with Password only", () => {
    SignupPage.signup("finsurge123", " ");
    SignupPage.verifyAlertMessage("Please fill out Username and Password.");
  });

  it("Signup with Blank Fields", () => {
    SignupPage.signup(" ", " ");
    //SignupPage.verifyAlertMessage("Please fill out Username and Password.")
  });
  //   it("Signup with minimum password length", () => {});
  //   it("Signup with long username & password", () => {});

  it("Page Reload Test", () => {
    SignupPage.openSignup();
    cy.reload();
    SignupPage.openSignup();
  });
});
