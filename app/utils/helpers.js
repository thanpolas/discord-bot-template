/**
 * @fileoverview Generic helpers
 */

const Bluebird = require('bluebird');

const helpers = (module.exports = {});

/**
 * Executes concurrently the Function "fn" against all the  items in the array.
 * Throttles of concurrency to 5.
 *
 * Use when multiple I/O operations need to be performed.
 *
 * @param {Array<*>} items Items.
 * @param {function(*): Promise<*>} fn Function to be applied on the array items.
 * @return {Promise<*>}
 */
helpers.asyncMapCap = (items, fn) =>
  Bluebird.map(items, fn, { concurrency: 5 });

/**
 * An async delay, to time sending messages.
 *
 * @param {number} seconds How many seconds to wait.
 * @return {Promise<void>}
 */
helpers.delay = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};

/**
 * Will split a string based on its length using numChars or the default value
 * of 1800 which is intented for spliting long discord messages (limit at 2000).
 *
 * @param {string} str The string to split.
 * @param {number=} [numChars=1800] Number of characters to split the string into.
 * @return {Array<string>} An array of strings, split based on the numChars.
 */
helpers.splitString = (str, numChars = 1800) => {
  const ret = [];
  let offset = 0;
  while (offset < str.length) {
    ret.push(str.substring(offset, numChars + offset));
    offset += numChars;
  }

  return ret;
};

/**
 * Returns a random number from 0 up to a total of maximum numbers
 * (not inclusive) as defined.
 *
 * @param {number} max Maximum random number to return.
 * @return {number} A random integer number.
 */
helpers.getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
