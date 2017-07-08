'use strict';

const nconf = require('../config/nconfConfig');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
  passport.use(new FacebookStrategy({
    clientID: nconf.get('facebook:clientID'),
    clientSecret: nconf.get('facebook:clientSecret'),
    callbackURL: nconf.get('facebook:callbackURL'),
  },
  (accessToken, refreshToken, profile, done) => {
    // User.findOrCreate(..., function(err, user) {
    //   done(err, user);
    // });

    console.log(profile);
    const user = {
      // email: profile.emails[0].value,
      image: profile.profileUrl,
      displayName: profile.displayName,
      facebook: {
        id: profile.id,
        token: tokenSecret,
      },
    };

    done(null, user);
  }));
};
