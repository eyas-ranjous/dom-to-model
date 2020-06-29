const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const jquery = require('jquery');
const mapElement = require('../../../lib/mapModel/mapProp/mapElement');

describe('mapProp/mapElement(element, dataType, dataAttr)', () => {
  it('return null when element does not exist', () => {
    const $ = jquery(new JSDOM('<p id="test">123</p>').window);
    assert.strictEqual(mapElement($('nothing')), null);
  });

  it('map an input element', () => {
    const $ = jquery(
      new JSDOM('<input class="test" type="text" value="test" />').window
    );
    assert.strictEqual(mapElement($('.test')), 'test');
  });

  it('map a text element', () => {
    const $ = jquery(
      new JSDOM('<p id="test">text content</p>').window
    );
    assert.strictEqual(mapElement($('#test')), 'text content');
  });

  it('map an element with number value', () => {
    const $ = jquery(
      new JSDOM('<p id="test">1234</p>').window
    );
    assert.strictEqual(mapElement($('#test'), 'number'), 1234);
  });

  it('map an element with boolean value', () => {
    const $ = jquery(
      new JSDOM('<p id="test"></p>').window
    );
    assert.strictEqual(mapElement($('#test'), 'boolean'), false);
  });

  it('map a prop from a data attribute', () => {
    const $ = jquery(
      new JSDOM('<p id="test" data-abc="test-data"></p>').window
    );
    assert.strictEqual(mapElement($('#test'), 'string', 'abc'), 'test-data');
  });
});
