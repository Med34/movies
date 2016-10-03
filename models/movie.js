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
 * Static methods. 
 */

// Get all movies objects.
Movie.getAll = function(callback) {
    db.cypher({
        query: 'MATCH (movie:Movie) RETURN movie',
    },
    function (err, results) {
        if (err) return callback(err);

        // Create all movies object with the result.
        var movies = results.map(function (result) {
            return new Movie(result.movie);
        });

        callback(null, movies);
    });
};

// Find movie by id.
Movie.get = function(id, callback) {
    db.cypher({
        query: 'MATCH(movie) WHERE ID(movie) = {id} return movie',
        params: {id: parseFloat(id)},
    },
    function(err, results){
        if (err) return callback(err);

        // No results.
        if (!results.length) {
            err = new Error('No movie');
            return callback(err);
        }

        // Create one movie.
        var movie = new Movie(results[0].movie);
        callback(null, movie);
    });
};


/**
 * Prototype methods.
 */

// Get all actors nodes that acted_in in the current movie.
Movie.prototype.getActorsByMovie = function(callback) {
    db.cypher({
        query: 'MATCH (actor:Person) MATCH (movie:Movie) WHERE ID(movie) = {id} MATCH (actor)-[:ACTED_IN]->(movie) return actor',
        params: {id: this.data._id,},
    }, function(err, results) {
        if (err) return callback(err);
        callback(null, results);
    });
};

module.exports = Movie;