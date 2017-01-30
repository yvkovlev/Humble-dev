var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userMessageStorageSchema = new Schema({
  user: String,
  messages: [
  	{
  		dialog: String,
  		from: String, // Login
  		message: String,
  		date: {type: Date}
  	}
  ]
});

var userMessageStorage = mongoose.model('userMessageStorage', userMessageStorageSchema);

module.exports = userMessageStorage;