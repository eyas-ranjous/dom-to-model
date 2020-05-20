const { assert } = require('chai');
const fetchDom = require('../src/fetchDom');

describe('.fetchDom(url)', () => {
  it('fetchs the dom content of a page and resolve with jQuery', () => (
    fetchDom('https://www.lipsum.com')
      .then(($) => assert.equal($('#Inner h1:first').text(), 'Lorem Ipsum'))
  ));
});
