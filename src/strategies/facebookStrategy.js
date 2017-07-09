'use strict';

const nconf = require('../config/nconfConfig');
const passport = require('passport');
const User = require('../../models/User');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
  passport.use(new FacebookStrategy({
      clientID: nconf.get('facebook:clientID'),
      clientSecret: nconf.get('facebook:clientSecret'),
      callbackURL: nconf.get('facebook:callbackURL'),
    },
    (accessToken, refreshToken, profile, done) => {
      const query = {
        'facebook.id': profile.id,
      };

      // console.log(profile);
      User.findOne(query, (err, user) => {
        if (!user) {
          const userDocument = new User({
            // email: profile.emails[0].value,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            image: profile.profileUrl,
            displayName: profile.displayName,
            facebook: {
              id: profile.id,
              token: accessToken,
            },
          });
          userDocument.save((err, user) => {
            if (err) throw err;
            done(null, user);
          });
        } else {
          done(null, user);
        }
      });
    }));
};
