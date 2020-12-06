const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const jquery = require('jquery');
const { mapModel } = require('../lib/mapModel');

describe('mapModel(jQuery, modelMap)', () => {
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
          <ul id="cast">
            <li>
              <p class="name">Mark Hamill</p>
              <p class="role">Luke Skywalker</p>
            </li>
            <li>
              <p class="name">Harrison Ford</p>
              <p class="role">Han Solo</p>
            </li>
            <li>
              <p class="name">Carrie Fisher</p>
              <p class="role">Princess Leia</p>
            </li>
          </ul>
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
          map: {
            dataType: 'string',
            path: '.movie',
            dataAttr: 'id'
          }
        },
        title: {
          propType: 'value',
          map: {
            dataType: 'string',
            path: '.title'
          }
        },
        year: {
          propType: 'value',
          map: {
            dataType: 'number',
            path: '.year'
          }
        },
        cast: {
          propType: 'list',
          map: {
            itemPath: 'ul#cast li',
            itemDataType: 'model',
            itemMap: {
              props: {
                name: {
                  propType: 'value',
                  map: {
                    dataType: 'string',
                    path: '.name'
                  }
                },
                role: {
                  propType: 'value',
                  map: {
                    dataType: 'string',
                    path: '.role'
                  }
                }
              }
            }
          }
        },
        details: {
          propType: 'model',
          map: {
            props: {
              budget: {
                propType: 'value',
                map: {
                  dataType: 'string',
                  path: '.budget'
                }
              },
              runtime: {
                propType: 'value',
                map: {
                  dataType: 'string',
                  path: '.runtime'
                }
              }
            }
          }
        }
      }
    };
    assert.deepEqual(mapModel($, movieMap), {
      id: 'm1234',
      title: 'Star Wars',
      year: 1977,
      details: {
        budget: '$11,000,000',
        runtime: '121 min'
      },
      cast: [
        {
          name: 'Mark Hamill',
          role: 'Luke Skywalker'
        },
        {
          name: 'Harrison Ford',
          role: 'Han Solo'
        },
        {
          name: 'Carrie Fisher',
          role: 'Princess Leia'
        }
      ]
    });
  });
});
