/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const Ajv = require('ajv');
const mapModel = require('./mapModel');
const modelPropMapSchema = require('./schemas/modelPropMap');

/**
 * @description gets a model prop value from dom
 * @param {jQuery} $
 * @param {object} modelPropMap
 * @return {number|string|object}
 */
const mapModelProp = ($, modelPropMap) => {
  const ajv = new Ajv();
  if (!ajv.validate(modelPropMapSchema, modelPropMap)) {
    throw new Error(ajv.errors[0].message);
  }

  const { type: propType } = modelPropMap;

  if (propType === 'model') return mapModel($, modelPropMap.model);

  const cast = (value) => {
    if (propType === 'number') return +value;
    if (propType === 'boolean') return !!value;
    return value;
  };

  const { selector: { path, data } } = modelPropMap;
  const element = $(path);

  if (element.length === 0) return null;

  if (data) {
    return cast(element.data(data));
  }

  if (element.prop('tagName').toLowerCase() === 'input') {
    return cast(element.val());
  }

  const value = element
    .clone()
    .children()
    .remove()
    .end()
    .text()
    .trim();

  return cast(value);
};

module.exports = mapModelProp;
