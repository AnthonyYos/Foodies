if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const { DB_URL } = require('./config/database');

// require('./config/passport');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const path = require('path');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const restaurantRoutes = require('./routes/restaurantRoutes');
const userRoutes = require('./routes/userRoutes');
//--------------------------------------------------End of Imports--------------------------------------------------//

// Express app
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server up on ${port}`));

const sessionStore = MongoStore.create({
  mongoUrl: DB_URL,
  collection: 'sessions',
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1000ms/1sec 60sec/1min 60min/1hr 24hr/1 day
  })
);

// View engine setup
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware & static files
app.use([express.static('public'), express.urlencoded({ extended: true })]);
app.use([flash(), methodOverride('_method')]);
app.use([passport.initialize(), passport.session()]);
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});
//--------------------------------------------------End of Middleware-----------------------------------------------//

// Routes
app.get('/', (req, res) => res.render('home'));
app.use('/', userRoutes);
app.use('/restaurants', restaurantRoutes);
// app.use('/restaurants/:id', reviewRoutes); // Req.params are not preserved by default from the parent,
//set const router = express.Router({ mergeParams: true }); in reviewRoutes
