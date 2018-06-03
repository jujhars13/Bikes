module.exports = class Page {
  constructor (title, driver) {
    this.title = title
    this.driver = driver
  }

  open (path) {
    try {
      this.driver.get(path)
    } catch (err) {
      
    }
  }

  close () {
    try {
      this.driver.quit()
    } catch (err) {
      
    }
  }
}
