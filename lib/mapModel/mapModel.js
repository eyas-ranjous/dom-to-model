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
  const { props } = modelMap;
  Object.entries(props).forEach(([propName, propMap]) => {
    model[propName] = mapProp($, propMap);
  });
  return model;
};

module.exports = mapModel;
