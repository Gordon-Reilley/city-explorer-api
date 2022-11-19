const axios = require('axios');


async function getMovies (request, response, next) {
  try{
    let movieSearch = request.query.search;

    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieSearch}`;
    let newMovie = await axios.get(movieURL);

    let topMovies = newMovie.data.results.map(movieObj => new Movie(movieObj));

    response.send(topMovies);
  } catch (error) {
    next(error);
  }
}

class Movie {
  constructor(movie){
    this.releaseDate = movie.release_date;
    this.title = movie.title;
    this.overview = movie.overview;
    this.posterImg = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  }
}


module.exports = getMovies;
