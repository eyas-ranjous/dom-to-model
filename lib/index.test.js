const { assert } = require('chai');
const imdbMovieMap = require('./fixtures/imdbMovieMap');
const movieData = require('./fixtures/movie');
const domToModel = require('./index');

describe('domToModel(modelMap[, url])', () => {
  it('map a web page to a model object', () => (
    domToModel(imdbMovieMap)
      .then((movie) => assert.deepEqual(movie, movieData))
  )).timeout(15000);
});
