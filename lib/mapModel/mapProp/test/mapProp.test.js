const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const jquery = require('jquery');
const mapProp = require('../mapProp');

describe('mapProp($, propMap)', () => {
  it('throw an error if prop data map is not a valid scheme', () => {
    const $ = jquery(new JSDOM('<div></div>').window);
    assert.throw(
      () => mapProp($, {}),
      Error,
      'should have required property \'.propType\''
    );

    assert.throw(
      () => mapProp($, { propType: 'value' }),
      Error,
      'should have required property \'.dataType\''
    );

    assert.throw(
      () => mapProp($, { propType: 'value', dataType: 'number' }),
      Error,
      'should have required property \'.path\''
    );

    assert.throw(
      () => mapProp($, { propType: 'model' }),
      Error,
      'should have required property \'.path\''
    );

    assert.throw(
      () => mapProp($, { propType: 'model', path: 'test' }),
      Error,
      'should have required property \'.props\''
    );
  });

  it('map a prop from a text element', () => {
    const $ = jquery(new JSDOM('<p id="test">123</p>').window);
    const propMap = {
      propType: 'value',
      dataType: 'number',
      path: '#test'
    };
    assert.strictEqual(mapProp($, propMap), 123);
  });

  it('map a prop from an input element', () => {
    const $ = jquery(
      new JSDOM('<input class="test" type="text" value="test" />').window
    );
    const propMap = {
      propType: 'value',
      dataType: 'string',
      path: '.test'
    };
    assert.strictEqual(mapProp($, propMap), 'test');
  });

  it('map a prop from a data attribute', () => {
    const $ = jquery(
      new JSDOM('<p id="test" data-val="test-data"></p>').window
    );
    const propMap = {
      propType: 'value',
      dataType: 'string',
      path: '#test',
      dataAttr: 'val'
    };
    assert.strictEqual(mapProp($, propMap), 'test-data');
  });
});
