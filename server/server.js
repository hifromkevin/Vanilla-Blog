const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const DB_ADDRESS = process.env.DB_ADDRESS || 'mongodb://localhost:27017';
const port = process.env.PORT || 3002;
const app = express();


//DB Connection
mongoose.connect(`${DB_ADDRESS}/vanilla`, { useNewUrlParser: true });
let db = mongoose.connection;

//Check for connection and errors
db.once('open', () => { console.log('Db heLLa conNecteD') });
db.on('error', err => { console.log('That ain\'t right...', err)});


// Models
let Article = require('./models/articles');

console.log('ETYYYY!',Article);

//View Engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Public
app.use(express.static(path.join(__dirname, '../public')));

// app.get('*', (req, res, next) => {
//   res.locals.user = req.user || null;
//   next(); 
// });

// Home Route

app.get('/', (req, res) => {
	Article.find({}, (err, articles) => {
		if(err) {
			console.log(err);
		} else {
			// if (req.user) {
				res.render('index', {
					title: 'Homepage',
					heading: 'Welcome to my app!',
					articles: articles
				});
			// } 
			// else {
			// 	res.render('login', {
			// 		title: 'Log In',
			// 		heading: 'Please Log In'
			// 	});
			// }
		};
	});
});



// Route Files
let articles = require('./routes/articles');
app.use('/articles', articles);

// Start server
app.listen(port, ()  => { console.log(`Listening on ${port}` )});
