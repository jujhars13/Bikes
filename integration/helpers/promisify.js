module.exports = function promisify (func) {
  return function () {
    try {
      func()
    } catch (err) {
      console.error('Promise rejected', err)
    }
  }
}
