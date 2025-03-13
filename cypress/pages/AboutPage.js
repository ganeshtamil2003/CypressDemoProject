class AboutPage {
    elements = {
      aboutUsLink: () => cy.get(':nth-child(3) > .nav-link'),
      aboutUsModal: () => cy.get("#videoModal"),
      closeButton: () => cy.get("#videoModal .close"),
    };
  
    openAboutUs() {
      this.elements.aboutUsLink().click();
      this.elements.aboutUsModal().should("be.visible");
    }
  
    closeAboutUs() {
      this.elements.closeButton().click();
      this.elements.aboutUsModal().should("not.be.visible");
    }
  }
  
  export default new AboutPage();
  