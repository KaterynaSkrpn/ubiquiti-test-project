export const loginPage = {
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  errorMessage: '[data-test="error"]',
  errorContainer: '.error-message-container'
};

export const inventoryPage = {
  footer: '.footer',
  footerCopy: '.footer_copy',
  inventoryList: '.inventory_list',
  inventoryItem: '.inventory_item',
  inventoryItemName: '.inventory_item_name',
  addToCartButton: 'button', // scoped inside inventoryItem
  shoppingCartLink: '.shopping_cart_link',
  appLogo: '.app_logo',
  sortProduct: '[data-test="product_sort_container"]'
};

export const cartPage = {
  cartItem: '.cart_item',
  cartItemName: '.inventory_item_name',
};

export const checkoutPage = {
  checkoutButton: '[data-test="checkout"]',
  firstNameInput: '[data-test="firstName"]',
  lastNameInput: '[data-test="lastName"]',
  postalCodeInput: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
  finishButton: '[data-test="finish"]',
  completeHeader: '.complete-header',
  backHomeBtn: '[data-test="back-to-products"]'
};
export const sideMenu = {
  burgerButton: '#react-burger-menu-btn',
  menuWrap: '.bm-menu-wrap',
  closeButton: '#react-burger-cross-btn',
};
