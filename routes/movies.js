/**
 * Routes to movies crud.
 */

var Movie = require('../models/movie');

/**
 * Get the movie list.
 */
exports.list = function(req, res, next) {
	Movie.getAll(function(err, movies) {
		if (err) return next(err);
		res.render('movies', {
			movies: movies
		});
	});
};