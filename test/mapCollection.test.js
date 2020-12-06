const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const jquery = require('jquery');
const { mapCollection } = require('../lib/mapCollection');

describe('mapCollection(jQuery, collectionMap)', () => {
  it('throw an error if prop data map is not a valid scheme', () => {
    const $ = jquery(new JSDOM('<div></div>').window);
    assert.throw(
      () => mapCollection($, ''),
      Error,
      'should be object'
    );

    assert.throw(
      () => mapCollection($, {}),
      Error,
      'should have required property \'itemPath\''
    );

    assert.throw(
      () => mapCollection($, { itemPath: 'test' }),
      Error,
      'should have required property \'itemMap\''
    );
  });

  it('map dom to a model object', () => {
    const $ = jquery(
      new JSDOM(
        `<ul class="employees">
          <li><p class="name">name 1</p><p class="salary">5000</p></li>
          <li><p class="name">name 2</p><p class="salary">6000</p></li>
          <li><p class="name">name 3</p><p class="salary">7000</p></li>
        </ul>
        `
      ).window
    );
    const moviesMap = {
      itemPath: '.employees li',
      itemMap: {
        props: {
          name: {
            propType: 'value',
            map: {
              dataType: 'string',
              path: '.name'
            }
          },
          salary: {
            propType: 'value',
            map: {
              dataType: 'string',
              path: '.salary'
            }
          }
        }
      }
    };

    assert.deepEqual(mapCollection($, moviesMap), [
      { name: 'name 1', salary: '5000' },
      { name: 'name 2', salary: '6000' },
      { name: 'name 3', salary: '7000' }
    ]);
  });
});
