const { Given, When, Then, Before, After } = require('cucumber')
const { expect } = require('chai')
const request = require('request-promise-native')
const HomePage = require('../../pageObjects/home.js')
const promisify = require('../../helpers/promisify.js')

let page
Before(
  promisify(
    async function () {
      page = new HomePage(this.driver)
    }
  )
)

Given(/^I visit the Bike Store website$/,
  promisify(
    async function () {
      await page.open(this.siteUrl)
    }
  )
)

Then(/^I see a list of bikes based on the json data$/,
  promisify(
    async function () {
      const response = await request(this.bikeDataUrl)
      const pageBikes = await page.getBikes()
      const json = JSON.parse(response)
      const bikes = json.items.map((bike) => bike.name)
      expect(bikes.length).equals(pageBikes.length)
      bikes.forEach((bike, index) => {
        const pageBike = pageBikes[index]
        expect(bike.name).equals(pageBike.name)
        expect(bike.description).equals(pageBike.description)
        expect(bike.class).equals(pageBike.classes)
      })
    }
  )
)

After(
  promisify(
    async function () {
      await page.close()
    }
  )
)
