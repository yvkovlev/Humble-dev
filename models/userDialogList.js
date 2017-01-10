var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userDialogListSchema = new Schema({
	login: String,
	dialogs: [ {type: String} ]
});

var userDialogList = mongoose.model('userDialogList', userDialogListSchema);

module.exports = userDialogList;