/// <reference types="cypress"/>

class CartPage{

elements={
    cartLink:()=> cy.get('#cartur'),
    productList: () => cy.get(".success"),
    deleteButton: (productName) =>
      cy.contains("td", productName).parent().find("a"),
    placeOrderButton:()=> cy.contains('Place Order'),
    nameInput:()=>cy.get('#name'),
    countryInput:()=>cy.get('#country'),
    cityInput:()=>cy.get('#city'),
    creditCardInput:()=>cy.get('#card'),
    monthInput:()=>cy.get('#month'),
    yearInput:()=>cy.get('#year'),
    purchaseButton:()=> cy.contains("Purchase"),
    closeButton:()=> cy.contains('Close'), 
    successMessage:()=>cy.get('.sweet-alert > h2')     
}

    openCart(){
        this.elements.cartLink().click()
        cy.wait(500)
    }

    removeProduct(productName){
        this.openCart()
        this.elements.deleteButton(productName).click()
    }

    palceOrder(name,country,city,creditCard,month,year,){
        this.openCart();
        this.elements.placeOrderButton().click()
        cy.wait(500)
        this.elements.nameInput().type(name)
        this.elements.countryInput().type(country)
        this.elements.cityInput().type(city)
        this.elements.creditCardInput().type(creditCard)
        this.elements.monthInput().type(month)
        this.elements.yearInput().type(year)
        this.elements.purchaseButton().click()
    }
    
    verifyAlertMessage(expectedText) {
        cy.on("window:alert", (text) => {
          expect(text).to.eq(expectedText);
        });
      }


      verifyCartIsEmpty() {
        this.elements.productList().should("not.exist");
      }
    
   
}

export default new CartPage();
