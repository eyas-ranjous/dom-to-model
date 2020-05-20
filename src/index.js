/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const fetchDom = require('./fetchDom');
const mapModel = require('./mapModel');

module.exports = (url, modelMap) => (
  fetchDom(url || modelMap.url)
  .then(($) =>  mapModel($, modelMap))
);
