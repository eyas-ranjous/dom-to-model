/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const mapElement = require('./mapElement');

/**
 * @description maps a list of elements to an array of values
 * @param {jQuery} $
 * @param {object} selector
 * @return {array}
 */
const mapList = ($, selector) => {
  const { path, dataType, dataAttr } = selector;

  const itemElements = $(path);

  if (itemElements.length === 0) return [];

  const items = [];
  itemElements.each(function x() {
    items.push(mapElement($(this), dataType, dataAttr));
  });
  return items;
};

module.exports = mapList;
