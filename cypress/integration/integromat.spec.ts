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
      //TODO: un-comment store creation
      // cy.gotoDataStores();
      // cy.createDataStore(`Test Data Store`, `Test Data Structure`);
      // cy.checkDataStore(`Test Data Store`);
      cy.gotoDataStructures();
      cy.checkDataStructure(`Test Data Structure`);
      cy.checkStructureDeleteModal(
        `Can't delete UDT because it is used by those datastores: Test Data Store.`
      );
      cy.gotoDataStores();
      cy.addDataStoreRecord(`1`, `2020`);
    });
    it(`TESTCASE 04`, () => {});
  });
});
