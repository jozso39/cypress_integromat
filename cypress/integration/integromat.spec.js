/// <reference types="cypress" />

let data;

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
    //TODO: remove only and comments
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
      //banner is part of canvas
      cy.get(`canvas`).then((canvas) => {
        //save canvas width and hight
        data.els.canvas.width = canvas[0].offsetWidth;
        data.els.canvas.height = canvas[0].offsetHeight;
        //get and save left side menu width
        cy.get(`aside.gradient-sm-vertical`).then((aside) => {
          data.els.asideWidth = aside[0].offsetWidth;
          //get and save bottom controls menu
          cy.get(`.i-inspector-menu`).then((inspector) => {
            data.els.inspectorMenuHeight = inspector[0].offsetHeight;
            //click in middle of canvas not including side and bottom menu
            cy.wrap(canvas).click(
              (data.els.canvas.width + data.els.asideWidth) / 2,
              (data.els.canvas.height - data.els.inspectorMenuHeight) / 2
            );
          });
        });
      });
      //seach data store
      //TODO: remove force true
      cy.get(`input.searcher`).type(`Data store`, { force: true });
      cy.get(`button[data-app="datastore"]`)
        .should(`not.have.class`, `d-none`)
        .click();
      //get record
      cy.get(`button[data-module="GetRecord"]`).click();
      //test within Data score popup
      cy.get(`h1`)
        .contains(`Data store`)
        .parents(`.i-panel`)
        .within(() => {
          cy.get(`select[name="datastore"]`).select(`Test Data Store`);
          cy.get(`textarea[name="key"]`).siblings(`.i-coder-root`).type(`1`);
        });

      cy.pause();
    });
  });
});
