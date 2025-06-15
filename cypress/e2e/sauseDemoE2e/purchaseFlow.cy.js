import { loginPage, inventoryPage, cartPage, checkoutPage } from '../../selectors/selectors';

describe('SauceDemo Purchase Flow Using Centralized Selectors', () => {
  const customerInfo = {
    firstName: 'Kate',
    lastName: 'Spade',
    postalCode: '18156'
  };

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.get(loginPage.usernameInput).type('standard_user');
    cy.get(loginPage.passwordInput).type('secret_sauce');
    cy.get(loginPage.loginButton).click();

    cy.url().should('include', '/inventory.html');
    cy.get(inventoryPage.inventoryList, { timeout: 10000 }).should('exist');
  });

  
  it('should complete purchase after sorting and verifying cart items', () => {
    const selectedItems = [];

    // Sort by Price (low to high)
    cy.get('.select_container')
    .find('select')
    .select('lohi');
  

    // Add last item (most expensive)
    cy.get(inventoryPage.inventoryItem)
      .last()
      .within(() => {
        cy.get(inventoryPage.inventoryItemName).invoke('text').then(name => {
          selectedItems.push(name.trim());
        });
        cy.get(inventoryPage.addToCartButton).contains('Add to cart').click();
      });

    // Sort by Name (A to Z)
    cy.get('.select_container')
    .find('select').select('az');

    // Add first item (alphabetically first)
    cy.get(inventoryPage.inventoryItem)
        .eq(1)  // top-right product (second in DOM list)
        .within(() => {
      cy.get(inventoryPage.inventoryItemName).invoke('text').then(name => {
        selectedItems.push(name.trim());
      });
      cy.get(inventoryPage.addToCartButton).contains('Add to cart').click();
    });
  
    cy.get(inventoryPage.shoppingCartLink).click(); // Go to cart

    // Validate cart items
    cy.get(cartPage.cartItem).find(cartPage.cartItemName).then(($items) => {
      const cartItems = [...$items].map(el => el.innerText.trim());
      expect(cartItems).to.have.members(selectedItems);
    });

    // Checkout
    cy.get(checkoutPage.checkoutButton).click();
    cy.get(checkoutPage.firstNameInput).type(customerInfo.firstName);
    cy.get(checkoutPage.lastNameInput).type(customerInfo.lastName);
    cy.get(checkoutPage.postalCodeInput).type(customerInfo.postalCode);
    cy.get(checkoutPage.continueButton).click();

    // Validate summary items
    cy.get(cartPage.cartItem).find(cartPage.cartItemName).then(($items) => {
      const summaryItems = [...$items].map(el => el.innerText.trim());
      expect(summaryItems).to.have.members(selectedItems);
    });

    // Finish order
    cy.get(checkoutPage.finishButton).click();
    cy.get(checkoutPage.completeHeader).should('contain', 'Thank you for your order!');
  

  cy.get(checkoutPage.backHomeBtn).click(); //go back to check items are no longer in cart

  cy.url().should('include', '/inventory.html'); // Verify we are back on inventory page

  // Cart badge should not exist or be empty (no items in cart)
  cy.get(inventoryPage.shoppingCartLink).should('exist');
  cy.get('.shopping_cart_badge').should('not.exist');

  // Also verify no cart items remain if navigating to cart
  cy.get(inventoryPage.shoppingCartLink).click();
  cy.get(cartPage.cartItem).should('not.exist');
});

});

