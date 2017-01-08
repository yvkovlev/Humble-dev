var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dialogSchema = new Schema({
  type: String, // single, group
  participants: [{ type: String }],
  messages: [{from: String, anonym: Boolean, message: String}]
});

var dialog = mongoose.model('dialogs', dialogSchema);

module.exports = dialog;