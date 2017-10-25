// new code here
var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');
var mv = require('mv');
var mysql = require('./mysql');

var Router = require('router')
var router = Router()
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/'+req.session.email);
    },
    filename: function (req, file, cb) {
        //cb(null, file.fieldname + '-' + Date.now())
        cb(null,file.originalname);
    }
});

var upload = multer({storage:storage});

/* GET users listing. */
router.post('/upload', upload.single('mypic'), function (req, res, next) {
  
  var fileName = req.file.filename;
  var filePath= './uploads/'+req.session.email+'/'+req.file.filename;
  var addUser= "INSERT INTO files(fileName,filePath,star,email) VALUES ('"+fileName+"','"+filePath+"','"+"false"+"','"+req.session.email+"')";
  console.log("query is"+addUser);
      mysql.addUser(function(err){
                  if(err)
                  {
                    throw err;
                  }
                  else
                  {
                    
                    console.log("file stored in db");
                    res.end("file inserted");
  
                  }
                },addUser);
       //console.log(req.uploads);
       /* mv("./uploads/" + req.uploads[0].filename, "./uploads/" +"kena@gmail.com"+ "/"
                + req.uploads[0].filename, function(err) {

            if (err) {
                console.log(err);
            }
        });*/
       
               res.status(204).end();
});


module.exports = router;


