'use strict';

const express = require('express');
const User = require('../models/User');
const _ = require('lodash');
const router = new express.Router();

/* GET home page */
router.route('/')
  .get((req, res, next) => {
    let displayName = null;
    let userImage = null;

    if (_.has(req, 'user')) {
      displayName = req.user.displayName;
      userImage = req.user.image;
    }

    res.render('index', {
      title: 'Home',
      isAuth: req.isAuthenticated(),
      user: {
        name: displayName,
        image: userImage,
      },
    });
    return;
  });

module.exports = router;
