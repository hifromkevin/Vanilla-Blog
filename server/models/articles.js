let mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
	author: String,
	title: String,
	body: String,
	category: String,
	timestamp: String,
	lastEdited: String,
	number: Number
});

let Article =  mongoose.model('Article', articleSchema);

function findSomeArticles(start, callback) {
	articleSchema.find({}, callback).where('number').get(start).limit(1).sort({id: 1});
}

module.exports = Article;

exports.findSomeArticles = findSomeArticles;