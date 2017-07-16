'use strict';

const express = require('express');
const _ = require('lodash');
const router = new express.Router();

/* GET Edit Account page */
router.route('/editAccount')
  .get((req, res, next) => {
    // let displayName = null;
    // let userImage = null;
    //
    // if (_.has(req, 'user')) {
    //   displayName = req.user.displayName;
    //   userImage = req.user.image;
    // }
    // const messages = req.flash('error');

    console.log('HeLLO');
    res.render('editAccount');
    return;
  });

module.exports = router;
