// Dependencies.
var express = require('express');
var routes = require('./routes');
var http = require('http');
var app = express();

// Set up the environment.
app.set('views', __dirname + "/views");
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Routes.
app.get('/', routes.site.index);
app.get('/movies', routes.movies.list);
app.get('/movies/:id', routes.movies.show);

// Start the server.
var server = http.createServer(app);
server.listen(8080, function() {
	console.log('Server is running');
});