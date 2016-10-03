/**
 * Routes to movies crud.
 */

var Movie = require('../models/movie');

/**
 * Get the movie list.
 * /movies
 */
exports.list = function(req, res, next) {
	// Get all movies in the database.
	Movie.getAll(function(err, movies) {
		if (err) return next(err);
		res.render('movies.ejs', {
			movies: movies
		});
	});
};

/**
 * Get movie by id.
 * /movies/:id
 */
exports.show = function(req, res, next) {
	Movie.get(req.params.id, function(err, movie) {
		if (err) return next(err);

		// Get all actors that play in the current movie.
		movie.getActorsByMovie(function(err, actors) {
			if (err) return next(err);
			res.render('a_movie.ejs', {
				movie: movie,
				actors: actors,
			});
		});
	});
};