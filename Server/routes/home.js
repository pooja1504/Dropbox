var ejs = require("ejs");
var mysql = require('./mysql');
var fs = require('fs');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

function authenticate(req,res)
{
	var email = req.param("email");
	console.log(email);
	req.session.email = email;
	console.log("hey its auth " + req.session.email);
	var checkUser="select * from users where email='"+req.param("email")+"'";
	console.log("Query is:"+checkUser);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
		
			if(results.length && bcrypt.compare(req.param("password"),results[0].password)) 
			{
				let user = results[0];
				console.log("hey its results"+results[0]);
				let responseJson = ({
					status: 201,
                            user : {email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'fake-jwt-token'}
                        });

                console.log(responseJson);        
				res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(responseJson));
			//}
			}
			else 
			{    
				let responseJson = ({
					error : 'error',
					status: 500
				})
				console.log(responseJson); 
				console.log("Invalid Login");       
				res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(responseJson));
			}
		}  
	},checkUser);



}

function register(req,res) 
{
                    // get new user object from post body
                    //let newUser = JSON.parse(opts.body);
                    
                   //	var duplicateUser = "select * from users where email = '"+req.param("email")+"'";
                   //	console.log("Duplicate user query is" + duplicateUser);

                   	console.log(req.sessionID);
                   //	mysql.fetchData(function(err)
                   	//{
						/*if(err)
						{
							throw err;
						}
						else 
						{*/
								/*if(duplicateUser)
								{
									reject('Email "' + req.param("email") + '" already taken');
                        			return;
                   				}*/
                   				//else

                   				//{
                   					var passwordToSave = bcrypt.hashSync(req.param("password"), salt);
                   					var addUser= "INSERT INTO users(firstName,lastName,email,password) VALUES ('"+req.param("firstName")+"','"+req.param("lastName")+"','"+req.param("email")+"','"+passwordToSave+"')";
                   					console.log("query is"+addUser);
									mysql.addUser(function(err){
									if(err)
									{
										throw err;
									}
									else
									{
										fs.mkdir("./uploads/" + req.param("email"), function(err) {
										if (!err) {
										console.log("directory created");
										} 
										else {
										return res.end("Dir creation failed : " + err);
										}
										});
										console.log("pooja");
										res.setHeader('Content-Type', 'application/json');
										res.send(JSON.stringify({}));
	
									}
								},addUser);
                   				//}

					//}
				//},duplicateUser);
}

function getuserdetails(req,res)
{
	var getuser = "select * from users where email = '"+req.param("email")+"'";
	console.log(getuser);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length)
			{
				let user = results[0];
				console.log(results);
				let responseJson = ({
				
                           	email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            password: user.password
                      		
                        });

                console.log(responseJson);        
				res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(responseJson));
			}
		}

})
}

exports.authenticate = authenticate;
exports.register= register;			
exports.getuserdetails = getuserdetails;		