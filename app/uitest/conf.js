exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['smoke.suite.js'],
  multiCapabilities: [{
    browserName: 'firefox'
  }, {
    browserName: 'chrome'
  }],
  baseUrl: 'blankUrl',
  onPrepare: function () {
    browser.driver.manage().window().maximize();
  }
}