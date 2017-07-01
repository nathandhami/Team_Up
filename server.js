'use strict';

const path = require('path');
const express = require('express');
const helmet = require('helmet');

// Routes Config
const index = require('./routes/index');
const login = require('./routes/login');

// Server Config
const serverConfig = express();

//Secure http headers configured
serverConfig.use(helmet());

// Setting up Engine Config
serverConfig.set('views', path.join(__dirname, 'views'));
serverConfig.set('view engine', 'pug');

// Setting up Routes
serverConfig.use('/', index);
serverConfig.use('/login', login);

module.exports = serverConfig;
