'use strict';

const passport = require('passport');
const User = require('../../models/User');

module.exports = (serverConfig) => {
  serverConfig.use(passport.initialize());
  serverConfig.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      if (!user) {
        return done(null, false);
      } else {
        done(null, user);
      }
    });
    // done(null, id);
  });

  require('../strategies/localStrategy')();
  require('../strategies/googleStrategy')();
  require('../strategies/twitterStrategy')();
  require('../strategies/facebookStrategy')();
};
