const { assert } = require('chai');
const { fetchDom } = require('../lib/fetchDom');

describe('.fetchDom(url)', () => {
  it('fetch dom of a page and resolve with jQuery', async () => {
    const jQuery = await fetchDom('https://www.lipsum.com');
    assert.equal(jQuery('#Inner h1:first').text(), 'Lorem Ipsum');
  }).timeout(20000);
});
