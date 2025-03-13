class ContactPage {
    elements = {
      contactLink: () => cy.get(':nth-child(2) > .nav-link'),
      emailInput: () => cy.get("#recipient-email"),
      nameInput: () => cy.get("#recipient-name"),
      messageInput: () => cy.get("#message-text"),
      sendButton: () => cy.get("button[onclick='send()']"),
      contactModal: () => cy.get("#exampleModal"),
    };
  
    openContactUs() {
      this.elements.contactLink().click();
      this.elements.contactModal().should("be.visible");
    }
  
    fillContactForm(email, name, message) {
      this.elements.emailInput().type(email);
      this.elements.nameInput().type(name);
      this.elements.messageInput().type(message);
    }
  
    submitContactForm() {
      this.elements.sendButton().click();
      cy.on("window:alert", (alertText) => {
        expect(alertText).to.equal("Thanks for the message!!");
      });
    }
  }
  
  export default new ContactPage();
  