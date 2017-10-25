var express = require('express');
var Router = require('router')
var router = Router()
var path = require('path');
var logger = require('morgan');
var passport = require('passport');
//require('./routes/passport')(passport);
//Add Mongoose.js to 'require' and call connection to MongoDB
//var dbConfig = require('./config/db.json');
var mongoose = require('mongoose');
/*mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url,{ useMongoClient: true })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));*/
require('./models/user');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var http = require('http');

//var users = require('./routes/users');
var home =require('./routes/home');
var mysql =require('./routes/mysql');


var fileuploadroute = require('./routes/fileuploadroute');
var expressSession = require('express-session');
var listfiles = require('./routes/listfiles');

var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var app = express();
//require('./routes/passport')(passport);

var mongodburl = 'mongodb://localhost:27017/User';

var mongoStore = require("connect-mongo")(expressSession);


//Enable CORS
app.use(cors({credentials:true, origin: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.set('port', process.env.PORT || 3000);
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
       url: mongodburl
    })
}));


   // initialize passport and express-session.
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//loading passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
//const authCheckMiddleware = require('./middleware/auth-check');
//app.use('/api', authCheckMiddleware);
const config = require('./config');

// connect to the database and load models
require('./models').connect(mongodburl);
// routes
var authRoutes = require('./routes/auth');
var apiRoutes = require('./routes/api');
app.use('/auth', authRoutes);
app.post('/api', apiRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.post('/register', home.register);
app.post('/authenticate',home.authenticate);
app.post('/listfiles',listfiles.listfiles);
app.use('/files',fileuploadroute);
app.use('./uploads', express.static(path.join(__dirname, 'uploads/sal@yahoo.com')));
app.post('/starfile',listfiles.starfile);
app.post('/sharefile',listfiles.sharefile);
app.post('/deletefile',listfiles.deletefile);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
module.exports = app;
