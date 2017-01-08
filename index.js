var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var User = require('./models/user');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Humble');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/', function (req, res){
	res.sendFile(__dirname + '/public/view/index.html');
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
	  	//res.send("Fail");
	  }
	  //else
	  //{
	  	console.log("Registr new user " + req.body.fullName + "\nlogin: " + req.body.login + 
		"\nemail: " + req.body.email + "\n");
	  	res.send("Success");
	  //}
	  
	});
});

/*
$set and $unset fields
User.update({ login: 'terdenan'}, { $set: {admin: true}}, function(err){
	if (err) throw err;
	console.log('updated');
});*/

http.listen(3000, function(){
  console.log('Humble is listening on port 3000');
});