/// <reference types="cypress" />

let data;

describe(`Integromat assignment tests`, () => {
  before(() => {
    //set data from JSON file in fixtures
    cy.fixture(`data.json`).then((d) => {
      data = d;
    });
  });

  context(`mandatory tasks`, () => {
    it(`TESTCASE 01 - login`, () => {
      //this really needs to run only once
      cy.log(`login and logout by UI really needs to run only once`);
      cy.visit(`/en/login`);
      cy.get(`[name="email"]`).type(data.user.email, { delay: 50 });
      cy.get(`[name="password"]`).type(`${data.user.password}{enter}`, {
        delay: 50,
      });
      cy.get(`a.i-signed-menu`)
        .as(`loggedUserName`)
        .contains(data.user.name)
        .should(`contain.text`, data.user.name);
      cy.get(`@loggedUserName`).click();
      cy.get(`.list-group-item`).contains(`Sign out`).click();
    });

    it(`TESTCASE 02 - create data store`, () => {
      cy.log(
        `login was tested, I dont need to test the UI, so I log in and out via web API`
      );
      cy.loginByApiAndNameCheck(
        data.user.email,
        data.user.password,
        data.user.name
      );
      cy.clearPreviousData();

      //go to data stores
      cy.goTo(`datastores`);

      //click "Add data store" button
      cy.get(`button[data-name="Add data store"]`).click();

      //within "Add data store" popup
      cy.get(`h4`)
        .contains(`Add data store`)
        .parents(`.modal-content`)
        .as(`store`)
        .within(() => {
          cy.get(`input[name="name"]`)
            .click() //testcase said explicitly to click it
            .clear()
            //delay added, sometimes the string isnt typed in full
            .type(`Test Data Store`, { delay: 70 });

          cy.get(`button`).contains(`Add`).click();
        });

      //within "Add data structure" popup
      cy.contains(`Add data structure`)
        .parents(`.i-panel`)
        .as(`structure`)
        .within(() => {
          cy.get(`input[name="udt_name"]`)
            .click() //testcase said explicitly to click it
            .clear()
            .type(`Test Data Structure`, { delay: 50 });

          cy.get(`button`).contains(`Add item`).click();
        });

      //within "Add data store" popup
      cy.get(`h1`)
        .contains(`Add item`)
        .parents(`.i-panel-nested`)
        //.as(`item`)
        .within(() => {
          cy.get(`select[name="type"]`).select(`Number`);
          cy.get(`input[name="name"]`).type(`Number`);
          cy.get(`span.custom-control-description`)
            .contains(` Required`)
            .click();
          cy.get(`button`).contains(`Add`).click();
        });
      //get the cookie message out of the way
      cy.get(`a[aria-label="dismiss cookie message"]`).click();

      //back in "Add data structure" popup
      cy.get(`@structure`).within(() => {
        cy.get(`button`).contains(`Save`).click();
      });

      //back to "Add data store" popup
      cy.get(`@store`).within((store) => {
        //verify, that Test Data Structure exists in dropdown
        cy.get(`select[name="udt"]`)
          .as(`sel`)
          .within((el) => {
            cy.wrap(el).then((el) => {
              if (el.find(`option`).length < 2) {
                //TODO: fix this wait
                cy.wait(500);
              } else {
                return;
              }
            });
          });
        cy.get(`select[name="udt"]`)
          .find(`option`)
          .contains(`Test Data Structure`)
          .should(`have.text`, `Test Data Structure`);
        cy.get(`button`).contains(`Save`).click();
        //added check
        cy.wrap(store).should(`not.exist`);
      });

      //reload page, idk new data store is not displayed
      //cy.reload();
      //check that new data store exists inside data stores
      cy.get(`#all.active.datastores`).within(() => {
        cy.get(`.datastore:not([style="display: none;"])`)
          .find(`.list-group-title`)
          .should(`have.text`, `Test Data Store`)
          .and(`be.visible`);
      });

      //go to data structures
      cy.goTo(`udts`);

      // check data structure inside all structures
      cy.get(`.active.udts`).within(() => {
        cy.get(`.udt:not([style="display: none;"])`)
          .find(`.list-group-title`)
          .should(`have.text`, `Test Data Structure`)
          .and(`be.visible`);
      });

      cy.logoutByApi();
    });
  });
  context(`optional tasks`, () => {
    it(`TESTCASE 03 - try to delete data structure`, () => {
      cy.log(
        `since the creation of data store was done in TC2, Im gonna create it using API`
      );
      cy.loginByApiAndNameCheck(
        data.user.email,
        data.user.password,
        data.user.name
      );
      cy.clearPreviousData();
      cy.createDataStoreViaApi(
        `Test Data Store`,
        `Test Data Structure`,
        `Number`
      );
      //go to data structures
      cy.goTo(`udts`);

      //by the way, it really should be "it is used by THESE datastores"
      cy.checkStructureDeleteModal(
        `Can't delete UDT because it is used by those datastores: Test Data Store.`
      );
      cy.goTo(`datastores`);
      cy.addDataStoreRecord(`1`, `2020`);
      cy.logoutByApi();
    });

    //TODO: remove only and comments
    it(`TESTCASE 04 - create scenario`, () => {
      cy.log(
        `Im gonna create the data store and structure via API, but not gonna check them, already tested that in testcase 03`
      );

      cy.loginByApiAndNameCheck(
        data.user.email,
        data.user.password,
        data.user.name
      );
      cy.clearPreviousData();
      cy.createDataStoreViaApi(
        `Test Data Store`,
        `Test Data Structure`,
        `Number`
      );
      cy.goTo(`datastores`);
      cy.addDataStoreRecord(`1`, `2020`);
      //go to scenarios
      cy.goTo(`scenarios`);
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
          //select saved data store, key = 1 and click OK
          cy.get(`select[name="datastore"]`).select(`Test Data Store`);
          cy.get(`textarea[name="key"]`).siblings(`.i-coder-root`).type(`1`);
          cy.get(`button`).contains(`OK`).click();
        });
      //save scenario
      cy.get(`button#scenariosave`).click();
      //run once
      cy.get(`button`).contains(`Run once`).click();
      //logout
      cy.logoutByApi();
    });
  });
});
