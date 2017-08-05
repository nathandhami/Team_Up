'use strict';

const express = require('express');
const _ = require('lodash');
const router = new express.Router();

/* GET home page */
router.route('/')
  .get((req, res, next) => {
    const messagesErrSignIn = req.flash('error');
    const messagesErrRegister = req.flash('registerError');
    const messages = messagesErrSignIn.concat(messagesErrRegister);
    

    // Execute DB queries if there is no error or user is defined
    if (_.has(req, 'user') && messages.length <= 0) {
      const Event = require('../models/Event');

      // Get user specific events
      Event.find({ users: {$eq: req.user._id.toString()} }).populate('createdBy').exec((err, events) => {

        res.render('index', {
          title: 'Home',
          csrfToken: req.csrfToken(),
          errorExist: messages.length > 0,
          loginErrors: messages,
          userEvents: events,
        });
      });
    }
    // login page
    else {
      res.render('index', {
        title: 'Teamup - Login or Sign Up',
        csrfToken: req.csrfToken(),
        errorExist: messages.length > 0,
        loginErrors: messages,
      });
    }
    return;
  });

module.exports = router;
