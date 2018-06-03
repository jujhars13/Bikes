const { Given, When, Then, After } = require('cucumber')
const { expect } = require('chai')
const request = require('request-promise-native')
const { By } = require('selenium-webdriver')

Given(/^I visit the Bike Store website$/, async function () {
  await this.driver.get(this.siteUrl)
})

Then(/^I see a list of bikes based on the json data$/, async function () {
  const response = await request(this.bikeDataUrl)
  const json = JSON.parse(response)
  const bikes = json.items.map((bike) => bike.name)
  const bikePanels = await this.driver.findElements(By.className('panel panel-primary prod'))
  const bikesOnSite = bikePanels.map(async (panel) => {
    const bikeHeadingContainer = await panel.findElements(By.className('panel-heading ng-binding'))
    const name = bikeHeadingContainer.map((container) => container.getText())
    const bikeDescriptionContainer = await panel.findElement(By.className('panel-body desc ng-binding'))
    const description = bikeDescriptionContainer.getText()
    const bikeFooter = await panel.findElement(By.className('panel-footer'))
    const classContainers = await bikeFooter.findElements(By.className('capitalise ng-binding ng-scope'))
    const classes = classContainers.map((container) => {
      return container.getText()
    })

    return {
      name,
      description,
      classes
    }
  })

  expect(bikes.length).equals(bikesOnSite.length)
  bikes.forEach((bike, index) => {
    const bikeOnSite = bikesOnSite[index]
    expect(bike.name).equals(bikeOnSite.name)
    expect(bike.description).equals(bikeOnSite.description)
    expect(bike.class).equals(bikeOnSite.classes)
  })
})

After(async function () {
  await this.driver.quit()
})
