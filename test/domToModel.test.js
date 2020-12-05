const { assert } = require('chai');
const { domToModel } = require('../lib/domToModel');
const imdbMovieMap = require('./fixtures/imdbMovieMap');
const imdbMovieTitlesMap = require('./fixtures/imdbMovieTitlesMap');
const movieData = require('./fixtures/movie');

describe('domToModel(modelMap[, url])', () => {
  it('map dom to a model object', async () => {
    const url = 'http://www.imdb.com/title/tt0076759';
    const movie = await domToModel(url, imdbMovieMap);
    assert.deepEqual(movie, movieData);
  }).timeout(15000);

  it('map dom to a model collection', async () => {
    const url = 'https://www.imdb.com/search/title/?year=2000';
    const movies = await domToModel(url, imdbMovieTitlesMap);
    assert.isAbove(movies.length, 0);
  }).timeout(15000);

  it('throw an error if url is missing', () => (
    domToModel().catch((error) => (
      assert.equal(error.message, 'missing web page url')
    ))
  ));

  it('throw an error model map is missing', () => (
    domToModel('http://test_url')
      .catch((error) => assert.equal(error.message, 'missing model map'))
  ));

  it('throw an error model type is unknown', () => (
    domToModel('http://test_url', { type: 'test', props: {} })
      .catch((error) => assert.equal(error.message, 'unknow model map type'))
  ));
});
