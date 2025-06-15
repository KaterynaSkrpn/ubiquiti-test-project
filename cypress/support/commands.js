
Cypress.Commands.add('loginAs', (username, password = 'secret_sauce') => {
  cy.visit('https://www.saucedemo.com');
  cy.get('[data-test="username"]').clear().type(username);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('scrollUp', () => {
  cy.window().then((win) => {
    win.scrollTo(0, 0);
  });
});



