var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  fullName: String,
  login: String,
  password: String,
  email: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;