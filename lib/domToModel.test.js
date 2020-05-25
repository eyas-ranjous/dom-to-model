const { assert } = require('chai');
const imdbMovieMap = require('./fixtures/imdbMovieMap');
const imdbSciFiMoviesMap = require('./fixtures/imdbSciFiMoviesMap');
const movieData = require('./fixtures/movie');
const moviesData = require('./fixtures/movieCollection');
const domToModel = require('./domToModel');

describe('domToModel(modelMap[, url])', () => {
  it('map dom to a model object', () => (
    domToModel(imdbMovieMap)
      .then((movie) => assert.deepEqual(movie, movieData))
  )).timeout(15000);

  it('map dom to a model collection', () => (
    domToModel(imdbSciFiMoviesMap)
      .then((movies) => assert.deepEqual(movies, moviesData))
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
