'use strict';

const express = require('express');
const _ = require('lodash');
const router = new express.Router();

/* GET home page */
router.route('/')
  .get((req, res, next) => {
    if (_.has(req, 'user')) {
      console.log(req.user);
    }

    res.render('index', {
      title: 'Home',
    });
  });

module.exports = router;
