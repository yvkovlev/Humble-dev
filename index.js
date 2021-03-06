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
var fs = require('fs');

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
        cb(null, req.user._id + '.jpg');
    }
});
var upload = multer({ storage: storage });
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
		else if (req.cookies.login != req.user.login) res.redirect('sign-in');
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

app.get('/api/checkLogin', function (req, res){
	User.find({login: req.query.login}, function(err, data){
		if (!data.length) res.send('success');
		else res.send('fail');
	});
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
	      		fs.readFile('public/images/noImage.jpg', function (err, data) {
				    if (err) throw err;
				    fs.writeFile('public/uploads/' + id + '.jpg', data, function (err) {
				        if (err) throw err;
				        else res.send('Success');
				    });
				});
	      	});
	      });
	    });
	});
});

app.get('/api/getDialog', function (req, res){
	userMessageStorage.findOne({user: req.user._id}, function(err, data){
		var arr = data.messages;
		arr.forEach(function(item, arr){
			if (item.dialog == req.query.dialogId) {
				item.readed = true;
				data.save(function(err){
					
				});
			}
		});
	});
	userMessageStorage.aggregate([
		{$match: {user: (req.user._id).toString()}},
		{$unwind: '$messages'},
		{$match: {'messages.dialog': req.query.dialogId}},
		], 
		function(err, data){
			var response = ({
				anonym: Boolean,
				messages: []
			});
			userDialogList.aggregate([
				{$match: {user: (req.user._id).toString()}},
				{$unwind: '$dialogs'},
				{$match: {'dialogs.dialogId': req.query.dialogId}},
				], function(err, data1){
					response.anonym = data1[0].dialogs.anonym;
					var promise = new Promise(function(resolve, reject){
						var i = 0, size = data.length, arr = data;
						if (!size) resolve("result");
						arr.forEach(function(item, arr){
							var curMess = ({
								from: String,
								message: String,
								fromId: String,
								anonym: Boolean,
								date: Date
							});
							i++;
							if (item.messages.anonym && item.messages.from != req.user.login) {
								curMess.from = 'Anonym';
								curMess.message = item.messages.message;
								curMess.fromId= 'anonym';
								curMess.date = item.messages.date;
							} else {
								curMess.from = item.messages.from;
								curMess.message = item.messages.message;
								curMess.fromId = item.messages.fromId;
								curMess.date = item.messages.date;
							}
							if (item.messages.anonym) curMess.anonym = true;
							else curMess.anonym = false;
							response.messages.push(curMess);
							if (i == size) resolve("result");
						});
					});
					promise
						.then(function(){
								res.send(response);
						});
				});
	});
});

app.get('/api/getUser', function (req, res) {
	User.findOne({login: req.query.login}, '_id login fullName email', function (err, user){
		res.send(user);
	});
});

app.get('/api/searchCompanion', function(req, res){
	if (req.query.searchText == req.user.login) res.send('Fail');
	else {
		User.find({$or: [{fullName: {$regex: req.query.searchText, $options: 'i'}}, {login: {$regex: req.query.searchText, $options: 'i'}}] }, function(err, data){
			res.send(data);
		});
	}
});

app.put('/api/createDialog', function (req, res){
	var from = req.user._id, to = req.body.companion, fullName = req.body.fullName;
	var anonym = (req.body.anonym == 'true');
	if (anonym)
	{
		userDialogList.findOne({$and: [{user: mongoose.Types.ObjectId(from)}, {dialogs: {$elemMatch: { 'companion': to, 'anonym': anonym, 'initiator': from} } } ] },
			function(err, data){
			if (data == undefined) {
				userDialogList.aggregate([
				{$match: {user: to}},
				{$unwind: '$dialogs'},
				{$match: {$and: [ {'dialogs.companion': from.toString()}, {'dialogs.anonym': anonym}, {'dialogs.initiator': from.toString()} ] } },
				], 
				function(err, data1){
					var id = "";
					if (!data1.length) id = new mongoose.Types.ObjectId;
					else id = data1[0].dialogs.dialogId;
					if (anonym) {
						userDialogList.findOneAndUpdate({user: mongoose.Types.ObjectId(from)}, 
						{ $push: {"dialogs": {dialogId: id, companion: to, name: fullName, anonym: anonym, initiator: from} } }, function(err){
							res.send("Success"); // РЎРѕР·РґР°РµРј СЌС‚РѕС‚ РґРёР°Р»РѕРі Рё РєР»Р°РґРµРј РІ userDialogsList from-a
						});
					} else
					{
						userDialogList.findOneAndUpdate({user: mongoose.Types.ObjectId(from)}, 
						{ $push: {"dialogs": {dialogId: id, companion: to, name: fullName, anonym: anonym} } }, function(err){
							res.send("Success"); // РЎРѕР·РґР°РµРј СЌС‚РѕС‚ РґРёР°Р»РѕРі Рё РєР»Р°РґРµРј РІ userDialogsList from-a
						});
					}
				});
			}
			else res.send("Fail");
		});
	} else {
		userDialogList.findOne({$and: [ { user: mongoose.Types.ObjectId(from) }, 
			{dialogs: {$elemMatch: { 'companion': mongoose.Types.ObjectId(to), 'anonym': anonym } } } ]}, 
			function(err, data){
          	console.log(data);
			if (data == undefined) {
				userDialogList.aggregate([
				{$match: {user: to}},
				{$unwind: '$dialogs'},
				{$match: {$and: [ {'dialogs.companion': from.toString()}, {'dialogs.anonym': anonym} ] } },
				], 
				function(err, data1){
					var id = "";
					if (!data1.length) id = new mongoose.Types.ObjectId;
					else id = data1[0].dialogs.dialogId;
					if (anonym) {
						userDialogList.findOneAndUpdate({user: mongoose.Types.ObjectId(from)}, 
						{ $push: {"dialogs": {dialogId: id, companion: to, name: fullName, anonym: anonym, initiator: from} } }, function(err){
							res.send("Success"); // РЎРѕР·РґР°РµРј СЌС‚РѕС‚ РґРёР°Р»РѕРі Рё РєР»Р°РґРµРј РІ userDialogsList from-a
						});
					} else
					{
						userDialogList.findOneAndUpdate({user: mongoose.Types.ObjectId(from)}, 
						{ $push: {"dialogs": {dialogId: id, companion: to, name: fullName, anonym: anonym} } }, function(err){
							res.send("Success"); // РЎРѕР·РґР°РµРј СЌС‚РѕС‚ РґРёР°Р»РѕРі Рё РєР»Р°РґРµРј РІ userDialogsList from-a
						});
					}
				});
			}
			else res.send("Fail");
		});
	}
});

app.get('/api/getUserDialogs', function (req, res){
	var dialogs = [];
	userDialogList.findOne({user: mongoose.Types.ObjectId(req.user._id)}, function(err, data){
		var promise = new Promise(function(resolve, reject){
			var arr = data.dialogs, arrSize = arr.length, i = 0;
			if (!arrSize) resolve("result");
			arr.forEach(function(dialog, arr){
				var lastMess = "", lastMessDate = new Date(), newMessage;
				var promise2 = new Promise(function(resolve2, rejec2){
					userMessageStorage.aggregate([
							{$match: {user: (req.user._id).toString()}},
							{$unwind: '$messages'},
							{$match: {'messages.dialog': dialog.dialogId}},
							{$sort : { 'messages.date' : -1 } },
						], 
						function(err, data){
							if (data.length == 0) lastMess = 'В беседе нет сообщений';
							else 
							{
								lastMess = data[0].messages.message;
								lastMessDate = data[0].messages.date;
								newMessage = data[0].messages.readed;
							}
							i++;
							resolve2("result");
					});
				});
				promise2
					.then(function(){
						if (dialog.anonym && dialog.initiator != (req.user._id).toString()) dialogs.push({id: dialog.dialogId, name: 'Anonym', userId: 'anonym', lastMessage: lastMess, date: lastMessDate, newMessage: newMessage});
						else dialogs.push({id: dialog.dialogId, name: dialog.name, userId: dialog.companion, lastMessage: lastMess, date: lastMessDate, newMessage: newMessage});
						if (i == arrSize) {
							resolve("result");
						}
					});
			});
		});
		promise
			.then(function(){
				function fn(a, b) {
					if (a.date < b.date) return 1;
					else return -1; 
				}
				dialogs.sort(fn);
				res.send(dialogs);
			});
	});
});

app.put('/api/sendMessage', function(req, res){
	userDialogList.aggregate([
		{$match: {user: (req.user._id).toString()}},
		{$unwind: '$dialogs'},
		{$match: {'dialogs.dialogId': req.body.dialogId}},

		], 
		function(err, data){
		var from = req.user._id, to = data[0].dialogs.companion, dialogId = req.body.dialogId;
		var anonym = data[0].dialogs.anonym, initiator = data[0].dialogs.initiator;
		var newMessage = ({
			_id: new mongoose.Types.ObjectId,
			dialog: req.body.dialogId,
			from: req.user.login,
			fromId: req.user._id,
			toId: to,
			readed: true,
			date: new Date(),
			anonym: false,
			message: req.body.message,
		});
		if (initiator == (req.user._id).toString()) newMessage.anonym = true;
		userDialogList.findOne({$and: [{user: to}, {'dialogs.dialogId': dialogId}]}, 
			function(err, data){
				if (data == undefined) {
					if (!anonym) {
						userDialogList.findOneAndUpdate({user: to}, 
						{ $push: {"dialogs": {dialogId: dialogId, companion: from, name: req.user.fullName, anonym: anonym} } }, function(err){
							console.log('created successfully');
						});
					} else {
						userDialogList.findOneAndUpdate({user: to}, 
						{ $push: {"dialogs": {dialogId: dialogId, companion: from, name: req.user.fullName, anonym: anonym, initiator: initiator} } }, function(err){
							console.log('created successfully');
						});
					}
				}
				userMessageStorage.findOneAndUpdate({user: from}, 
					{$push: {"messages": newMessage}}, function(err){
						newMessage.readed = false;
						userMessageStorage.findOneAndUpdate({user: to}, 
							{$push: {'messages': newMessage}}, function(err){
								res.send({fullName: req.user.fullName, message: newMessage});
							});
					});
			});
	});
});

app.delete('/api/clearDialog', function (req, res){
	var dialogId = req.body.dialogId;
	userMessageStorage.update({user: req.user._id}, {$pull: {'messages': {dialog: dialogId} } },
		function(){
			userMessageStorage.findOne({user: req.user._id}, function(err, data){
				res.send('ok');
			});
		});
});

app.delete('/api/deleteDialog', function (req, res){
	var dialogId = req.body.dialogId;
	userDialogList.update({user: req.user._id}, {$pull: {'dialogs': {dialogId: dialogId} } }, 
		function(){
			userDialogList.findOne({user: req.user._id}, function(err, data){
				res.send('ok');
			});
		});
});

app.post('/api/uploadImg', upload.single('file'), function (req, res){
	res.send('ok');
});

app.put('/api/saveUserSettings', function (req, res){
	User.findOne({login: req.user.login}, function(err, data){
		var newFullName = req.body.newFullName;
		var newPassword = req.body.newPassword;
		if (newPassword != "")
		{
			bcrypt.hash(newPassword, 10).then(function(hash) {
				data.password = hash;
				if (newFullName != "") data.fullName = newFullName;
				data.save(function(err){
					res.send('Success');
				});
			});
		}
		else if (newFullName != "")
		{
			data.fullName = newFullName;
			data.save(function(err){
				res.send('Success');
			});
		}
	});
});

app.post('/api/login',
  passport.authenticate('local', {failureRedirect:'/sign-in', failureFlash: true}),
  function (req, res) {
  	res.cookie('login', req.user.login);
    res.redirect('/');
  });

app.get('/api/logOut', function (req, res){
  req.session.destroy(function (err) {
  	res.clearCookie("login");
  	res.send('success');
  });
});

io.on('connection', function(socket){
	socket.on('setRooms', function(data){
		User.findOne({login: data.login}, function(err, data){
			if (data) socket.join(data._id);
		});
	});
	socket.on('newMess', function(data){
		io.to(data.message.toId).emit('newMess', data);
		io.to(data.message.fromId).emit('newMess', data);
	});
})

http.listen(80, function(){
  console.log('Humble is listening on port 80');
});
