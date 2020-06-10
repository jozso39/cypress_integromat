/// <reference types="cypress" />

let data: any;

describe(`Integromat assignment tests`, () => {
  before(() => {
    //set data from JSON file in fixtures
    cy.fixture(`data.json`).then((d) => {
      data = d;
    });
  });
  beforeEach(() => {
    //calling custom command from support/commands.ts
    cy.loginAndNameCheck(
      data.loginPath,
      data.user.email,
      data.user.password,
      data.user.name
    );
  });
  afterEach(() => {
    cy.logout();
  });

  context(`Mandatory tasks`, () => {
    it(`TESTCASE 01`, () => {
      //nothing needs to be here
    });

    it(`TESTCASE 02`, () => {
      cy.gotoDataStores();
      cy.createDataStore(`Test Data Store`, `Test Data Structure`);

      //check that new data store exists ()
      cy.checkDataStore(`Test Data Store`);
      cy.gotoDataStructures();
      cy.checkDataStructure(`Test Data Structure`);
    });
  });
  context(`Clear data stores and structures`, () => {
    it(`Delete data stores`, () => {
      cy.gotoDataStores();

      //look into the stores
      cy.get(`#all.active.datastores`).then((stores) => {
        //if there are visible stores
        if (
          stores.find(`.datastore:not([style="display: none;"])`).length > 0
        ) {
          //click on each delete button
          cy.get(`button.i-remover`).each((el) => {
            cy.wrap(el).click().click();
          });
        }
      });
      //go to data structures
      cy.gotoDataStructures();
      //look into data structures
      cy.get(`.active.udts`).then((structures) => {
        //if there are visible structures
        if (structures.find(`.udt:not([style="display: none;"])`).length > 0) {
          //click on each delete button
          cy.get(`button.i-remover`).each((el) => {
            cy.wrap(el).click().click();
          });
        }
      });
    });
  });
  context(`Optional tasks`, () => {
    it.only(`TESTCASE 03`, () => {
      /* cy.gotoDataStores();
      cy.createDataStore(`Test Data Store`, `Test Data Structure`);
      cy.checkDataStore(`Test Data Store`); */
      cy.gotoDataStructures();
      cy.checkDataStructure(`Test Data Structure`);
      //click on delete
      cy.get(`button.i-remover`).click().click();
      //check popup
      cy.get(`.modal-dialog`)
        .as(`dialog`)
        .find(`p`)
        .should(
          `have.text`,
          `Can't delete UDT because it is used by those datastores: Test Data Store.`
        );
      //waiting for animation to end
      //cy.wait(300);
      //close popup
      cy.get(`@dialog`)
        .find(`button[data-dismiss="modal"]`)
        .contains(`Close`)
        .click();
      cy.gotoDataStores();
      //take the ID from the button and visit the new page (cypress cannot handle newly opened windows)
      //also there is no "target,blank" attribute, so I need to hack it like this
      cy.get(`button.i-browse-datastore`).then((btn) => {
        //get my store ID
        const storeId = btn![0].attributes.getNamedItem(`data-id`).value;
        //visit the new URL
        cy.visit(`/datastore/${storeId}/browse`);
      });
      //click Add button
      cy.get(`button`).contains(`Add`).click();
      //type 1 to key field
      cy.get(`input[name="key"]`).type(`1`);
      //type 2020 to number field
      cy.get(`input[name="Number"]`).type(`2020`);
      //save settings
      cy.get(`button`).contains(`Save`).click();
      cy.visit("/");
    });
    it(`TESTCASE 04`, () => {});
  });
});
