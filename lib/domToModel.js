/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const fetchDom = require('./fetchDom');
const { mapModel, mapModelCollection } = require('./mapModel');

const MODEL_TYPES = new Set(['single', 'collection']);

/**
 * @description maps dom to a model or model collection
 * @param {object} modelMap
 * @param {string} url
 * @return {Promise} - resolved with a model or a model collection
 */
const domToModel = (modelMap, url) => {
  if (!modelMap.url && !url) {
    return Promise.reject(new Error('missing model web page url'));
  }

  const { modelType } = modelMap;
  if (!MODEL_TYPES.has(modelType)) {
    return Promise.reject(new Error('unknow model type'));
  }

  return fetchDom(modelMap.url || url)
    .then(($) => {
      if (modelType === 'single') return mapModel($, modelMap);
      if (modelType === 'collection') return mapModelCollection($, modelMap);
      return null;
    });
};


module.exports = domToModel;
