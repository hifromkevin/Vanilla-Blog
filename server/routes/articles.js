const express = require('express');
const router = express.Router();

let Article = require('../models/articles');

// Relay the Add Article form
router.get('/add', (req, res) => {
	res.render('add_article', {
		title: 'Add New',
		heading: 'Add a new post!'
	});
});

// Post the new user
router.post('/add', (req, res) => {

	let num;

	if(!num) num = 0;
	console.log(num, "!!!")

	const d = new Date();
	const months = [
		'January', 'February', 'March', 
		'April', 'May', 'June','July', 
		'August', 'September', 'October', 
		'November', 'December'
	];
	let postDate = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

	let article = new Article();
	article.author = req.body.author;
	article.title = req.body.title;
	article.body = req.body.body;
	article.category = req.body.category;
	article.timestamp = postDate;
	article.number = ++num;

	article.save(err => {
		if (err) {
			console.log(err);
		} else {
			console.log('arTiCle heLLa aDDed.');
			res.redirect('/');
		};
	});
});

// Send the edited post to Mongo
router.post('/edit/:id', (req, res) => {
	const d = new Date();
	const months = [
		'January', 'February', 'March', 
		'April', 'May', 'June','July', 
		'August', 'September', 'October', 
		'November', 'December'
	];

	let postDate = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

	let article = {};
	article.author = req.body.author;
	article.title = req.body.title;
	article.body = req.body.body;
	article.category = req.body.category;
	article.lastEdited = postDate;
	let query = { _id: req.params.id };

	Article.updateOne(query, article, err => {
		if (err) {
			console.log(err);
			return;
		} else {
			console.log(`Article ${req.body.title} has been updated.`)
			res.redirect('/');
		};
	});
});

// Display the selected article
router.get('/:id', (req, res) => {
	Article.findById(req.params.id, (err, article) => {
		res.render('article', {
			title: 'Homepage',
			heading: 'Welcome to my app!',
			article: article
		});
	});
});

// Edit the selected article
router.get('/edit/:id', (req, res) => {
	Article.findById(req.params.id, (err, article) => {
		if (err) {
			console.log(err);
		} else {
			res.render('edit_article', {
				title: 'Edit Article',
				heading: 'Edit Article',
				article: article
			});
		};
	});
});

// Delete select post
router.delete('/:id', (req, res) => {
	let query = { _id: req.params.id };

	Article.findById(req.params.id, (err, article) => {
		if (err) {
			console.log('Delete error', err);
		} else {
			Article.deleteOne(query, (error) => {
				if (error) {
					console.log('Delete error', error);
				} else {
					res.send('Success');
				}
			});
		};
	});
});

module.exports = router;

