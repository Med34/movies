/**
 * Movies model.
 */

var neo4j = require ('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:admin@localhost:7474');

var Movie = function(data) {
	this.data = data;
};

Movie.prototype.data = {};

/**
 * Get all movies objects.
 */
Movie.getAll = function(callback) {
	var query = [
        'MATCH (movie:Movie)',
        'RETURN movie',
    ].join('\n');

    db.cypher({
        query: query,
    }, function (err, results) {
        if (err) return callback(err);
        var movies = results.map(function (result) {
            return new Movie(result.movie);
        });
        callback(null, movies);
    });
};

module.exports = Movie;