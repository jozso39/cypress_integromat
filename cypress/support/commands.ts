// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
Cypress.Commands.add(
  `loginAndNameCheck`,
  (loginPageUrl, email, password, name) => {
    cy.visit(loginPageUrl);
    cy.get(`[name="email"]`).type(email);
    cy.get(`[name="password"]`).type(password);
    cy.get(`[type="button"]`).click();
    cy.get(`[href="/user"] > div:not(.nav-icon)`)
      .as(`loggedUserName`)
      .contains(name);
  }
);
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

declare namespace Cypress {
  interface Chainable {
    loginAndNameCheck(
      loginPageUrl: string,
      email: string,
      password: string,
      name: string
    ): Chainable;
  }
}
