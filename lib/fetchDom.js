/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

const { JSDOM } = require('jsdom');
const jQuery = require('jquery');

/**
 * @description retrieves the dom content of a url into a jQuery
 * @param {string} url
 * @return {Promise<jQuery>}
 */
exports.fetchDom = async (url) => {
  const { window } = await JSDOM.fromURL(url);
  return jQuery(window);
};
