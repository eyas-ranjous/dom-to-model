/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const { JSDOM } = require('jsdom');
const jquery = require('jquery');

/**
 * @description gets a web page dom in a jQuery object
 * @param {string} url
 * @return {Promise} - resolved with jQuery
 */
const fetchDom = (url) => (
  JSDOM.fromURL(url).then(({ window }) => jquery(window))
);

module.exports = fetchDom;
