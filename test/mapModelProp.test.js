const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const jquery = require('jquery');
const mapModelProp = require('../src/mapModelProp');

describe('.mapModelProp($, modelPropMap)', () => {
  it('throw an error if prop data map is not a valid scheme', () => {
    const $ = jquery(new JSDOM('<div></div>').window);
    assert.throw(
      () => mapModelProp($, {}),
      Error,
      'should have required property \'type\''
    );

    assert.throw(
      () => mapModelProp($, { type: 'string' }),
      Error,
      'should have required property \'.selector\''
    );

    assert.throw(
      () => mapModelProp($, { type: 'model' }),
      Error,
      'should have required property \'.model\''
    );

    assert.throw(
      () => mapModelProp($, { type: 'string', selector: {} }),
      Error,
      'should have required property \'path\''
    );
  });

  it('map a prop from a text element', () => {
    const $ = jquery(new JSDOM('<p id="test">123</p>').window);
    const modelPropMap = {
      type: 'number',
      selector: {
        path: '#test'
      }
    };
    assert.strictEqual(mapModelProp($, modelPropMap), 123);
  });

  it('map a prop from an input element', () => {
    const $ = jquery(
      new JSDOM('<input class="test" type="text" value="test" />').window
    );
    const modelPropMap = {
      type: 'string',
      selector: {
        path: '.test'
      }
    };
    assert.strictEqual(mapModelProp($, modelPropMap), 'test');
  });

  it('map a prop from a data attribute', () => {
    const $ = jquery(
      new JSDOM('<p id="test" data-val="test-data"></p>').window
    );
    const modelPropMap = {
      type: 'string',
      selector: {
        path: '#test',
        data: 'val'
      }
    };
    assert.strictEqual(mapModelProp($, modelPropMap), 'test-data');
  });
});
