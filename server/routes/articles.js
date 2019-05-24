const express = require('express');
const router = express.Router();

let Article = require('../models/articles');

router.get('/add', (req, res) => {
	res.render('add_article');
});

module.exports = router;

