/// <reference types="cypress" />

describe(`Integromat assignment tests`, () => {
  it(`TESTCASE 01`, () => {
    cy.visit(Cypress.env(`loginUrl`))
    cy.get(`[name="email"]`)
      .type(Cypress.env(`userEmail`))
    cy.get(`[name="password"]`)
      .type(Cypress.env(`userPassword`))
    cy.get(`[type="button"]`).click()
    cy.get(`[href="/user"] > div`)
      .contains(`Joztest Cambora`)
      .click()
    cy.get(`a[href="/logout"]`).click()
  });
})