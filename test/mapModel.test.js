const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const jquery = require('jquery');
const mapModel = require('../src/mapModel');

describe('.mapModel($, modelMap)', () => {
  it('throw an error if prop data map is not a valid scheme', () => {
    const $ = jquery(new JSDOM('<div></div>').window);
    assert.throw(
      () => mapModel($, ''),
      Error,
      'should be object'
    );
  });

  it('map dom to a model object', () => {
    const $ = jquery(
      new JSDOM(
        `<div class="movie" data-id="m1234">
          <div class="title">Star Wars</div>
          <div class="year">1977</div>
        </div>
        `
      ).window
    );
    const movieMap = {
      props: {
        id: {
          type: 'string',
          selector: {
            path: '.movie',
            data: 'id'
          }
        },
        title: {
          type: 'string',
          selector: {
            path: '.title'
          }
        },
        year: {
          type: 'number',
          selector: {
            path: '.year'
          }
        }
      }
    };
    assert.deepEqual(mapModel($, movieMap), {
      id: 'm1234',
      title: 'Star Wars',
      year: 1977
    });
  });
});
