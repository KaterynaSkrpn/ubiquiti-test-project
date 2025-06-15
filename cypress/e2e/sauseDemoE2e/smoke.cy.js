import { loginPage, inventoryPage, cartPage, sideMenu } from '../../selectors/selectors';

describe('Side Menu Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.get(loginPage.usernameInput).type('standard_user');
    cy.get(loginPage.passwordInput).type('secret_sauce');
    cy.get(loginPage.loginButton).click();
    cy.url().should('include', '/inventory.html');
  });

  it('should open and close side menu', () => {
    cy.get(sideMenu.burgerButton).click();
    cy.get(sideMenu.menuWrap).should('be.visible');
    cy.get(sideMenu.closeButton).click();
    cy.get(sideMenu.menuWrap).should('not.be.visible');
  });

  it('should have expected menu items in the side menu', () => {
    cy.get('#react-burger-menu-btn').click();
    cy.get('.bm-menu-wrap').within(() => {
      cy.contains('All Items').should('exist');
      cy.contains('About').should('exist');
      cy.contains('Logout').should('exist');
      cy.contains('Reset App State').should('exist');
    });
  });

  it('should logout when clicking Logout in the side menu', () => {
    cy.get('#react-burger-menu-btn').click();
    cy.get('.bm-menu-wrap').contains('Logout').click();
    cy.url().should('eq', 'https://www.saucedemo.com/');
  });
});

describe('Cart Item Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.get(loginPage.usernameInput).type('standard_user');
    cy.get(loginPage.passwordInput).type('secret_sauce');
    cy.get(loginPage.loginButton).click();
    cy.url().should('include', '/inventory.html');
  });

  it('should add an item to cart and show it in cart', () => {
    cy.get(inventoryPage.inventoryItem)
      .first()
      .within(() => {
        cy.get(inventoryPage.addToCartButton).contains('Add to cart').click();
      });

    cy.get(inventoryPage.shoppingCartLink).click();
    cy.get(cartPage.cartItem).should('have.length', 1);
  });

  it('should remove item from cart', () => {
    // Add first item to cart
    cy.get(inventoryPage.inventoryItem)
      .first()
      .within(() => {
        cy.get(inventoryPage.addToCartButton).contains('Add to cart').click();
      });

    cy.get(inventoryPage.shoppingCartLink).click();

    // Remove item
    cy.get(cartPage.cartItem)
      .first()
      .within(() => {
        cy.get('button').contains('Remove').click();
      });

    cy.get(cartPage.cartItem).should('not.exist');
  });
});
