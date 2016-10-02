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
	var query = 'MATCH (movie:Movie) RETURN movie';

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

/**
 * Get one movie by id
 */
Movie.get = function(id, callback) {
    var query = 'MATCH(movie) WHERE ID(movie) = {id} return movie';

    var params = {
        id: parseFloat(id),
    };

    db.cypher({
        query: query,
        params: params,
    }, function(err, results){
        if (err) return callback(err);
        if (!results.length) {
            err = new Error('No movie');
            return callback(err);
        }
        var movie = new Movie(results[0].movie);
        callback(null, movie);
    });
};


Movie.prototype.getActorsByMovie = function(callback) {
    var query = 'MATCH (actor:Person) MATCH (movie:Movie) WHERE ID(movie) = {id} MATCH (actor)-[:ACTED_IN]->(movie) return actor';
    
    var params = {
        id: this.data._id,
    };

    db.cypher({
        query: query,
        params: params,
    }, function(err, results) {
        if (err) return callback(err);
        callback(null, results);
    });
};

module.exports = Movie;