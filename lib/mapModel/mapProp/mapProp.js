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
const mapProp = ($, propMap) => {
  const ajv = new Ajv();
  if (!ajv.validate(propMapSchema, propMap)) {
    throw new Error(ajv.errors[0].message);
  }

  const { propType } = propMap;

  /* eslint-disable global-require */
  if (propType === 'model') {
    // recursive mapping, a prop of the model is another model
    return require('..').mapModel($, propMap);
  }
  /* eslint-enable global-require */

  if (propType === 'list') {
    return mapList($, propMap);
  }

  if (propType === 'value') {
    return mapValue($, propMap);
  }

  return null;
};

module.exports = mapProp;
