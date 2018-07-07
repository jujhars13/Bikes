var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var FilterSideBar = require("../uiObject/custom/filterSideBar.element");
var ArrayUtils = require('../utils/array.utils');

class BikesPage {
  constructor() {
    this.filterSideBar = new FilterSideBar(element.all(by.css('#filters-list .filter')));
  }

  /*
  * Returns promise with bikes shown on ui
  *
  * @returns {promice({name, img, description, class}[])}
  */
  getBikes() {
    var bikeWebElements = element.all(by.css('.prodList > div'));
    var bikes = [];
    var scope = this;
    return bikeWebElements.each(function (element) {
      var bike = {};
      element.element(by.css('.panel-heading')).getText().then((res) => bike.name = res);
      element.element(by.css('img')).getAttribute('src').then((res) => bike.img = res);
      element.element(by.css('.panel-body.desc')).getText().then((res) => bike.description = res);
      element.element(by.css('.panel-footer')).getText().then((res) => bike.class = scope.convertStringToClassArray(res));
      bikes.push(bike);
    }).then(() => bikes);
  };

  /*
  * Returns promise with filters shown on ui
  *
  * @returns {promice({name, checkbox}[])}
  */
  getFilters() {
    return this.filterSideBar.getFilters();
  };

  /*
  * Set filters by names array
  * 
  * @param {string[]} class array
  */
  setFilters(classArray){
    this.filterSideBar.getFilters().then(() =>{
      classArray.forEach(className => {
        this.filterSideBar.selectFilterByName(className)
      });
    });
  }

  /*
  * Returns promise with bikes from json data
  *
  * @returns {promice({name, img, description, class}[])}
  */
  getResourceJson() {
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET", browser.baseUrl + "/bikes.json", false);
    Httpreq.send(null);
    return JSON.parse(Httpreq.responseText);
  };

  /*
  * Returns promise with TRUE if correct bikes are shown according to selected filters
  * or FALSE 
  *
  * @selectedFilters {string[]} string array with filters
  * @param {jsonArray} bikes json Array
  * 
  * @returns {promice(boolean)}
  */
  isCorrectBikesAreShown(selectedFilters, bikesJson){
    return this.getBikes().then((bikes) => {
      var isCorrect = true;
      bikesJson.items.forEach(bike => {
        if(ArrayUtils.arrayContainsArray(bike.class, selectedFilters)){
          var expectedBike = bikes.find(x => x.name == bike.name);
          isCorrect = !isCorrect ? isCorrect : expectedBike != undefined;
        }
      });
      return isCorrect;
    });
  }

  /*
  * Returns promise with TRUE if all expected filters are displayed
  * or FALSE 
  *
  * @param {jsonArray} bikes json Array
  * 
  * @returns {promice(boolean)}
  */
  isEveryClassHasFilter(jsonBikes){
    var classes = [];
    var isCorrect = true;
    jsonBikes.items.forEach(bike => classes = ArrayUtils.concatUnique(classes, bike.class));
    return this.getFilters().then((filters) => {
      classes.forEach((className) => {
        var expectedFilter = filters.find(filter => filter.name.toLowerCase() == className.toLowerCase());
        isCorrect = !isCorrect ? isCorrect : expectedFilter != undefined;
      })
      return isCorrect;
    })
  }

  /*
  * Converts string with classes from ui to strings array
  *
  * @param {string} class text
  * 
  * @returns string[]
  */
  convertStringToClassArray(text){
    var regex = /Class:(.*)/gm;
    var matches = regex.exec(text);
    var classes = matches[1];
    classes = classes.replace(/ /g, '');
    var classesArray = classes.split(',');
    return classesArray.map(x => x.charAt(0).toUpperCase().concat(x.slice(1).toLowerCase()));
  }
}

module.exports = new BikesPage();