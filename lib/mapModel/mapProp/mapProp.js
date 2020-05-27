/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

/* eslint-disable global-require */
const Ajv = require('ajv');
const mapElement = require('./mapElement');
const propMapSchema = require('./propMapSchema');

/**
 * @description maps a dom element to a model prop
 * @param {function} $ - jQuery
 * @param {object} propMap
 * @param {object} containerElement - an optional element to search in.
 * @return {number|string|boolean|array|object}
 */
const mapProp = ($, propMap, containerElement = null) => {
  const ajv = new Ajv();
  if (!ajv.validate(propMapSchema, propMap)) {
    throw new Error(ajv.errors[0].message);
  }

  const { propType, map } = propMap;

  if (propType === 'model') {
    // recursive mapping, a prop of the model is another model
    return require('..').mapModel($, map);
  }

  if (propType === 'list') {
    const { itemDataType } = map;
    if (itemDataType === 'model') {
      // recursive mapping, the list prop is a model collection
      return require('..').mapModelCollection($, map);
    }

    const { itemPath, dataAttr } = map;
    const elements = containerElement
      ? containerElement.find(itemPath)
      : $(itemPath);

    if (elements.length === 0) return [];

    const items = [];
    elements.each(function x() {
      items.push(mapElement($(this), itemDataType, dataAttr));
    });
    return items;
  }

  if (propType === 'value') {
    const { path, dataType, dataAttr } = map;
    return mapElement(
      containerElement ? containerElement.find(path) : $(path),
      dataType,
      dataAttr
    );
  }

  return null;
};

module.exports = mapProp;
