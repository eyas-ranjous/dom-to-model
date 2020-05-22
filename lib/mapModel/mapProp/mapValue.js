/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const mapElement = require('./mapElement');

/**
 * @description maps a an element content to a value
 * @param {object} selector
 * @return {number|string|boolean|null}
 */
const mapValue = ($, selector) => {
  const { path, dataType, dataAttr } = selector;
  return mapElement($(path), dataType, dataAttr);
};

module.exports = mapValue;
