const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const DB_ADDRESS = process.env.DB_ADDRESS || 'localhost:27017';
const port = process.env.PORT || 3002;
const app = express();

/*
//DB Connection
mongoose.connect(`DB_ADDRESS/vanilla`, { userNewUrlParser: true });
let db = mongoose.connection;

//Check for connection and errors
db.once('open', () => { console.log('Db heLLa conNecteD') });
db.on('error' (err) => { console.log('That ain\'t right...', err')});
*/

// Models
let Article = require('./models/articles');

//View Engine
app.set('../views', __dirname + '../views');
app.set('view engine', 'pug');

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Public
app.use(express.static(__dirname + '../public'));

// Home Route
app.get('/', (req, res) => {
	res.render('index', {
		title: 'Homepage',
		heading: 'Welcome to my app!'
	});
});

// Route Files
let articles = require('./routes/articles');
app.use('/articles', articles);

// Start server
app.listen(port, ()  => { console.log(`Listening on ${port}` )});
