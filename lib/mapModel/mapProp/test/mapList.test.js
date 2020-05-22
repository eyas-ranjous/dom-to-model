const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const jquery = require('jquery');
const mapList = require('../mapList');

describe('mapProp/mapList($, selector)', () => {
  it('return empty array when element does not exist', () => {
    const $ = jquery(new JSDOM('<p id="test">123</p>').window);
    assert.deepEqual(mapList($, {}), []);
  });

  it('map an list of elements to an array', () => {
    const $ = jquery(
      new JSDOM('<ul class="test"><li>1</li><li>2</li><li>3</li></ul>').window
    );
    const selector = {
      dataType: 'number',
      path: 'ul.test li'
    };
    assert.deepEqual(mapList($, selector), [1, 2, 3]);
  });
});
