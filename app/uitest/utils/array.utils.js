class ArrayUtils {
  constructor() {}

  /*
  * Returns promise TRUE if the first specified array contains all elements
  * from the second one. FALSE otherwise.
  *
  * @param {array} superset
  * @param {array} subset
  *
  * @returns {boolean}
  */
  arrayContainsArray (superset, subset) {
   return subset.every((value) => {
     return (superset.indexOf(value) >= 0);
   });
 }
}

module.exports = new ArrayUtils();