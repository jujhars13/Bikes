const Page = require('./page.js')
const { By } = require('selenium-webdriver')

async function findByClass (element, classNames) {
  const elements = await element.findElements(By.className(classNames))
  return elements
}

module.exports = class HomePage extends Page {
  constructor (driver) {
    super('Bike Store', driver)
  }

  open (path) {
    super.open(path)
  }

  close () {
    super.close()
  }

  async getBikePanels () {
    const panels = await findByClass(this.driver, 'panel panel-primary prod')
    return panels
  }

  async getBikeHeadings () {
    const headings = await findByClass(this.driver, 'panel-heading ng-binding')
    return headings
  }

  async getPanelData (panel) {
    const bikeHeadingContainer = await findByClass(panel, 'panel-heading ng-binding')
    const name = bikeHeadingContainer.map((container) => container.getText())
    const bikeDescriptionContainer = await findByClass(panel, 'panel-body desc ng-binding')
    const description = bikeDescriptionContainer.getText()
    const bikeFooter = await findByClass(panel, 'panel-footer')
    const classContainers = await findByClass(bikeFooter, 'capitalise ng-binding ng-scope')
    const classes = classContainers.map((container) => container.getText())

    return {
      name,
      description,
      classes
    }
  }

  async getBikes () {
    const panels = await this.getBikePanels()
    const bikes = await panels.map(this.getPanelData)
    return bikes
  }
}
