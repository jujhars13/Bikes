var BaseElement = require("./base.element");

class Checkbox extends BaseElement {
  /*
  * Select checkbox
  */
  select(){
    return this.set(true)
  }

  /*
  * Deselect checkbox
  */
  deselect(){
    return this.set(false)
  }
  
  /*
  * Set checkbox state
  * 
  * @param {boolean} state
  */
  set(value){
    return this.element.isSelected().then(selected => {
      if(selected != value) {
        this.click();
      } else {
          console.warn(`Checkbox ${this.element.locator()} was already selected, skipping select`);
      }
    });
  }
}

module.exports = Checkbox;