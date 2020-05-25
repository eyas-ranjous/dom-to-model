const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const jquery = require('jquery');
const mapModel = require('../mapModel');

describe('mapModel($, modelMap)', () => {
  it('throw an error if prop data map is not a valid scheme', () => {
    const $ = jquery(new JSDOM('<div></div>').window);
    assert.throw(
      () => mapModel($, ''),
      Error,
      'should be object'
    );

    assert.throw(
      () => mapModel($, {}),
      Error,
      'should have required property \'props\''
    );
  });

  it('map dom to a model object', () => {
    const $ = jquery(
      new JSDOM(
        `<div class="movie" data-id="m1234">
          <div class="title">Star Wars</div>
          <div class="year">1977</div>
          <ul id="cast"><li>Hamill</li><li>Ford</li><li>Fisher</li></ul>
          <p class="budget">$11,000,000</p>
          <p class="runtime">121 min</p>
        </div>
        `
      ).window
    );
    const movieMap = {
      props: {
        id: {
          propType: 'value',
          dataType: 'string',
          path: '.movie',
          dataAttr: 'id'
        },
        title: {
          propType: 'value',
          dataType: 'string',
          path: '.title'
        },
        year: {
          propType: 'value',
          dataType: 'number',
          path: '.year'
        },
        cast: {
          propType: 'list',
          dataType: 'string',
          path: 'ul#cast li'
        },
        details: {
          propType: 'model',
          props: {
            budget: {
              propType: 'value',
              dataType: 'string',
              path: '.budget'
            },
            runtime: {
              propType: 'value',
              dataType: 'string',
              path: '.runtime'
            }
          }
        }
      }
    };
    assert.deepEqual(mapModel($, movieMap), {
      id: 'm1234',
      title: 'Star Wars',
      year: 1977,
      cast: ['Hamill', 'Ford', 'Fisher'],
      details: {
        budget: '$11,000,000',
        runtime: '121 min'
      }
    });
  });
});
