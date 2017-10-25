var ejs= require('ejs');
var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'root',
	    database : 'Dropbox',
	    port	 : 8889
	});
	return connection;
}
function fetchData(callback,sqlQuery){
	console.log("\nSQL Query::"+sqlQuery);
	var connection=getConnection();
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err,rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}
function addUser(callback,sqlQuery){
	console.log("\nSQL Query::"+sqlQuery);
	var connection=getConnection();
	connection.query(sqlQuery, function(err, results, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("User successfully created");
			callback(err);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}
function filesql(callback,sqlQuery){
	console.log("\nSQL Query::"+sqlQuery);
	var connection=getConnection();
	connection.query(sqlQuery, function(err) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("File successfully added in db");
			callback(err);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	
exports.fetchData=fetchData;
exports.addUser=addUser;
exports.filesql = filesql;