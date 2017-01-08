var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  fullName: String,
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: String,
});

var User = mongoose.model('User', userSchema);

module.exports = User;