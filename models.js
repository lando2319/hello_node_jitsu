var db_config = require('./db_config')
module.exports = function(){
	var obj = {};
	var mysql      = require('mysql');
	var connection;

	// Init mysql connection
	obj.connectMysql = function(name){
		connection = mysql.createConnection({
		  host     : db_config.host,
		  user     : db_config.user,
		  password : db_config.password,
		  database: db_config.database
		});
	}

	obj.userCreate = function(email, password, cb){
		var newUser  = {
			email: email,
			password: password,
		};
		var query = connection.query('INSERT INTO users SET ?', newUser, function(err, result) {
		  cb(err, result)
		});	
	}

	obj.userList = function(cb){
		connection.query('select * from users', function(err, result) {
		  cb(err, result)
		});	
	}

	// connect to mysql
	obj.connectMysql();

	// Return all the functions
	return obj;
}
