/**
 * Routes to movies crud.
 */

var Movie = require('../models/movie');

/**
 * Get the movie list.
 * /movies
 */
exports.list = function(req, res, next) {
	Movie.getAll(function(err, movies) {
		if (err) return next(err);
		res.render('movies', {
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

		// Get all actors that play in the mobie.
		movie.getActorsByMovie(function(err, actors) {
			if (err) return next(err);
			res.render('a_movie', {
				movie: movie,
				actors: actors,
			});
		});
	});
};