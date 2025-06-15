Automated Cypress Tests for SauceDemo (UI, Cart, Login, Checkout)

This project contains automated end-to-end tests for the [SauceDemo](https://www.saucedemo.com) web application using Cypress. The test suite covers login, cart functionality, purchase flow, and side menu behavior.

Test Coverage

 Login Flow:
Standard login
- Locked out user behavior
- Input validation (empty or incorrect credentials)
- UI styling of error messages

Cart & Checkout:
Add/remove items
- Validate cart contents
- Complete purchase
   Verify post-purchase behavior

Side Menu:
- Toggle menu open/close
- Verify presence of menu options
- Logout via side menu

Best Practices:
- Centralized selectors
- beforeEach() setup for test isolation
- Clear test names and assertions
- Functional + visual validations

Prerequisites:
Before running the tests, ensure the following are installed on your machine:

- Node.js (https://nodejs.org/) (version 14 or higher)
- npm (comes with Node.js)

  1. Clone the Repository
  2. Install Dependencies -- npm install
  3. Install Cypress
 in studio terminal write: npm install cypress --save-dev

How to run the tests: 
You can either run the tests in studio by running command in studio terminal:  npx cypress run

Or you can run them in browser, then you need to write command npx cypress open 
