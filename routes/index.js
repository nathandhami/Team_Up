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
    let userEvents = {};

    // Execute DB queries if there is no error or user is defined
    if (_.has(req,'user') && messages.length <= 0){
      const Event = require('../models/Event');

      // Get user specific events
      Event.find({createdBy: req.user._id}, (err, events) => {
        userEvents = events;
        console.log(userEvents.length);
        console.log(userEvents);
      });
    }

    res.render('index', {
      title: 'Home',
      csrfToken: req.csrfToken(),
      errorExist: messages.length > 0,
      loginErrors: messages,
      userEvents: userEvents,
    });
    return;
  });

module.exports = router;
