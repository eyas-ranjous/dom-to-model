/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const Ajv = require('ajv');
const { mapModel } = require('./mapModel');
const collectionMapSchema = require('./schemas/collectionMapSchema');

/**
 * @description maps dom to a model collection using a collection map
 * @param {function} jQuery
 * @param {object} collectionMap
 * @return {array<object>}
 */
exports.mapCollection = (jQuery, collectionMap) => {
  const ajv = new Ajv();
  if (!ajv.validate(collectionMapSchema, collectionMap)) {
    throw new Error(ajv.errors[0].message);
  }

  const elements = jQuery(collectionMap.itemPath);
  if (elements.length === 0) return [];

  const models = [];
  elements.each((i, element) => {
    models.push(mapModel(jQuery, collectionMap.itemMap, jQuery(element)));
  });

  return models;
};
