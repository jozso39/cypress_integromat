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
      //nothing needs to be here, everything is in before and after each
    });

    it(`TESTCASE 02`, () => {
      //TODO: remove cy.clearPreviousData
      cy.clearPreviousData();
      cy.gotoDataStores();
      cy.createDataStore(`Test Data Store`, `Test Data Structure`);

      //check that new data store exists ()
      cy.checkDataStore(`Test Data Store`);
      cy.gotoDataStructures();
      cy.checkDataStructure(`Test Data Structure`);
    });
  });

  context(`Optional tasks`, () => {
    it(`TESTCASE 03`, () => {
      cy.clearPreviousData();
      cy.gotoDataStores();
      cy.createDataStore(`Test Data Store`, `Test Data Structure`);
      cy.checkDataStore(`Test Data Store`);
      cy.gotoDataStructures();
      cy.checkDataStructure(`Test Data Structure`);
      //by the way, it really should be "it is used by THESE datastores"
      cy.checkStructureDeleteModal(
        `Can't delete UDT because it is used by those datastores: Test Data Store.`
      );
      cy.gotoDataStores();
      cy.addDataStoreRecord(`1`, `2020`);
    });
    //TODO: remove only
    it.only(`TESTCASE 04`, () => {
      // cy.clearPreviousData();
      // cy.gotoDataStores();
      // cy.createDataStore(`Test Data Store`, `Test Data Structure`);
      // cy.checkDataStore(`Test Data Store`);
      // cy.gotoDataStructures();
      // cy.checkDataStructure(`Test Data Structure`);
      // cy.checkStructureDeleteModal(
      //   `Can't delete UDT because it is used by those datastores: Test Data Store.`
      // );
      // cy.gotoDataStores();
      // cy.addDataStoreRecord(`1`, `2020`);

      //go to scenarios
      cy.get(`.nav-item`).contains(`Scenarios`).click();
      //click "Create a new scenario"
      cy.get(`.btn-primary`).contains(`Create a new scenario`).click();
      //Click continue button
      cy.get(`button`).contains(`Continue`).click();
      //
      cy.get(`canvas`).then((canvas) => {
        //banner is part of canvas
        const canvasWidth = canvas[0].attributes.getNamedItem(`width`).value;
        const canvasHeight = canvas[0].attributes.getNamedItem(`height`).value;
        cy.wrap(canvas).click(canvasWidth / 2 + 78, canvasHeight / 2);
      });
      //TODO: need to click slightly higher

      cy.pause();
    });
  });
});
