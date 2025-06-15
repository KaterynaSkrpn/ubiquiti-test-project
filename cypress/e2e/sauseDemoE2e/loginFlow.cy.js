import { loginPage, inventoryPage } from '../../selectors/selectors';

describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
  });

  it('logs in successfully with standard_user', () => {
    // Assert login page is loaded
    cy.url().should('include', 'saucedemo.com');
    cy.get(loginPage.usernameInput).should('be.visible');
    cy.get(loginPage.passwordInput).should('be.visible');
    cy.get(loginPage.loginButton).should('be.visible');

    // Fill credentials and submit
    cy.get(loginPage.usernameInput).type('standard_user');
    cy.get(loginPage.passwordInput).type('secret_sauce');
    cy.get(loginPage.loginButton).click();

    // Assert redirected to inventory page
    cy.url().should('include', '/inventory.html');
    cy.get(inventoryPage.inventoryList).should('be.visible');
    cy.get(inventoryPage.inventoryItem).should('have.length.at.least', 1);
  });

  it('shows error for locked_out_user', () => {
    cy.get(loginPage.usernameInput).type('locked_out_user');
    cy.get(loginPage.passwordInput).type('secret_sauce');
    cy.get(loginPage.loginButton).click();

    // Assert error message appears
    cy.get(loginPage.errorMessage)
      .should('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out.');
  });

  it('shows error when fields are empty', () => {
    cy.get(loginPage.loginButton).click();

    cy.get(loginPage.errorMessage)
      .should('be.visible')
      .and('contain.text', 'Username is required');
  });

  it('shows error when password is missing', () => {
    cy.get(loginPage.usernameInput).type('standard_user');
    cy.get(loginPage.loginButton).click();

    cy.get(loginPage.errorMessage)
      .should('be.visible')
      .and('contain.text', 'Password is required');
  });

  it('shows error on incorrect credentials', () => {
    cy.get(loginPage.usernameInput).type('wrong_user');
    cy.get(loginPage.passwordInput).type('wrong_password');
    cy.get(loginPage.loginButton).click();

    cy.get(loginPage.errorMessage)
      .should('be.visible')
      .and('contain.text', 'Username and password do not match any user');
  });

  it('locked_out_user should see a clearly visible error message', () => {
    cy.get(loginPage.usernameInput).type('locked_out_user');
    cy.get(loginPage.passwordInput).type('secret_sauce');
    cy.get(loginPage.loginButton).click();
  
    // Error container should be visible and not empty
    cy.get(loginPage.errorContainer)
      .should('be.visible')
      .and('not.be.empty')
      .invoke('text')
      .should('include', 'Sorry, this user has been locked out.');
  
    // Error message should not be clipped (height > 0 and width > 0)
    cy.get(loginPage.errorContainer)
      .invoke('outerHeight').should('be.gt', 0);
    cy.get(loginPage.errorContainer)
      .invoke('outerWidth').should('be.gt', 0);
  
    // Assert some style properties: red background
    cy.get(loginPage.errorContainer)
      .should('have.css', 'background-color')
      .and('satisfy', (color) => {
        // Accepts red-ish tones (adjust if they change style)
        return color.includes('rgb(226, 35, 26)') || color.includes('rgba(226, 35, 26');
      });
  
  });
  
});
