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
    cy.get(`[name="email"]`).type(email, { delay: 50 });
    cy.get(`[name="password"]`).type(password, { delay: 50 });
    cy.get(`[type="button"]`).click();
    cy.get(`[href="/user"] > div:not(.nav-icon)`)
      .as(`loggedUserName`)
      .contains(name);
  }
);

Cypress.Commands.add(`logout`, () => {
  cy.get(`@loggedUserName`).click();
  cy.get(`a[href="/logout"]`).click();
});

Cypress.Commands.add(`gotoDataStores`, () => {
  cy.get(`div`).contains(`Data stores`).click();
});

Cypress.Commands.add(`gotoDataStructures`, () => {
  cy.get(`button.nav-more`).click();
  cy.get(`.list-group-small`).contains(`Data structures`).click();
});

Cypress.Commands.add(`createDataStore`, (store, structure) => {
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
        .type(store, { delay: 50 });
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
        .type(structure, { delay: 50 });

      cy.get(`button`).contains(`Add item`).click();
    });

  //within "Add data store" popup
  cy.get(`h1`)
    .contains(`Add item`)
    .parents(`.i-panel-nested`)
    .as(`item`)
    .within(() => {
      cy.get(`select[name="type"]`).select(`Number`);
      cy.get(`input[name="name"]`).type(`Number`);
      cy.get(`span.custom-control-description`).contains(` Required`).click();
      cy.get(`button`).contains(`Add`).click();
    });
  //get the cookie message out of the way
  cy.get(`a[aria-label="dismiss cookie message"]`).click();

  //back in "Add data structure" popup
  cy.get(`@structure`).within(() => {
    cy.get(`button`).contains(`Save`).click();
  });

  //back to "Add data store" popup
  cy.get(`@store`).within(() => {
    //verify, that Test Data Structure exists in dropdown
    cy.get(`select[name="udt"]`)
      .as(`sel`)
      .within((el) => {
        cy.wrap(el).then((el) => {
          if (el.find(`option`).length < 2) {
            cy.log(`data structure combobox is short on structures`);
            cy.wait(500);
          } else {
            return;
          }
        });
      });
    cy.get(`select[name="udt"]`)
      .find(`option`)
      .contains(structure)
      .should(`have.text`, structure);
    cy.get(`button`).contains(`Save`).click();
  });
});

Cypress.Commands.add(`checkStructureDeleteModal`, (modalText) => {
  //click on delete
  cy.get(`button.i-remover`).click().click();
  //test within popup
  cy.get(`.modal-dialog`).within((popup) => {
    //check text in popup
    cy.get(`.modal-body > p`).should(`have.text`, modalText);
    //close popup
    cy.wrap(popup)
      .find(`button[data-dismiss="modal"]`)
      .contains(`Close`)
      .wait(50)
      .click();
  });
});

Cypress.Commands.add(`addDataStoreRecord`, (key, number) => {
  //take the ID from the button and visit the new page (cypress cannot handle newly opened windows)
  //also there is no "target=blank" attribute, so I need to hack it like this
  cy.get(`button.i-browse-datastore`).then((btn) => {
    //get my store ID
    const storeId = btn[0].attributes.getNamedItem(`data-id`).value;
    //visit the new URL
    cy.visit(`/datastore/${storeId}/browse`);
  });
  //click Add button
  cy.get(`button`).contains(`Add`).click();
  //type 1 to key field
  cy.get(`input[name="key"]`).type(key);
  //type 2020 to number field
  cy.get(`input[name="Number"]`).type(number);
  //save settings
  cy.get(`button`).contains(`Save`).click();
  cy.visit("/");
});

Cypress.Commands.add(`checkDataStore`, (store) => {
  cy.get(`#all.active.datastores`)
    .find(`.datastore:not([style="display: none;"])`)
    .contains(store)
    .should(`have.text`, store)
    .and(`be.visible`);
});

Cypress.Commands.add(`checkDataStructure`, (structure) => {
  cy.get(`.active.udts`)
    .find(`.udt:not([style="display: none;"])`)
    .contains(structure)
    .should(`have.text`, structure)
    .and(`be.visible`);
});

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

    createDataStore(store: string, structure: string): Chainable;
    checkStructureDeleteModal(modalText: string): Chainable;
    addDataStoreRecord(key: string, number: string): Chainable;
    logout(): Chainable;
    gotoDataStores(): Chainable;
    gotoDataStructures(): Chainable;
    checkDataStore(store: string): Chainable;
    checkDataStructure(structure: string): Chainable;
  }
}
