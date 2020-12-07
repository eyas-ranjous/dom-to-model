const imdbMovieMap = require('./imdbMovieMap');
const imdbMovieTitlesMap = require('./imdbMovieTitlesMap');
const { domToModel } = require('../lib/domToModel');

const MOVIE_ENDPOINT = 'http://www.imdb.com/title';
const imdbMovie = async ({ id }) => {
  const url = `${MOVIE_ENDPOINT}/${id}`;
  const movie = await domToModel(url, imdbMovieMap);
  console.log(movie);
}

MOVIE_TITLES_ENDPOINT = 'https://www.imdb.com/search/title';
const imdbMovieTitles = async ({ year }) => {
  const url = `${MOVIE_TITLES_ENDPOINT}/?year=${year}`;
  const movies = await domToModel(url, imdbMovieTitlesMap);
  console.log(movies);
};


exports.demo = {
  imdbMovie,
  imdbMovieTitles
};
