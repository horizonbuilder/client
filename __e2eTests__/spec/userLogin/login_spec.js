const webdriverio = require('webdriverio');
const appUrl = process.env.APP_URL || 'http://terraceag-client-dev.herokuapp.com';

describe('login page', () => {
  it('has username, password input field', () => {
    browser.url(appUrl);
    expect('input#username').toBeDefined();
    expect('input#password').toBeDefined();
    expect('button[type="submit"]').toBeDefined();
  });

  it('goes to welcome page on successful login', () => {
    browser.url(appUrl);
    browser.setValue('input#username', 'test');
    browser.setValue('input#password', 'test');
    browser.submitForm('button[type="submit"]');
    expect('.styles__Welcome--1dXMW').toBeDefined();
  });

  // it('goes to /Maps on successful login', () => {
  //   browser.url(appUrl);
  //   browser.setValue('input#name', 'test');
  //   browser.setValue('input#password', 'test');
  //   browser.submitForm('input[type="submit"]');
  //   browser.waitUntil(() => {
  //     return browser.getUrl() === appUrl + '/Maps'
  //   }, 5000);
  //   var pageUrl = browser.getUrl();
  //   expect(pageUrl).to.equal(appUrl + '/Maps')
  //   expect('#mapLinks h3').to.have.text('My maps:');
  // })
});
