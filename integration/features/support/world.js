const { Builder } = require('selenium-webdriver')
const { setWorldConstructor, setDefaultTimeout } = require('cucumber')
const DOCKER_MACHINE_IP = process.env.DOCKER_MACHINE_IP

class CustomWorld {
  constructor (callback) {
    this.siteUrl = `http://${DOCKER_MACHINE_IP}:80`
    this.bikeDataUrl = `${this.siteUrl}/bikes.json`
    this.driver = new Builder()
      .usingServer(`http://${DOCKER_MACHINE_IP}:4444/wd/hub`)
      .forBrowser('chrome')
      .build()
  }
}

setWorldConstructor(CustomWorld)
setDefaultTimeout(5 * 1000)
