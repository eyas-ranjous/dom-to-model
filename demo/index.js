const imdbMovieMap = require('./imdbMovieMap');
const imdbMovieTitlesMap = require('./imdbMovieTitlesMap');
const { domToModel } = require('../lib/domToModel');

// test movie model, start wars
const TEST_MODEL_URL = 'http://www.imdb.com/title/tt0076759';

exports.imdbMovie = async (url = TEST_MODEL_URL) => {
  const movie = await domToModel(url, imdbMovieMap);
  console.log(movie);
}

// test movie titles collection, movies released in 2000
TEST_COLLECTION_URL = 'https://www.imdb.com/search/title/?year=2000';

exports.imdbMovieTitles = async (url = TEST_COLLECTION_URL) => {
  const movies = await domToModel(url, imdbMovieTitlesMap);
  console.log(movies);
};
