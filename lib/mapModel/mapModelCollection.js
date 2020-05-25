/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const Ajv = require('ajv');
const mapModel = require('./mapModel');
const modelCollectionMapSchema = require('./modelCollectionMapSchema');

/**
 * @description gets a model object from dom
 * @param {jQuery} $
 * @param {object} modelCollectionMap
 * @return {object} the mapped model collection
 */
const mapModelCollection = ($, modelCollectionMap) => {
  const ajv = new Ajv();
  if (!ajv.validate(modelCollectionMapSchema, modelCollectionMap)) {
    throw new Error(ajv.errors[0].message);
  }

  const { itemPath, itemMap } = modelCollectionMap;
  const elements = $(itemPath);

  if (elements.length === 0) return [];

  const models = [];
  elements.each(function x() {
    models.push(mapModel($, itemMap, $(this)));
  });
  return models;
};

module.exports = mapModelCollection;
