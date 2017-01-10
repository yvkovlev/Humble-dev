var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var session = require('express-session');
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);

var User = require('./models/user');
var dialog = require('./models/dialog');
var userDialogList = require('./models/userDialogList');

mongoose.connect('mongodb://localhost:27017/Humble');


app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
	secret: "Zs&2ls)).@df",
	store: new MongoStore ({
		mongooseConnection: mongoose.connection
	}),
	cookie: {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7}
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function (req, res, next){
	if (req.url == "/sign-in" || req.url == "/sign-up" || req.url.split('/')[1] == 'api') next();
	else
	{
		if (!req.session.login || !req.session.password) res.redirect('sign-in');
		else
		{
			User.findOne({login: req.session.login}, function(err, user){
				if (err) throw err;
				if (user == null || user.password != req.session.password) res.redirect('sign-in');
				else
				{
					res.cookie('login', req.session.login);
					next();
				}
			});
		}
	}
});

app.get('/', function (req, res){
	res.sendFile(__dirname + "/public/view/index.html");
});

app.get('/sign-in', function (req, res){
	res.sendFile(__dirname + '/public/view/sign-in.html');
});

app.get('/sign-up', function (req, res){
	res.sendFile(__dirname + '/public/view/sign-up.html');
});

app.post('/api/registrUser', function (req, res){
	var newUser = User({
	  fullName: req.body.fullName,
	  login: req.body.login,
	  password: req.body.password,
	  email: req.body.email,
	  admin: "true"
	});
	newUser.save(function(err) {
	  if (err) {
	  	throw err;
	  	res.send("Fail");
	  }
	  else
	  {
	  	console.log("Registr new user " + req.body.fullName + "\nlogin: " + req.body.login + 
		"\nemail: " + req.body.email + "\n");
		req.session.login = login;
		req.session.password = password;
	  	res.send("Success");
	  }
	  
	});
});

app.get('/api/getDialog', function (req, res){
	dialog.findOne({_id: mongoose.Types.ObjectId(req.query.dialogId)}, function(err, dialog) {
	  if (err) throw err;
	  res.send(dialog);
	});
});

app.get('/api/getUserDialogs', function (req, res){
	var userDialogs = [];
	userDialogList.findOne({_id: mongoose.Types.ObjectId('587253aa46dd54265303b5bb')}, function (err, dialogList){
		if (err) throw err;
		var arr = dialogList.dialogs;
		var promise = new Promise (function(resolve, reject){
			var itemPassed = 0;
			var arrSize = arr.length;
			arr.forEach(function(curDialog, arr){
				dialog.findOne({_id: mongoose.Types.ObjectId(curDialog)}, function(err, curDialog){
					itemPassed++;
					userDialogs.push({"id": curDialog._id, "name": curDialog.name, "lastMessage": curDialog.messages[0].message});
					if (itemPassed == arrSize)
					{
						resolve("result");
					}
				});
			});
		});
		promise.then(function(){
			res.send(userDialogs);
		}, function(){
			res.send("Promise error");
		});
	});
});

/*var newUserDialogList = userDialogList({
  login: "terdenan",
  dialogs: ["587204797631b42420326887"]
});

newUserDialogList.save(function(err){
	if (err) throw err;
	console.log("saved");
});
*/

/*userDialogList.find({}, function(err, dialogList){
	if (err) throw err;
	console.log(dialogList);
});*/

app.get('/api/getUser', function (req, res) {
	User.findOne({login: req.query.login}, function (err, user){
		if (err)
		{
			throw err;
			res.send('Fail');
		}
		else
		{
			if (user == null || req.query.password != user.password) res.send("Fail");
			else
			{
				req.session.login = req.query.login;
				req.session.password = req.query.password;
				res.send("Success");
			}
		}
	});
});

http.listen(3000, function(){
  console.log('Humble is listening on port 3000');
});