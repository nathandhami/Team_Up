'use strict';

const passport = require('passport');

module.exports = (serverConfig) => {
  serverConfig.use(passport.initialize());
  serverConfig.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    // User.findById(id, (err, user) => {
    //   done(err, user);
    // });
    done(null, id);
  });

  require('../strategies/googleStrategy')();
  require('../strategies/twitterStrategy')();
  require('../strategies/facebookStrategy')();
};
