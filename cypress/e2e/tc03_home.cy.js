/// <reference types="cypress"/>
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

describe("Home Module Test", () => {
  beforeEach(() => {
    HomePage.visitHomePage();
  });

  it("Verify HomePage Load Successfully", () => {
    cy.title().should("include", "STORE");
    HomePage.verifyNavigationLinks();
  });

  it("Verify Product Categories",()=>{
    HomePage.verifyProductCategories()
  })

  it("Verify Product Lists",()=>{
    HomePage.verifyProductLists()
  })

  it("Navigate to Product Categories",()=>{
    HomePage.navigateToCategory("Phones")
    HomePage.navigateToCategory("Laptops")
    HomePage.navigateToCategory("Monitors")
  })

  it("Verify Login and Logout Function",()=>{
    LoginPage.login("finsurge1","finsurge123")
    HomePage.verifyUserLoggedIn("finsurge1")
    HomePage.verifyLogout()
  })

  it("Verify Clicking on Product open Product Page",()=>{
    HomePage.elements.productList().first().click()
    cy.url().should("include","prod.html")
  })

});
