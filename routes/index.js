'use strict';

const express = require('express');
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

    const messages = req.flash('error');

    res.render('index', {
      title: 'Home',
      csrfToken: req.csrfToken(),
      user: {
        name: displayName,
        image: userImage,
      },
      errorExist: messages.length > 0,
      loginErrors: messages,
    });
    return;
  });

module.exports = router;
