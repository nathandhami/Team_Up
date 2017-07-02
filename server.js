'use strict';

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nconf = require('./src/config/nconfConfig');

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

// Import authentication strategies
require('./src/config/authConfig')(serverConfig);

// Setting up Engine Config
serverConfig.set('views', path.join(__dirname, 'views'));
serverConfig.set('view engine', 'pug');

// Setting up Routes
serverConfig.use(express.static(path.join(__dirname, 'public')));
serverConfig.use('/login', login);
serverConfig.use('/', index);
serverConfig.use('/auth', auth);

// 404 route
serverConfig.use('/', notFound);

module.exports = serverConfig;
