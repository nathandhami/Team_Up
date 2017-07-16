'use strict';

const express = require('express');
const router = new express.Router();

/* GET Edit Account page */
router.route('/editAccount')
  .get((req, res, next) => {
    res.render('editAccount');
    return;
  });

module.exports = router;
