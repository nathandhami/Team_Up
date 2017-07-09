'use strict';

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
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
const db = mongoose.connect(nconf.get('db:url'));
// const dbConnection = mongoose.createConnection('mongodb://localhost/users');

// Secure http headers configured
serverConfig.use(helmet());
// serverConfig.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'", 'default.com'],
//     styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com'],
//     imgSrc: ['img.com', 'data:'],
//     sandbox: ['allow-forms', 'allow-scripts'],
//     reportUri: '/report-violation',
//     objectSrc: [], // An empty array allows nothing through
//   },
// }));


serverConfig.use(bodyParser.json());
serverConfig.use(bodyParser.urlencoded({
  extended: false, // body only accept string or array
}));
serverConfig.use(expressValidator());
serverConfig.use(cookieParser());


// Session and Cookie configuration
serverConfig.use(session({
  name: 'teamId',
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 1 * 60 * 60, // = 1 hr
  }),
  secret: nconf.get('session:secret'),
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: true,
    maxAge: 1 * 60 * 60 * 1000, // = 1 hr
  },
  // store: new MongoStore({
  //   mongooseConnection: dbConnection,
  // }),
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

serverConfig.use((req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
});

// 404 route
serverConfig.use('/', notFound);

module.exports = serverConfig;
