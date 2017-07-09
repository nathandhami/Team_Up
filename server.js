'use strict';

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const nconf = require('./src/config/nconfConfig');
const mongoose = require('mongoose');

// Routes Config
const index = require('./routes/index');
const login = require('./routes/login');
const register = require('./routes/register');
const auth = require('./routes/auth');
const notFound = require('./routes/notFound');

// Server Config
const serverConfig = express();
// const db = mongoose.connect('mongodb://localhost/users');

// Secure http headers configured
serverConfig.use(helmet());

serverConfig.use(bodyParser.json());
serverConfig.use(bodyParser.urlencoded({
  extended: false, // body only accept string or array
}));
serverConfig.use(expressValidator());
serverConfig.use(cookieParser());

// Session and Cookie configuration
serverConfig.use(session({
  secret: nconf.get('session:secret'),
  resave: false,
  saveUninitialized: false,
  // cookie: {
  //   secure: true,
  // },
}));

// Import authentication strategies
require('./src/config/authConfig')(serverConfig);

// Setting up Engine Config
serverConfig.set('views', path.join(__dirname, 'views'));
serverConfig.set('view engine', 'pug');

// Setting up Routes
serverConfig.use(express.static(path.join(__dirname, 'public')));

serverConfig.use('/', index);
serverConfig.use('/login', login);
serverConfig.use('/register', register);
serverConfig.use('/auth', auth);

serverConfig.use((req, res, next)=>{
  if (!req.isAuthenticated()) {
    res.redirect('/');
  }
  next();
});

// 404 route
serverConfig.use('/', notFound);

module.exports = serverConfig;
