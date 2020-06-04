/// <reference types="cypress" />

let data: any;

describe(`Integromat assignment tests`, () => {
  before(() => {
    //set data from JSON file in fixtures
    cy.fixture(`data.json`).then((d) => {
      data = d;
    });
  });

  context(`Mandatory tasks`, () => {
    beforeEach(() => {
      //calling custom command
      cy.loginAndNameCheck(
        data.loginUrl,
        data.user.email,
        data.user.password,
        data.user.name
      );
    });
    it(`TESTCASE 01`, () => {
      //cy.get(`[href="/user"] > div:not(.nav-icon)`)
      //  .as(`loggedUserName`)
      //  .contains(data.user.name);
      cy.get(`@loggedUserName`).click();
      cy.get(`a[href="/logout"]`).click();
    });

    it.only(`TESTCASE 02`, () => {
      cy.get(`div`).contains(`Data stores`).click();
      cy.get(`button[data-name="Add data store"]`).click();
      cy.get(`input[name="name"]`)
        .click(`center`) //testcase said explicitly to click it
        .clear()
        .type(`Test Data Store`);
      cy.get(`button[type="button"]`).contains(`Add`).click();
      cy.get(`input[name="udt_name"]`)
        .click() //testcase said explicitly to click it
        .clear()
        .type(`Test Data Structure`);
      cy.get(`button[type="button"]`).contains(`Add item`).click();
      cy.get(`select[name="type"]`).select(`Number`);
      cy.get(`input[name="name"]`).last().type(`Number`);
      cy.get(`span.custom-control-description`).contains(` Required`).click();
      cy.get(`button[type="button"]`).contains(`Add`);
      cy.get(`.i-panel-nested > .i-panel-footer > .btn-primary`).click();
      cy.get(`a[aria-label="dismiss cookie message"]`).click();
      cy.get(`button`).not(`[data-dismiss="modal"]`).contains(`Save`).click();
    });
  });
});
