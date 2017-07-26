'use strict';

const express = require('express');
const router = new express.Router();

/* GET home page */
router.route('/')
  .get((req, res, next) => {
    const messagesErrSignIn = req.flash('error');
    const messagesErrRegister = req.flash('registerError');
    const messages = messagesErrSignIn.concat(messagesErrRegister);
    const queryEventDetails = {};

    // Execute DB queries if there is no error
    if (messages.length <= 0){
      const Event = require('../models/Event');

      // Get user specific events
      Event.find({createdBy: req.user._id}, (err, event) => {
        queryEventDetails.eventName = event[0].teamupName;
        console.log('Index: ' + event[0].teamupName);
        console.log(event.length);
        console.log(event);

      });
    }

    res.render('index', {
      title: 'Home',
      csrfToken: req.csrfToken(),
      errorExist: messages.length > 0,
      loginErrors: messages,
    });
    return;
  });

module.exports = router;
