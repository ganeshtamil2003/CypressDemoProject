/// <reference types='cypress'/>

class HomePage {
  elements = {
    homeNav: () => cy.get(".active > .nav-link"),
    contactNav: () => cy.get(":nth-child(2) > .nav-link"),
    aboutusNav: () => cy.get(":nth-child(3) > .nav-link"),
    cartNav: () => cy.get("#cartur"),
    loginNav: () => cy.get("#login2"),
    signupNav: () => cy.get("#signin2"),
    categories: () => cy.get(".list-group a"),
    productList: () => cy.get(".card-title a"),
    productImages: () => cy.get(".card-img-top"),
    welcomeUser: () => cy.get("#nameofuser"),
    logoutNav: () => cy.get("#logout2"),
    product: (productName) => cy.contains(".card-title", productName),
    addToCartButton: () => cy.get('.col-sm-12 > .btn'),
  };

  visitHomePage() {
    cy.visit("https://www.demoblaze.com/index.html");
    cy.wait(500);
  }

  verifyNavigationLinks() {
    this.elements.homeNav().should("be.visible");
    this.elements.contactNav().should("be.visible");
    this.elements.aboutusNav().should("be.visible");
    this.elements.cartNav().should("be.visible");
    this.elements.loginNav().should("be.visible");
    this.elements.signupNav().should("be.visible");
  }

  verifyProductCategories() {
    this.elements.categories().should("have.length", 4);
    this.elements.categories().contains("Phones").should("be.visible");
    this.elements.categories().contains("Laptops").should("be.visible");
    this.elements.categories().contains("Monitors").should("be.visible");
  }

  verifyProductLists() {
    this.elements.productList().should("be.visible");
    this.elements.productImages().should("be.visible");
  }

  navigateToCategory(category) {
    this.elements.categories().contains(category).click();
    cy.wait(500);
  }

  verifyUserLoggedIn(username) {
    this.elements.welcomeUser().should("contain.text", username);
  }

  verifyLogout() {
    this.elements.logoutNav().should("be.visible").click();
    cy.wait(500);
    this.elements.loginNav().should("be.visible");
  }

  selectProduct(productName) {
    this.visitHomePage()
    cy.contains(".hrefch", productName, { matchCase: false })
    .should("be.visible")
    .click();    
    cy.url().should("include", "prod.html");
  }

  addToCart() {
    this.elements.addToCartButton().click();
    cy.wait(500);
  }
}

export default new HomePage();
