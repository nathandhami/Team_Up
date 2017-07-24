'use strict';

const express = require('express');
const xssFilters = require('xss-filters');
const router = new express.Router();
const fs = require('fs');
const sleep = require('system-sleep');
const User = require('../models/User');

router.route('/') 
  .get((req, res, next) => {
    res.render('edit', {
      title: 'Profile',
      csrfToken: req.csrfToken()
    });

    return;
  })

  .post((req, res) => {
    const userId = req.user._id;

    const fname = xssFilters.inHTMLData(req.body.first_name);
    const lname = xssFilters.inHTMLData(req.body.last_name);
    const currentPass = xssFilters.inHTMLData(req.body.current_password);
    const newPass = xssFilters.inHTMLData(req.body.new_pass);

    User.findOne({
      _id: userId,
    }, (err, user) => {
      if (err) {
        throw err;
      }

      if (user) {
        if (user.validPassword(currentPass)) {
          user.firstname = fname;
          user.lastname = lname;
          if (newPass) {
            user.password = newPass;
          }

          user.save((err) => {
            if (err) throw err;
          });

          res.json({success: 'Profile Updated!', status: 204, 
                    text: 'Your personal info has been updated.', 
                    redirect: '/edit'});
        } else {
          res.json({error: 'Incorrect Password!', status: 403,
                    text: 'Please try again with your current password.'});
        }
      }

      return;
    });
    
  })

router.route('/uploadPic') 
  .post(function(req, res) {
    const userId = req.user._id;

    User.findOne({
        _id: userId,
      }, (err, user) => {
        if (err) {
          throw err;
        }

        if (user) {
          let ImageData = fs.readFileSync(req.file.path);

          let base64 = new Buffer(ImageData).toString('base64');
          user.image = 'data:' + req.file.mimetype + ';base64,' + base64;

          user.save((err) => {
            if (err) throw err;
          });

          fs.unlinkSync(req.file.path);
        }
      });

    sleep(750);
    return res.redirect('back');
  });

module.exports = router;