/// <reference types="cypress"/>
import LoginPage from "../pages/LoginPage";

beforeEach(() => {
  cy.visit("https://www.demoblaze.com/index.html");
});

describe("Login Tests", () => {
  it.only("Login with valid username and password", () => {
    LoginPage.login("finsurge1", "finsurge123");
    cy.get("#logout2").should("be.visible", { timeout: 5000 });
  });

  it("Login with Invalid username and password", () => {
    LoginPage.login("fin", "ddssd");
    cy.get("#logout2").should("not.be.visible");
  });

  it("Login with Blank Username", () => {
    LoginPage.login(" ", "finsurge123");
    LoginPage.verifyAlertMessage("Please fill out Username and Password.");
  });

  it("Login with Blank password", () => {
    LoginPage.login("finsurge", " ");
    LoginPage.verifyAlertMessage("Wrong password.");
  });

  it("Login with Blank Fields", () => {
    LoginPage.login(" ", " ");
    LoginPage.verifyAlertMessage("Please fill out Username and Password.");
  });

  it("Check Logout Functionality", () => {
    LoginPage.login("finsurge1", "finsurge123");
    cy.get("#logout2",{ timeout: 5000 }).should("be.visible");
  });

  it("Page Reload Test", () => {
    LoginPage.login("finsurge", "finsurge123");
    cy.get("#logout2", { timeout: 5000 }).should("be.visible");
    cy.reload();
    cy.get("#logout2", { timeout: 5000 }).should("be.visible");
  });
});





