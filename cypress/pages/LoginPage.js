const TIMEOUT = 5000;

class LoginPage {
  elements = {
    usernameInput: () => cy.get("#loginusername", { timeout: TIMEOUT }),
    passwordInput: () => cy.get("#loginpassword", { timeout: TIMEOUT }),
    LoginButton: () =>
      cy.get(".modal-footer > .btn-primary").eq(2).click({ force: true }),
  };

  openLogin() {
    cy.get("#login2").click();
    cy.wait(500);
    // cy.get("#signInModal", { timeout: TIMEOUT }).should("be.visible");
    cy.get("#logInModal > .modal-dialog > .modal-content > .modal-body").should(
      "be.visible"
    );
  }

  login(username, password) {
    this.openLogin();
    cy.wait(1000);
    this.elements.usernameInput().should("be.visible").type(username);
    this.elements.passwordInput().should("be.visible").type(password);
    this.elements.LoginButton().should("be.enabled").click();
  }

  verifyAlertMessage(expectedText) {
    cy.on("window:alert", (text) => {
      expect(text).to.eq(expectedText);
    });
  }
}

export default new LoginPage();
