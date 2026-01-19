import '../support/commands';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
