// Require and load express
var express = require('express');
var app = express();

// Express - POST params parser
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies

// Express - Using the /public folder as static assets
app.use(express.static(__dirname + '/public'));


// Loading our models file
var models = require('./models.js')();

// CORS header (cross domain)
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ---------- ROUTES ----------------------
// List all our users
app.get('/api/users', function(req, res){
	var result = models.userList(function(error, result){
  	res.send(apiOutput(result));
	});
});

// Insert new user (create account)
app.post('/api/users/create', function(req, res){
	console.log(req.param('email'))
	//console.log(req.query);
	var params = req.params;
	var callback = function(error, result){
  	res.send(apiOutput(result));
	}
	models.userCreate(req.param('email'), req.param('password'), callback);
});

// ---------- Start server ----------------------
// Start the (express) server on port 3000
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

// ---------- HELPER ----------------------
// Helper
function apiOutput(data){
	return JSON.stringify(data)
}
