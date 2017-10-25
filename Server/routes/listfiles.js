var fs = require('fs');
var ejs = require('ejs');
var testFolder = './uploads/';
var mysql = require('./mysql');
function listfiles(req,res)
{
	/*if(req.session.email == undefined){
    console.log("You have not Logged in Yet");
    responseJson ='';
    res.send(JSON.stringify(responseJson));
  }
  else{*/
				var response = "";
				testFolder += req.session.email;
				fs.readdir(testFolder, function (err, files) 
				{
					//console.log(files.length);
					console.log(files);
					var responseJson = files;
					console.log(responseJson);
					res.setHeader('Content-Type', 'application/json');
					res.send(JSON.stringify(responseJson));
				});
			//}
}
 
function starfile(req,res)
{
	var star = true;
	console.log(req.param("file"));
	var starfilequery = "INSERT into files(star) VALUES('"+star+"') where filename='"+req.param("file")+"'";
	console.log(starfilequery);
		mysql.starfilesql(function(err)
                   	{
						if(err)
						{
							throw err;
						}
						else 
						{
							let responseJson = ({
								status: 201
							})
							res.send(JSON.stringify(responseJson));
						}
					},starfilequery);		
}
function sharefile(req,res)
{
	//console.log(req.body);
	var payload = req.param("payload");
	var sharing_email = req.param("sharing_email");
	console.log("its payload at server"+req.param("payload"));
	console.log("its sharing_email at server"+req.param("sharing_email"));
	var sharefilequery="select filePath from files where fileName='"+req.param("payload")+"' and email='"+req.session.email+"'";
	var sharedfiledestination = './uploads/'+req.param("sharing_email");
	console.log("Query is:"+sharefilequery);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length)
			{
				var result = results[0];
				console.log("in console results"+result.filePath);
				//copy the $file to $dir2
				var copyFile = (file, dir2)=>{
				  //include the fs, path modules
				  var fs = require('fs');
				  var path = require('path');

				  //gets file name and adds it to dir2
				  var f = path.basename(file);
				  var source = fs.createReadStream(file);
				  var dest = fs.createWriteStream(path.resolve(dir2, f));

				  source.pipe(dest);
				  source.on('end', function() { console.log('Succesfully copied'); });
				  source.on('error', function(err) { console.log(err); });
				};
				copyFile(result.filePath, sharedfiledestination);
				//fs.createReadStream('results.filePath').pipe(fs.createWriteStream('sharedfiledestination'));
				let responseJson = ({
						payload: payload,
						sharing_email : sharing_email
                        });

                console.log(responseJson);        
				res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(responseJson));
			}
			else 
			{    
			
		}  
	}
	},sharefilequery);
}
function deletefile(req,res)
{
	var fileName= req.param("file");
	var deletefilequery = "DELETE FROM files WHERE fileName = '"+fileName+"'";
	mysql.filesql(function(err)
                   	{
						if(err)
						{
							throw err;
						}
						else 
						{
							filepath = "./uploads/"+req.session.email+"/"+fileName;
							console.log(filepath);
							fs.unlinkSync(filepath);
							listfiles();
						}
					},deletefilequery);	

}

exports.listfiles = listfiles;
exports.starfile = starfile;
exports.deletefile =deletefile;
exports.sharefile= sharefile;