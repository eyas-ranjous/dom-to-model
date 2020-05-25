/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const fetchDom = require('./fetchDom');
const { mapModel, mapModelCollection } = require('./mapModel');

module.exports = (url, modelMap) => (
  fetchDom(url || modelMap.url).then(($) => {
    const { modelType } = modelMap;

    if (modelType === 'single') return mapModel($, modelMap);
    if (modelType === 'collection') return mapModelCollection($, modelMap);

    return Promise.reject(new Error('unknow model type'));
  })
);
