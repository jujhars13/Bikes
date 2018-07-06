var XMLHttpRequest = require("../utils/XMLHttpRequest").XMLHttpRequest;
var FilterSideBar = require("../uiObject/custom/filterSideBar.element");

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
  * Returns promise with bikes from json data
  *
  * @returns {promice({name, img, description, class}[])}
  */
  getResourceJson() {
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET", "http://localhost:8080/app/bikes.json", false);
    Httpreq.send(null);
    return JSON.parse(Httpreq.responseText);
  };

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