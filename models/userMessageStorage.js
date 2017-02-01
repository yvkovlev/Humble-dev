var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userMessageStorageSchema = new Schema({
  user: String,
  messages: [
  	{
  		dialog: String,
  		from: String, // Login
  		fromId: String,
      anonym: Boolean,
  		message: String,
  		date: {type: Date}
  	}
  ]
});

var userMessageStorage = mongoose.model('userMessageStorage', userMessageStorageSchema);

module.exports = userMessageStorage;