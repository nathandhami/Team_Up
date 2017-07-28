'use strict';

const _ = require('lodash');
const passport = require('passport');
const User = require('../../models/User');

module.exports = (serverConfig) => {
  serverConfig.use(passport.initialize());
  serverConfig.use(passport.session());

  serverConfig.use((req, res, next) => {
    res.locals.isAuth = req.isAuthenticated();
    if (_.has(req, 'user')) {
      const defaultImage = "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/079/328/1630e0b.jpg";
      const userImage = req.user.image ? req.user.image : defaultImage;
      const userStatus = req.user.status ? req.user.status : "Available";
      res.locals.userData = {
        name: req.user.displayName,
        email: req.user.email,
        image: userImage,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        status: userStatus,
        facebookId: req.user.facebook,
        twitterId: req.user.twitter,
        googleId: req.user.google,
      };
    }
    next();
  });

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
