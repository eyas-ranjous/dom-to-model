/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const Ajv = require('ajv');
const mapProp = require('./mapProp');
const modelMapSchema = require('./modelMapSchema');

/**
 * @description gets a model object from dom
 * @param {function} $ - jQuery
 * @param {object} modelMap
 * @param {object} containerElement - an optional element to search in.
 * @return {object} the mapped model
 */
const mapModel = ($, modelMap, containerElement = null) => {
  const ajv = new Ajv();
  if (!ajv.validate(modelMapSchema, modelMap)) {
    throw new Error(ajv.errors[0].message);
  }

  const model = {};
  const { props } = modelMap;
  Object.entries(props).forEach(([propName, propMap]) => {
    model[propName] = mapProp($, propMap, containerElement);
  });
  return model;
};

module.exports = mapModel;
