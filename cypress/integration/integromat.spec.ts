/// <reference types="cypress" />

describe(`Integromat assignment tests`, () => {
  it(`TESTCASE 01`, () => {
    cy.visit(`https://www.integromat.com/en/login`)
    cy.get(`[name="email"]`)
      .type(`happywhatever@email.cz`)
    cy.get(`[name="password"]`)
      .type(`HireTheHeckOutOfMe123;`)
    cy.get(`[type="button"]`).click()
    cy.get(`[href="/user"] > div`)
      .contains(`Joztest Cambora`)
      .click()
    cy.get(`a[href="/logout"]`).click()
  });
})