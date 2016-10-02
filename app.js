// Dependencies.
var express = require('express');
var routes = require('./routes');
var http = require('http');
var app = express();

// Set up the environment.
app.set('views', __dirname + "'/views");
app.set('view engine', 'ejs');

// Routes.
app.get('/', routes.site.index);
app.get('/movies', routes.movies.list);

// Start the server.
var server = http.createServer(app);
server.listen(8080, function() {
	console.log('Server is running');
});