let mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
	author: String,
	title: String,
	body: String,
	category: String,
	timestamp: String,
	lastEdited: String
});

let Article = module.exports = mongoose.model('Article', articleSchema);