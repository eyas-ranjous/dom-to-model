/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const mapElement = require('./mapElement');

/**
 * @description maps a list of elements to an array of values
 * @param {jQuery} $
 * @param {object} propMap
 * @return {array}
 */
const mapList = ($, propMap) => {
  const { propType } = propMap;

  /* eslint-disable global-require */
  if (propType === 'model') {
    // recursive mapping, the list prop is a collection of another model
    const { mapModelCollection } = require('..');
    return mapModelCollection($, propMap);
  }
  /* eslint-enable global-require */

  const { path, dataType, dataAttr } = propMap;
  const elements = $(path);

  if (elements.length === 0) return [];

  const items = [];
  elements.each(function x() {
    items.push(mapElement($(this), dataType, dataAttr));
  });
  return items;
};

module.exports = mapList;
