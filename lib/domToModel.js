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
exports.domToModel = async (map, url) => {
  if (!map) {
    throw new Error('missing model map');
  }

  if (!map.url && !url) {
    throw new Error('missing model web page url');
  }

  const { mapType } = map;
  if (!MAP_TYPES.includes(mapType)) {
    throw new Error('unknow model map type');
  }

  const jQuery = await fetchDom(map.url || url);
  if (mapType === 'model') return mapModel(jQuery, map);
  if (mapType === 'collection') return mapCollection(jQuery, map);

  return null;
};
