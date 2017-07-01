'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();

/* GET home page */
router.route('/')
  .get((req, res, next) => {
    if (_.has(req, 'user')) {
      console.log(req.user);
    }

    res.render('index', {
      title: 'Home',
      user: req.user
    });
  });

module.exports = router;
