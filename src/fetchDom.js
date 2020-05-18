const { JSDOM } = require('jsdom');
const jquery = require('jquery');

const fetchDom = (url) => (
  JSDOM.fromURL(url).then(({ window }) => jquery(window))
);

module.exports = fetchDom;
