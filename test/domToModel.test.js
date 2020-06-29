const { assert } = require('chai');
const domToModel = require('../lib/domToModel');
const imdbMovieMap = require('./fixtures/imdbMovieMap');
const imdbMovies2000Map = require('./fixtures/moviesReleasedOn2000');
const movieData = require('./fixtures/movie');

describe('domToModel(modelMap[, url])', () => {
  it('map dom to a model object', () => (
    domToModel(imdbMovieMap)
      .then((movie) => assert.deepEqual(movie, movieData))
  )).timeout(15000);

  it('map dom to a model collection', () => (
    domToModel(imdbMovies2000Map)
      .then((movies) => assert.isAbove(movies.length, 0))
  )).timeout(15000);

  it('throw an error if url is missing', () => (
    domToModel({}).catch((error) => (
      assert.equal(error.message, 'missing model web page url')
    ))
  ));

  it('throw an error model type is unknown', () => (
    domToModel({ url: 'test', type: 'test', props: {} })
      .catch((error) => assert.equal(error.message, 'unknow model type'))
  ));
});
