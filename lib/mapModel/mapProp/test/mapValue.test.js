const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const jquery = require('jquery');
const mapValue = require('../mapValue');

describe('mapProp/mapValue($, selector)', () => {
  it('return null when element does not exist', () => {
    const $ = jquery(new JSDOM('<p id="test">123</p>').window);
    assert.deepEqual(mapValue($, {}), null);
  });

  it('map an element to a value', () => {
    const $ = jquery(
      new JSDOM('<p class="test">123</p>').window
    );
    const propMap = {
      propType: 'value',
      dataType: 'number',
      path: 'p.test'
    };
    assert.deepEqual(mapValue($, propMap), 123);
  });
});
