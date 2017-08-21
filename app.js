const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

require('dotenv').config();

const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//auth
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

//B --> views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.render('index', {
    message: 'Hello world!',
    currentPage: 'home',
    documentTitle: 'DeLorean Movies!!!',
    subTitle: 'Check out some cool info on the best movies around.',
  });
});

// import our movie routes & tell the app to use them
const movieRoutes = require('./routes/movie-routes');
app.use('/movies', movieRoutes);

const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);

//B
app.get('*', (req, res) => {
    res.status(404).send('Endpoint not found!');
});

// app.use('*', (req, res) => {
//   res.status(400).json({
//     message: 'Endpoint not found!',
//   });
// });