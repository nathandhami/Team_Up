'use strict';

const path = require('path');
const express = require('express');

// Routes Config
const index = require('./routes/index');
const login = require('./routes/login');

// Server Config
const server = express();

// Setting up Engine Config
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'pug');

// Setting up Routes
server.use('/', index);
server.use('/login', login);

module.exports = server;
