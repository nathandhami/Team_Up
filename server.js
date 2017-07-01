'use strict';

const path = require('path');
const express = require('express');

// Routes Config
const index = require('./routes/index');
const login = require('./routes/login');

// Server Config
const serverConfig = express();

// Setting up Engine Config
serverConfig.set('views', path.join(__dirname, 'views'));
serverConfig.set('view engine', 'pug');

// Setting up Routes
serverConfig.use('/', index);
serverConfig.use('/login', login);

module.exports = serverConfig;
