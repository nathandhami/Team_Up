'use strict';

const express = require('express');
const xssFilters = require('xss-filters');
const User = require('../models/User');
const router = new express.Router();


router.route('/')
  .post((req, res, next) => {
    // extract data
    const userEmail = xssFilters.inHTMLData(req.body.userEmail);
    const userPass = xssFilters.inHTMLData(req.body.userPass);

    // TODO: validate password
    User.find({email: userEmail}, (err, user) => {
      if (err) throw err;

      if (user.validPassword(userPass))  {
        console.log('correct');
      } 
    });

    // User.findOneAndRemove({email: userEmail}, (err) => {
    //    if (err) throw err;

    //    console.log('User ' + userEmail + 'successfully deleted!');
    // });


    res.redirect('/');
    return;
  });

module.exports = router;
