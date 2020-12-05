/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const { fetchDom } = require('./fetchDom');
const { mapModel } = require('./mapModel');
const { mapCollection } = require('./mapCollection');

const MAP_TYPES = ['model', 'collection'];

/**
 * @description maps dom to a model or a model collection
 * @param {object} map
 * @param {string} url
 * @return {Promise<object|array<object>>}
 */
exports.domToModel = async (url, modelMap) => {
  if (!url) {
    throw new Error('missing web page url');
  }

  if (!modelMap) {
    throw new Error('missing model map');
  }

  const { mapType } = modelMap;
  if (!MAP_TYPES.includes(mapType)) {
    throw new Error('unknow model map type');
  }

  const jQuery = await fetchDom(modelMap.url || url);
  if (mapType === 'model') return mapModel(jQuery, modelMap);
  if (mapType === 'collection') return mapCollection(jQuery, modelMap);

  return null;
};
