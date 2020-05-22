/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const Ajv = require('ajv');
const mapValue = require('./mapValue');
const mapList = require('./mapList');
const propMapSchema = require('./propMapSchema');

/**
 * @description gets a model prop value from dom
 * @param {jQuery} $
 * @param {object} propMap
 * @return {number|string|object}
 */
const mapModelProp = ($, propMap) => {
  const ajv = new Ajv();
  if (!ajv.validate(propMapSchema, propMap)) {
    throw new Error(ajv.errors[0].message);
  }

  const { propType, selector } = propMap;

  /* eslint-disable global-require */
  if (propType === 'model') {
    // recursive mapping, a prop of the model is another model
    const mapModel = require('..');
    return mapModel($, selector);
  }
  /* eslint-enable global-require */

  if (propType === 'list') {
    return mapList($, selector);
  }

  return mapValue($, selector);
};

module.exports = mapModelProp;
