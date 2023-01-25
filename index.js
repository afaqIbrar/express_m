const mongoose =  require ('mongoose');
const express = require('express');
const helmet = require('helmet');
const courses = require('./routes/genres');
const customer = require('./routes/customers');
const home = require('./routes/home');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const app = express();

mongoose.connect('mongodb://127.0.0.1/vidly')
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.log('Could not connect to MongoDB...', err));

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(helmet());
app.set('view engine', 'pug');
app.set('views', './views');

app.use('/api/genres', courses);
app.use('/api/customers', customer);
app.use('/api/movies', movies);
app.use('/api/rentals',rentals);
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log(`Listening on port ${port}...`);
});