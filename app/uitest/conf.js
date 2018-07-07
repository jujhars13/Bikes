var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
  framework: 'jasmine',
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Spec patterns are relative to the configuration file location passed
  // to protractor (in this example conf.js).
  // They may include glob patterns.
  specs: ['specs/smoke.spec.js'],

  // Capabilities to be passed to the webdriver instance.
  multiCapabilities: [{
    browserName: 'firefox'
  }, {
    browserName: 'chrome'
  }],

  // This URL will be used as browser.baseUrl
  baseUrl: 'blankUrl',

  // This funtion will be run as setup before tests
  onPrepare: function () {
    browser.driver.manage().window().maximize();

    // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'tmp/report',
      takeScreenShotsOnlyForFailedSpecs: true, 
      screenshotsSubfolder: 'images', 
      jsonsSubfolder: 'jsons',
      preserveDirectory: false
   }).getJasmine2Reporter());
  },

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  }
}