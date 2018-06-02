const {Builder, until} = require('selenium-webdriver')
const SeleniumServer = require('selenium-webdriver/remote').SeleniumServer
const DOCKER_MACHINE_IP = process.env.DOCKER_MACHINE_IP
const hubUrl = `http://${DOCKER_MACHINE_IP}:4444/wd/hub`
const pageUrl = `http://${DOCKER_MACHINE_IP}:80`

async function example () {
  const driver = await new Builder()
    .usingServer(hubUrl)
    .forBrowser('firefox')
    .build()
  try {
    await driver.get(pageUrl)
    const title = await driver.getTitle()
    console.log('The title is ', title)
    await driver.wait(until.titleIs('Bike Store'), 1000)
  } finally {
    await driver.quit()
  }
}

example()
