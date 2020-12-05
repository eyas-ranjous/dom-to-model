/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

/* eslint-disable global-require */
const Ajv = require('ajv');
const propMapSchema = require('./schemas/propMapSchema');
const { mapElementToValue } = require('./mapElementToValue');

/**
 * @description maps a dom element to a model prop
 * @param {function} jQuery
 * @param {object} propMap
 * @param {object} parentElement - an optional parent element to search inside
 * @return {number|string|boolean|array|object}
 */
exports.mapPropToElement = (jQuery, propMap, parentElement = null) => {
  const ajv = new Ajv();
  if (!ajv.validate(propMapSchema, propMap)) {
    throw new Error(ajv.errors[0].message);
  }

  /**
   * @description map a model prop
   * @return {object}
   */
  const mapModelProp = () => {
    const { mapModel } = require('./mapModel');
    return mapModel(jQuery, propMap.map);
  };

  /**
   * @description map a collection prop
   * @return {array<object>}
   */
  const mapCollectionProp = () => {
    const { mapCollection } = require('./mapCollection');
    return mapCollection(jQuery, propMap.map);
  };

  /**
   * @description map a list prop
   * @return {array<object>}
   */
  const mapListProp = () => {
    const { itemDataType } = propMap.map;
    if (itemDataType === 'model') return mapCollectionProp();

    const { itemPath, dataAttr } = propMap.map;
    const elements = parentElement ? parentElement.find(itemPath) : jQuery(itemPath);

    if (elements.length === 0) return [];

    const items = [];
    elements.each((i, element) => {
      items.push(mapElementToValue(jQuery(element), itemDataType, dataAttr));
    });

    return items;
  };

  /**
   * @description map a value prop
   * @return {number|boolean|string}
   */
  const mapValueProp = () => {
    const { path, dataType, dataAttr } = propMap.map;
    const element = parentElement ? parentElement.find(path) : jQuery(path);
    return mapElementToValue(element, dataType, dataAttr);
  };

  const { propType } = propMap;
  if (propType === 'model') return mapModelProp();
  if (propType === 'list') return mapListProp();
  if (propType === 'value') return mapValueProp();

  return null;
};
