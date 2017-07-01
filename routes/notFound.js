'use strict';

const express = require('express');
const router = express.Router();

/* GET home page */
router.route('*')
  .get((req, res, next) => {
    res.status(404).render('notFound', {
      title: 'Page Not Found'
    });
  });
module.exports = router;
