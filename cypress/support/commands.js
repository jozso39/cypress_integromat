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

Cypress.Commands.add(`loginByApiAndNameCheck`, (email, password, name) => {
  cy.request({
    method: `POST`,
    url: `/api/login`,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Referer: "https://www.integromat.com/en/login",
    },
    body: {
      email: email,
      password: password,
    },
  });
  cy.visit(`/`);
  cy.get(`a.i-signed-menu`)
    .as(`loggedUserName`)
    .contains(name)
    .should(`contain.text`, name);
});

Cypress.Commands.add(`logoutByApi`, () => {
  //need to force it or the dialog would not show in headless run
  cy.request(`GET`, `/logout`).then((resp) => {
    expect(resp.status).to.eq(200);
  });
});

//universal visit function
Cypress.Commands.add(`goTo`, (page) => {
  cy.window().then((win) => {
    let companyId = win.imt.company.id;
    cy.visit(`/${page}/${companyId}`);
  });
});

Cypress.Commands.add(`clearPreviousData`, () => {
  //get company id
  cy.window().then((win) => {
    let companyId = win.imt.company.id;
    //visit the scenarios page
    cy.visit(`/scenarios/${companyId}`);
    //if there are visible scenarios
    cy.get(`.list-group.scenarios`).then((scenarios) => {
      if (
        scenarios.find(`.scenario:not([style="display: none;"])`).length > 0
      ) {
        //click on each dropdown and their delete button
        cy.get(`button[data-toggle="dropdown"]`).each((el) => {
          cy.wrap(el)
            .click()
            .siblings(`.dropdown-menu.show`)
            .find(`button.i-remover`)
            .click()
            .click();
        });
      }
    });

    //go to datastores
    cy.visit(`/datastores/${companyId}`);
    cy.get(`#all.active.datastores`).then((stores) => {
      //if there are visible stores
      if (stores.find(`.datastore:not([style="display: none;"])`).length > 0) {
        //click on each delete button
        cy.get(`button.i-remover`).each((el) => {
          cy.wrap(el).click().click();
        });
      }
    });

    cy.visit(`/udts/${companyId}`);
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

Cypress.Commands.add(
  `createDataStoreViaApi`,
  (store, structure, numberName) => {
    //get company ID using company API and store it
    cy.window().then((win) => {
      let companyId = win.imt.company.id;
      //create data structure
      cy.request({
        method: `POST`,
        url: `/api/udts/add/${companyId}?inspector=yes`,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Referer: "https://www.integromat.com/datastores/" + companyId,
        },
        body: {
          udt_name: structure,
          spec: [
            {
              name: numberName,
              label: "",
              type: "number",
              default: null,
              required: true,
            },
          ],
          strict: false,
        },
      }).then((resp) => {
        const jsonResp = resp.body;
        //check that structure was created
        expect(jsonResp.code).to.eq(`OK`);
        //create data store
        cy.request({
          method: `POST`,
          url: `/api/datastores/add/${companyId}?inspector=yes`,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Referer: "https://www.integromat.com/datastores/" + companyId,
          },
          body: {
            name: store,
            udt: jsonResp.response.formula.success[0],
            size: 1,
          },
        }).then((resp) => {
          const jsonResp = resp.body;
          //check that store was created
          expect(jsonResp.code).to.eq(`OK`);
        });
      });
    });
  }
);

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
