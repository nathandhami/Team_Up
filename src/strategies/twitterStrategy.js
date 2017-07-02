'use strict';

const nconf = require('../config/nconfConfig');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = () => {
  passport.use(new TwitterStrategy({
      consumerKey: nconf.get('twitter:consumerKey'),
      consumerSecret: nconf.get('twitter:consumerSecret'),
      callbackURL: nconf.get('twitter:callbackURL'),
      passReqToCallback: true
    },
    (req, token, tokenSecret, profile, done) => {
      // User.findOrCreate(..., function(err, user) {
      //   done(err, user);
      // });

      // console.log(profile);
      const user = {
        // email: profile.emails[0].value,
        image: profile._json.profile_image_url,
        displayName: profile.displayName,
        twitter: {
          id: profile.id,
          token: tokenSecret
        }
      };

      done(null, user);
    }));
};
