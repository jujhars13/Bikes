class ArrayUtils {
  constructor() {}

  /*
  * Returns promise TRUE if the first specified array contains all elements
  * from the second one. FALSE otherwise.
  *
  * @superset {array} superset
  * @subset {array} subset
  *
  * @returns {boolean}
  */
  arrayContainsArray (superset, subset) {
    return subset.every((value) => {
      return (superset.indexOf(value) >= 0);
    });
  }

  /*
  * Returns merged array
  *
  * @superset {array} superset
  * @subset {array} subset
  *
  * @returns {array}
  */
  concatUnique(superset, subset){
    return superset.concat(subset.filter((item) => superset.indexOf(item) < 0));
  }
}

module.exports = new ArrayUtils();