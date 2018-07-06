class BaseElement {
  constructor(element) {
    this.element = element;
  }

  /*
  * Returns promise with TRUE if element is selected
  * or FALSE 
  *
  * @returns {promice(boolean)}
  */
  isSelected(){
    return this.element.isSelected()
  }

  /*
  * Click element
  */
  click(){
    this.element.click();
  }
};

module.exports = BaseElement;