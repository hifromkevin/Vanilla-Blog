const express = require('express');
const router = express.Router();

let Article = require('../models/articles');

router.get('/add', (req, res) => {
	res.render('add_article', {
		title: 'Add New',
		heading: 'Add a new post!'
	});
});

router.post('/add', (req, res) => {
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

	article.save(err => {
		if (err) {
			console.log(err);
		} else {
			console.log('arTiCle heLLa aDDed.');
			res.redirect('/');
		}
	})

});

module.exports = router;

