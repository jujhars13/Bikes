var BaseElement = require("../base.element");
var Checkbox = require("../checkbox.element");

class FilterSideBar extends BaseElement {
  /*
  * Returns promise with filters shown on ui
  *
  * @returns {promice({name, checkbox}[])}
  */
  getFilters() {
    var filters = [];
    return this.element.each((element) => {
      var filter = {};
      filter.checkbox = new Checkbox(element.element(by.css('input[type="checkbox"]')));
      element.element(by.css('span')).getText().then((res) => filter.name = res);
      filters.push(filter);
    }).then(() => this.filters = filters);
  };

  /*
  * Select filter by name
  * 
  * @name{string} class name
  */
  selectFilterByName(name){
    this.getFilters().then(() =>{
      expect(() => this.filters.find(x => x.name.toLowerCase() == name.toLowerCase()).checkbox.select()).not.toThrow();
    });
  }

  /*
  * Deselect filter by name
  * 
  * @name {string} class name
  */
  deselectFilterByName(name){
    this.getFilters().then(() =>{
      expect(() => this.filters.find(x => x.name.toLowerCase() == name.toLowerCase()).checkbox.deselect()).not.toThrow();
    });
  }

  /*
  * Returns promise with TRUE if filter is selected
  * or FALSE 
  * 
  * @name {string} class name
  * 
  * @returns {promice(boolean)}
  */
  isFilterSelected(name){
    return this.getFilters().then(() =>{
      return this.filters.find(x => x.name.toLowerCase() == name.toLowerCase()).checkbox.isSelected();
    });
  }
}

module.exports = FilterSideBar;