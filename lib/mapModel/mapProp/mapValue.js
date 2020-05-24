/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const mapElement = require('./mapElement');

/**
 * @description maps a an element content to a value
 * @param {jQuery} $
 * @param {object} propMap
 * @return {number|string|boolean|null}
 */
const mapValue = ($, propMap) => {
  const { path, dataType, dataAttr } = propMap;
  return mapElement($(path), dataType, dataAttr);
};

module.exports = mapValue;
