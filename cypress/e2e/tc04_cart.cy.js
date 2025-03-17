/// <reference types="cypress"/>

import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";

describe("Cart Page Test", () => {
  beforeEach(() => {
    HomePage.visitHomePage();
  });

  it.only("Add product to Cart", () => {
    HomePage.selectProduct("Samsung galaxy s6");
    HomePage.addToCart();
    CartPage.verifyAlertMessage("Product Added");
    CartPage.openCart();
    CartPage.elements.productList().should("contain.text", "Samsung galaxy s6");
  });

  it("Remove Product from Cart", () => {
    HomePage.selectProduct("Nexus 6");
    HomePage.addToCart();
    CartPage.removeProduct("Nexus 6");
    CartPage.verifyCartIsEmpty();
  });

  it("Verify Cart Persistence after reload", () => {
    HomePage.selectProduct("Sony vaio i5");
    HomePage.addToCart();
    CartPage.verifyAlertMessage("Product Added");
    cy.reload();
    CartPage.openCart();
    CartPage.elements.productList().should("contain.text", "Sony vaio i5");
  });


  it("Verify Total Price Equals Sum of Product Prices", () => {
    const products = ["Sony vaio i5", "Nexus 6", "Sony xperia z5","Nokia lumia 1520"]; 
  
    products.forEach((product) => {
      HomePage.selectProduct(product);
      HomePage.addToCart();
      cy.wait(1000); 
      cy.on("window:alert", (alertText) => {
        expect(alertText).to.contain("Product added");
      });
      HomePage.visitHomePage()
    });
  
    CartPage.openCart();
    cy.wait(2000); 

    cy.get("tr.success td:nth-child(3)", { timeout: 10000 })
      .should("have.length", products.length) 
      .then(($priceCells) => {
        let totalCalculated = 0;
  
        cy.wrap($priceCells).each(($cell) => {
          totalCalculated += Number($cell.text().trim());
        }).then(() => {
          // Compare the calculated total with the displayed total
          cy.get("#totalp", { timeout: 10000 }).should(($totalElement) => {
            const displayedTotal = Number($totalElement.text().trim());
            expect(displayedTotal).to.equal(totalCalculated);
          });
        });
      });
  });
  

  it("Place Order", () => {
    HomePage.selectProduct("Samsung galaxy s6");
    HomePage.addToCart();
    CartPage.palceOrder(
      "Ganesh",
      "India",
      "Kovilpatti",
      "123412341234",
      "June",
      "2027"
    );
    CartPage.elements
      .successMessage()
      .should("contain.text", "Thank you for your purchase!");
  });
});
