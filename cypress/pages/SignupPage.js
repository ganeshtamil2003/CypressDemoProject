const TIMEOUT = 5000;

class SignupPage {
  elements = {
    usernameInput: () => cy.get("#sign-username", { timeout: TIMEOUT }),
    passwordInput: () => cy.get("#sign-password", { timeout: TIMEOUT }),
    SignupButton: () =>
      cy.get(".modal-footer > .btn-primary").eq(1).click({ force: true }),
    closeButton: () => cy.contains("Close"),
  };

  openSignup() {
    cy.get("#signin2").click();
    // cy.get("#signInModal", { timeout: TIMEOUT }).should("be.visible");
    cy.get('#signInModal > .modal-dialog > .modal-content > .modal-body',{timeout:TIMEOUT}).should("be.visible")
  }

  signup(username, password) {
    this.openSignup();
    cy.wait(1000);
    this.elements.usernameInput().should('be.visible').type(username);
    this.elements.passwordInput().should('be.visible').type(password);
    this.elements.SignupButton().should('be.enabled').click();
  }

  verifyAlertMessage(expectedText) {
    cy.on("window:alert", (text) => {
      expect(text).to.eq(expectedText);
    });
  }
}

export default new SignupPage();
