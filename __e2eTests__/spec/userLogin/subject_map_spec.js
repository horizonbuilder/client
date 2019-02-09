const webdriverio = require('webdriverio');
const appUrl = process.env.APP_URL || 'http://terraceag-client-dev.herokuapp.com';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('subject property map view ', () => {
  it('should toggle a custom layer', () => {
    browser.url(appUrl);
    browser.setValue('input#username', 'test');
    browser.setValue('input#password', 'test');
    browser.submitForm('button[type="submit"]');
    browser.waitForExist('.styles__Welcome--1dXMW');

    browser.url(appUrl + '/workfiles/1/map');
    browser.waitForExist('.styles__LayerToggle--QDjYG');

    browser.click('.styles__LayerToggle--QDjYG');
    let layerOpacity = $('.leaflet-layer').getCssProperty('opacity');
    expect(layerOpacity.value).toEqual(1);
    browser.click('.styles__LayerToggle--QDjYG');
    layerOpacity = $('.leaflet-layer').getCssProperty('opacity');
    expect(layerOpacity.value).toEqual(0);
  });

  it('should toggle group visibility', () => {
    browser.url(appUrl);
    browser.setValue('input#username', 'test');
    browser.setValue('input#password', 'test');
    browser.submitForm('button[type="submit"]');
    browser.waitForExist('.styles__Welcome--1dXMW');

    browser.url(appUrl + '/workfiles/1/map');
    browser.waitForExist('.leaflet-interactive');

    let redPolygon = $('.leaflet-interactive[fill="#ff0000"]');
    browser.click('.styles__ToggleContainer--T7cC4 input');
    let fill = redPolygon.getAttribute('fill');
    expect(fill).toEqual('none');
  });
});
