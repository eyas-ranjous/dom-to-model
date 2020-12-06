const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const jquery = require('jquery');
const { mapPropToElement } = require('../lib/mapPropToElement');

describe('mapPropToElement(jQuery, propMap)', () => {
  it('throw an error if prop data map is not a valid scheme', () => {
    const $ = jquery(new JSDOM('<div></div>').window);
    assert.throw(
      () => mapPropToElement($, {}),
      Error,
      'should have required property \'propType\''
    );

    assert.throw(
      () => mapPropToElement($, { propType: 'value' }),
      Error,
      'should have required property \'map\''
    );
  });

  it('map a prop from a text element', () => {
    const $ = jquery(new JSDOM('<p id="test">123</p>').window);
    const propMap = {
      propType: 'value',
      map: {
        dataType: 'number',
        path: '#test'
      }
    };
    assert.strictEqual(mapPropToElement($, propMap), 123);
  });

  it('map a prop from an input element', () => {
    const $ = jquery(
      new JSDOM('<input class="test" type="text" value="test" />').window
    );
    const propMap = {
      propType: 'value',
      map: {
        dataType: 'string',
        path: '.test'
      }
    };
    assert.strictEqual(mapPropToElement($, propMap), 'test');
  });

  it('map a prop from a data attribute', () => {
    const $ = jquery(
      new JSDOM('<p id="test" data-val="test-data"></p>').window
    );
    const propMap = {
      propType: 'value',
      map: {
        dataType: 'string',
        path: '#test',
        dataAttr: 'val'
      }
    };
    assert.strictEqual(mapPropToElement($, propMap), 'test-data');
  });

  it('map a prop from a list of elements to an array', () => {
    const $ = jquery(
      new JSDOM('<ul class="test"><li>1</li><li>2</li><li>3</li></ul>').window
    );
    const propMap = {
      propType: 'list',
      map: {
        itemDataType: 'number',
        itemPath: 'ul.test li'
      }
    };
    assert.deepEqual(mapPropToElement($, propMap), [1, 2, 3]);
  });

  it('return a prop to an empty array if list does not exist', () => {
    const $ = jquery(new JSDOM('<p id="test">123</p>').window);
    const propMap = {
      propType: 'list',
      map: {
        itemDataType: 'number',
        itemPath: 'ul.test li'
      }
    };
    assert.deepEqual(mapPropToElement($, propMap), []);
  });

  it('maps a prop from an element', () => {
    const $ = jquery(
      new JSDOM('<div id="test"><p class="num">123</p></div>').window
    );
    const propMap = {
      propType: 'value',
      map: {
        dataType: 'number',
        path: '.num'
      }
    };
    assert.strictEqual(mapPropToElement($, propMap, $('#test')), 123);
  });
});
