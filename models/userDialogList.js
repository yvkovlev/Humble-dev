var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userDialogListSchema = new Schema({
	user: String,
	dialogs: [ 
		{
			dialogId: String,
			companion: String,
			anonym: Boolean,
			initiator: String,
			name: String,
			imgUrl: String
		}
	]
});

var userDialogList = mongoose.model('userDialogList', userDialogListSchema);

module.exports = userDialogList;