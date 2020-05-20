/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const Ajv = require('ajv');
const mapModelProp = require('./mapModelProp');
const modelMapSchema = require('./schemas/modelMap');

/**
 * @description gets a model object from dom
 * @param {jQuery} $
 * @param {object} modelMap
 * @return {object} the mapped model
 */
const mapModel = ($, modelMap) => {
  const ajv = new Ajv();
  if (!ajv.validate(modelMapSchema, modelMap)) {
    throw new Error(ajv.errors[0].message);
  }

  const model = {};
  Object.entries(modelMap.props).forEach(([propName, propMap]) => {
    model[propName] = mapModelProp($, propMap);
  });
  return model;
};

module.exports = mapModel;
