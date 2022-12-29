const express = require('express');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const courses = require('./routes/genres');
const home = require('./routes/home');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(helmet());
app.set('view engine', 'pug');
app.set('views', './views');

app.use('/api/genres', courses);
app.use('/', home);
// if(app.get('env') === 'development'){
//     app.use(morgan('tiny'));
//     console.log('Morgan Enabled....');
// }

const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log(`Listening on port ${port}...`);
});