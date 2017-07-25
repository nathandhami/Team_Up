'use strict';

const express = require('express');
const router = new express.Router();

/* GET home page */
router.route('/')
  .get((req, res, next) => {
    const messagesErrSignIn = req.flash('error');
    const messagesErrRegister = req.flash('registerError');
    const messages = messagesErrSignIn.concat(messagesErrRegister);

    res.render('index', {
      title: 'Home',
      csrfToken: req.csrfToken(),
      errorExist: messages.length > 0,
      loginErrors: messages,
    });
    return;
  });

module.exports = router;
