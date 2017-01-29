var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var session = require('express-session');
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var multer = require('multer');
var morgan = require('morgan');
var flash = require('connect-flash');

var User = require('./models/user');
var dialog = require('./models/dialog');
var userDialogList = require('./models/userDialogList');
var userMessageStorage = require('./models/userMessageStorage');

mongoose.connect('mongodb://localhost:27017/Humble');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        var newName = Math.random().toString(36).substring(13) + ".jpg";
        file.originalname = newName;
        cb(null, file.originalname)
    }
});
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({
	secret: "Zs&2ls)).@df",
	store: new MongoStore ({
		mongooseConnection: mongoose.connection
	}),
	cookie: {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new LocalStrategy(
  function(login, password, done) {
    User.findOne({login: login}, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Incorrect username.' });
      bcrypt.compare(password, user.password).then(function(resp) {
        if (!resp) return done(null, false, { message: 'Incorrect password.' });
        else
        {
        	return done(null, user);
        }
      });
    });
  }
));

app.use(function (req, res, next){
	if (req.url == "/sign-in" || req.url == "/sign-up" || req.url.split('/')[1] == 'api') next();
	else
	{
		if (!req.user) res.redirect("/sign-in");
		else next();
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
	var id = new mongoose.Types.ObjectId;
	bcrypt.hash(req.body.password, 10).then(function(hash) {
		var newUser = User({
		  _id: id,
		  fullName: req.body.fullName,
		  login: req.body.login,
		  password: hash,
		  email: req.body.email
		});
	    newUser.save(function(err){
	      if (err) throw err;
	      var newUserDialogList = userDialogList({
	      	user: id,
	      	dialogs: []
	      });
	      newUserDialogList.save(function(err){
	      	var newUserMessageStorage = userMessageStorage({
	      		user: id,
	      		messages: []
	      	});
	      	newUserMessageStorage.save(function(err){
	      		if (err) throw err;
	      		else res.send('Success');
	      	});
	      });
	    });
	});
});

app.get('/api/getDialog', function (req, res){
	userMessageStorage.aggregate([
		{$match: {user: (req.user._id).toString()}},
		{$unwind: '$messages'},
		{$match: {'messages.dialog': req.query.dialogId}},
		/*{$group: {'_id': '$_id', 'messages': {'$push': '$messages'}}}*/
		], 
		function(err, data){
			var response = [];
			var promise = new Promise(function(resolve, reject){
				var i = 0, size = data.length;
				data.forEach(function(item, data){
					var curMess = ({
						from: String,
						message: String
					});
					i++;
					curMess.from = item.messages.from;
					curMess.message = item.messages.message;
					response.push(curMess);
					if (i == size) resolve("result");
				});
			});
			promise
				.then(function(){
					res.send(response);
				});
	});
	//588b37d49aed576c18cb8b76
});

app.get('/api/getUser', function (req, res) {
	User.findOne({login: req.query.login}, function (err, user){
		if (err)
		{
			throw err;
			res.send('Fail');
		}
		else
		{
			if (user == null || req.query.password != user.password) res.send('Fail');
			else
			{
				res.send('Success');
			}
		}
	});
});

app.get('/api/searchCompanion', function(req, res){
	User.findOne({login: req.query.searchText}, function(err, data){
		if (data == undefined) res.send('Fail');
		else res.send(data);
	});
});

app.put('/api/createDialog', function (req, res){
	var from = req.user._id, to = req.body.companion, fullName = req.body.fullName;
	// Сначала проверяем есть ли у from диалог с to. Если есть, то возвращаем already been.
	// Если нету, то проверяем есть ли у to беседа с from. Если есть, то берем id этой беседы
	// и кладем в userDialogList from-а этот диалог с вытащенной id. Если нету, значит этого
	// диалога еще не было - создаем диалог только у from (на случай, если он ничего не станет
	// писать), а диалог у to создастся тогда, когда from напишет ему сообщение.
	userDialogList.findOne({$and: [ { user: mongoose.Types.ObjectId(from) }, { 'dialogs.companion': mongoose.Types.ObjectId(to) } ]}, 
		function(err, data){
		if (data == undefined) { // Этого диалога у from нету
			userDialogList.findOne({$and: [ { user: mongoose.Types.ObjectId(to) }, { 'dialogs.companion': mongoose.Types.ObjectId(from) } ]},
				function(err, data1){
					var id = "";
					if (data1 == undefined) id = new mongoose.Types.ObjectId;
					else id = data1.dialogId;
					userDialogList.findOneAndUpdate({user: mongoose.Types.ObjectId(from)}, 
					{ $push: {"dialogs": {dialogId: id, companion: to, name: fullName} } }, function(err){
						res.send("Success"); // Создаем этот диалог и кладем в userDialogsList from-a
					});
				});
		}
		else res.send("already been");
	});
});

app.get('/api/getUserDialogs', function (req, res){
	var dialogs = [];
	userDialogList.findOne({user: mongoose.Types.ObjectId(req.user._id)}, function(err, data){
		var promise = new Promise(function(resolve, reject){
			var arr = data.dialogs, arrSize = arr.length, i = 0;
			arr.forEach(function(dialog, arr){
				i++;
				dialogs.push({id: dialog.dialogId, name: dialog.name});
				if (i == arrSize) {
					resolve("result");
				}
			});
		});
		promise
			.then(function(){
				res.send(dialogs);
			});
	});
});

app.post('/api/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/test', failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

app.get('/api/logOut', function (req, res){
  req.session.destroy(function (err) {
  	res.cookie("login", "");
  	res.send("Success");
  });
});

/*userMessageStorage.findOne({user: mongoose.Types.ObjectId("588b376c8e7d0f6c0db77c22")}, function(err, data){
	console.log(data);
	(data.messages).push({dialog: '588b37d49aed576c18cb8b76', from: 'Nastya', message: 'come over here)'});
	data.save(function(err){
		console.log('saved');
	});
});*/

http.listen(3000, function(){
  console.log('Humble is listening on port 3000');
});
