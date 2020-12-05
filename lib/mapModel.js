/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const Ajv = require('ajv');
const { mapPropToElement } = require('./mapPropToElement');
const modelMapSchema = require('./schemas/modelMapSchema');

/**
 * @description maps dom to a model using a model map
 * @param {function} jQuery
 * @param {object} modelMap
 * @param {object} parentElement - an optional element to search in.
 * @return {object}
 */
exports.mapModel = (jQuery, modelMap, parentElement = null) => {
  const ajv = new Ajv();
  if (!ajv.validate(modelMapSchema, modelMap)) {
    throw new Error(ajv.errors[0].message);
  }

  const model = {};
  Object.entries(modelMap.props).forEach(([propName, propMap]) => {
    model[propName] = mapPropToElement(jQuery, propMap, parentElement);
  });

  return model;
};
