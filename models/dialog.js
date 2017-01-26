var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dialogSchema = new Schema({
  participants: [{ type: String }]
});

var dialog = mongoose.model('dialogs', dialogSchema);

module.exports = dialog;