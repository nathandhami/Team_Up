'use strict';

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nconf = require('./bin/lib/config/nconfConfig');

// Strategies
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: nconf.get('google:clientID'),
    clientSecret: nconf.get('google:clientSecret'),
    callbackURL: nconf.get('google:callbackURL')
  },
  (accessToken, refreshToken, profile, done) => {
    // User.findOrCreate(..., function(err, user) {
    //   done(err, user);
    // });
    done(null, profile);
  }));

// Routes Config
const index = require('./routes/index');
const login = require('./routes/login');
const auth = require('./routes/auth');
const notFound = require('./routes/notFound');

// Server Config
const serverConfig = express();

//Secure http headers configured
serverConfig.use(helmet());

serverConfig.use(bodyParser.json());
serverConfig.use(bodyParser.urlencoded({
  extended: false //body only accept string or array
}));
serverConfig.use(cookieParser());
serverConfig.use(express.static(path.join(__dirname, 'public')));

// Session and Cookie configuration
serverConfig.use(session({
  secret: nconf.get('session:secret'),
  resave: true,
  saveUninitialized: true
  // cookie: {
  //   secure: true
  // }
}));
serverConfig.use(passport.initialize());
serverConfig.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  // User.findById(id, (err, user) => {
  //   done(err, user);
  // });
  done(null, id);
});

// Setting up Engine Config
serverConfig.set('views', path.join(__dirname, 'views'));
serverConfig.set('view engine', 'pug');

// Setting up Routes
serverConfig.use(express.static(path.join(__dirname, 'public')));
serverConfig.use('/', index);
serverConfig.use('/login', login);
serverConfig.use('/auth', auth);

// 404 route
serverConfig.use('/', notFound);

module.exports = serverConfig;
