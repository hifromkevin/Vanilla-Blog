router.post('/add', (req, res) => {
	let article = new Article();
	article.author = req.body.author;
	article.title = req.body.title;
	article.body = req.body.body;
	article.category = req.body.category;
	article.timestamp = req.body.timestamp;

	article.save((err) => {
		if (err) {
			console.log('Article error', err);
			return;
		} else {
			res.redirect('/');
		};
	});
});